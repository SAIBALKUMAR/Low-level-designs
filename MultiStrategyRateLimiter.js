
class RateLimitStrategy {
  constructor() {
    if (this.constructor === RateLimitStrategy) {
      throw new TypeError("Cannot construct RateLimitStrategy instances directly");
    }
  }

  isAllowed(clientId) {
    throw new Error("Method 'isAllowed()' must be implemented.");
  }
}

class FixedWindowRateLimitStrategy extends RateLimitStrategy {
    constructor(limit, refillRatePerSecond) {
        super();
        this.limit = limit;
        this.refillRatePerSecond = refillRatePerSecond;
        this.requests = new Map();
    }

    isAllowed(clientId) {
        const now = Date.now();

        if (!this.requests.has(clientId)) {
            this.requests.set(clientId, { tokens: this.limit - 1, lastRefill: now });
            return true;
        }

        const request = this.requests.get(clientId);
        const elapsedTime = (now - request.lastRefill) / 1000;
        const tokensToAdd = Math.floor(elapsedTime * this.refillRatePerSecond);
        if (tokensToAdd > 0) {
            request.tokens = Math.min(this.limit, request.tokens + tokensToAdd);
            request.lastRefill = now;
        }
        if (request.tokens > 0) {
            request.tokens -= 1;
            return true;
        }
        return false;
    }
}

class SlidingWindowRateLimitStrategy extends RateLimitStrategy {
    constructor(windowSizeInSeconds, maxRequests) {
        super();
        this.windowSizeInMs = windowSizeInSeconds * 1000; // Convert to milliseconds
        this.maxRequests = maxRequests;
        this.logs = new Map();
    }

    isAllowed(clientId) {
        const now = Date.now(); 
        const windowStart = now - this.windowSizeInSeconds;
        if (!this.logs.has(clientId)) {
            this.logs.set(clientId, [now]);
            return true;
        }

        let userLog = this.logs.get(clientId)

        userLog = userLog.filter(timestamp => timestamp >= windowStart);

        if (userLog.length < this.maxRequests) {
            userLog.push(now)
            this.logs.set(clientId, userLog);
            return true;
        }

        this.logs.set(clientId, userLog);
        return false;
    }
}


class RateLimitManager {
    constructor() {
        this.endpointRules = new Map();
    }

    addRule(endpoint, strategy) {
        this.endpointRules.set(endpoint, strategy)
    }

    handleRequest(clientId, endpoint) {
        if (!this.endpointRules.has(endpoint)) {
            return true
        }

        const strategy = this.endpointRules.get(endpoint)
        return strategy.isAllowed(clientId)
    }
}

const rateLimiter = new RateLimitManager()

rateLimiter.addRule('/login', new FixedWindowRateLimitStrategy(5,5));

rateLimiter.addRule('/search', new SlidingWindowRateLimitStrategy(60,30));

const isAllowed = rateLimiter.handleRequest('user_123', '/login');

