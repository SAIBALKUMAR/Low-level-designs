
class MoneySplitter {
  constructor() {
    this.balances = new Map();
  }

  addTransaction(payer, amount, participants, splits) {
    if (splits.length == 0) {
        const share = amount / participants.length;
        splits = Array(participants.length).fill(share);
    }

    participants.forEach((participant, index) => {
      if (!this.balances.has(participant)) {
        this.balances.set(participant, 0);
      }
      this.balances.set(participant, this.balances.get(participant) - splits[index]);
    });

    if (!this.balances.has(payer)) {
      this.balances.set(payer, 0);
    }
    this.balances.set(payer, this.balances.get(payer) + amount);
  }

  getBalance(person) {
    return this.balances.get(person) || 0;
  }

  getAllBalances() {
    const result = {};
    for (const [person, balance] of this.balances.entries()) {
      result[person] = balance;
    }   
    return result;
  }

  settleBalances(user1, user2, amount) {
    if (!this.balances.has(user1)) {
      this.balances.set(user1, 0);
    }
    if (!this.balances.has(user2)) {
      this.balances.set(user2, 0);
    }
    this.balances.set(user1, this.balances.get(user1) - amount);
    this.balances.set(user2, this.balances.get(user2) + amount);
  }
}

const moneySplitter = new MoneySplitter();
moneySplitter.addTransaction('Alice', 100, ['Bob', 'Charlie'], [30, 70]);
moneySplitter.addTransaction('Bob', 50, ['Alice', 'Charlie'], []);
moneySplitter.addTransaction('Charlie', 120, ['Alice', 'Bob'], [60, 60]);
console.log(moneySplitter.getBalance('Alice'));
console.log(moneySplitter.getBalance('Bob'));
console.log(moneySplitter.getBalance('Charlie'));