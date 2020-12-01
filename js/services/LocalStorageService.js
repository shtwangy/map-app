export class LocalStorageService {
    constructor() {}

    retrieve(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    store(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    clear(key = '') {
        if (key === '') {
            localStorage.removeItem(this.prefix + key);
        } else {
            localStorage.clear();
        }
    }
}
