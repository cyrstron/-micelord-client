export class StorageService {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export const localStorage = new StorageService();