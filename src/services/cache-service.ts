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
    
    if (this.size < this.maxSize) return;

    this.clean();
  }

  delete(key: string) {
    const result = this.storage[key];

    if (!result) return;

    delete this.storage[key];
    delete this.calls[key];
    delete this.lastCalls[key];

    this.size -= 1;
  }

  clean() {
    const keysByCalls = Object.keys(this.storage)
      .sort((keyA, keyB) => {
        const lastCallA = this.lastCalls[keyA];
        const lastCallB = this.lastCalls[keyB];

        return lastCallB - lastCallA;
      });

    const keysForDelete = keysByCalls.slice(this.size - this.minSize + 1);

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

  reset() {
    this.storage = {};
    this.lastCalls = {};
    this.calls = {};
  }
}