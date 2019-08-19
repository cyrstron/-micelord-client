interface CacheOptions {
  maxSize: number;
  minSize: number;
}

export class CacheService<StoredData> {
  private storage: {[key: string]: StoredData | undefined} = {};
  private lastCalls: {[key: string]: number} = {};
  private calls: {[key: string]: number} = {};

  maxSize: number;
  minSize: number;

  size: number = 0;

  constructor({
    minSize,
    maxSize,
  }: CacheOptions) {
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  set(key: string, data: StoredData): void {
    this.storage[key] = data;
    this.size += 1;
    this.calls[key] = 1;
    this.lastCalls[key] = Date.now();
    
    if (this.size < this.minSize) return;

    if (this.size < this.maxSize) {
      this.clean();
    } else {
      this.clean(this.size - this.maxSize + 1);
    }
  }

  delete(key: string) {
    const result = this.storage[key];

    if (!result) return;

    delete this.storage[key];
    delete this.calls[key];
    delete this.lastCalls[key];

    this.size -= 1;
  }

  clean(deleteNumber = 1) {
    const keysByCalls = Object.keys(this.storage)
      .sort((keyA, keyB) => {
        // const callsA = this.calls[keyA];
        // const callsB = this.calls[keyB];

        // if (callsA !== callsB) return callsB - callsA;

        const lastCallA = this.lastCalls[keyA];
        const lastCallB = this.lastCalls[keyB];

        return lastCallB - lastCallA;
      });

    const keysForDelete = keysByCalls.slice(this.size - 1 - deleteNumber);

    keysForDelete.forEach((key) => {
      this.delete(key);
    });
  }

  get(key: string): StoredData | undefined {
    const result = this.storage[key];

    if (!result) return;

    this.calls[key] += 1;
    this.lastCalls[key] = Date.now();
    
    return result;
  }
}