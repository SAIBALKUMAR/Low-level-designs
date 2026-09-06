
class InMemoryCache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value, ttl) {
        const expirationTime = Date.now() + ttl;
        this.cache.set(key, { value, expirationTime });
    }
    get(key) {
        if (this.cache.has(key)) {
            const { value, expirationTime } = this.cache.get(key);
            if (Date.now() < expirationTime) {
                return value;
            } else {
                this.cache.delete(key);
            }
        }
        return -1;
    }

    delete(key) {
        this.cache.delete(key);
    }

    cleanup() {
        const now = Date.now();
        for (const [key, { expirationTime }] of this.cache.entries()) {
            if (now >= expirationTime) {
                this.cache.delete(key);
            }
        }
    }
}

const cache = new InMemoryCache();
cache.set('a', 1, 5000);
console.log(cache.get('a')); // returns 1
setTimeout(() => {
    console.log(cache.get('a')); // returns -1 (expired)
}, 6000);

