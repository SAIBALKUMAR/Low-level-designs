
class Exchange {
    constructor() {
        this.stocks = new Map();
        this.portfolio = new Map();
    }

    addStock(symbol, price, quantity) {
        this.stocks.set(symbol, { price, quantity });
    }

    buyStock(userId, symbol, quantity) {
        if (!this.stocks.has(symbol)) {
            console.log(`Stock ${symbol} does not exist.`);
            return false;
        }

        const stock = this.stocks.get(symbol);
        if (stock.quantity < quantity) {
            console.log(`Not enough quantity for stock ${symbol}.`);
            return false;
        }

        stock.quantity -= quantity;
        const userPortfolio = this.portfolio.get(userId) || new Map();
        const userStock = userPortfolio.get(symbol) || { quantity: 0, totalCost: 0 };
        userStock.quantity += quantity;
        userStock.totalCost += stock.price * quantity;
        this.setUserStockInPortfolio(userId, userStock);
        this.adjustStockPrice(symbol, quantity);
        return true;
    }

    setUserStockInPortfolio(userId, userStock) {
        const userPortfolio = this.portfolio.get(userId) || new Map();
        if (userStock.quantity === 0) {
            userPortfolio.delete(userStock.symbol);
        }
        userPortfolio.set(userStock.symbol, userStock);
        this.portfolio.set(userId, userPortfolio);
    }

    sellStock(userId, symbol, quantity) {
        const stock = this.stocks.get(symbol);
        if (!this.portfolio.has(userId) || !this.portfolio.get(userId).has(symbol)) {
            console.log(`User ${userId} does not own stock ${symbol}.`);
            return false;
        }

        const userPortfolio = this.portfolio.get(userId);
        const userStock = userPortfolio.get(symbol);
        if (userStock.quantity < quantity) {
            console.log(`User ${userId} does not have enough quantity for stock ${symbol}.`);
            return false;
        }
        stock.quantity += quantity;
        userStock.quantity -= quantity;
        userStock.totalCost -= this.stocks.get(symbol).price * quantity;
        this.setUserStockInPortfolio(userId, userStock);
        this.adjustStockPrice(symbol, quantity);
        return true;
    }

    adjustStockPrice(symbol, quantity) {
        const stock = this.stocks.get(symbol);
        const priceChange = quantity * 0.1; // Example price adjustment logic
        stock.price += priceChange;
        this.stocks.set(symbol, stock);
    }
}


const exchange = new Exchange();
exchange.addStock('AAPL', 150, 1000);
exchange.addStock('GOOGL', 2800, 500);  
exchange.buyStock('user1', 'AAPL', 10);
exchange.sellStock('user1', 'AAPL', 5);
console.log(exchange.stocks);
console.log(exchange.portfolio);
