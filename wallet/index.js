const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../util');
const Transaction = require('./transaction');

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    const signature = this.keyPair.sign(cryptoHash(data))
    return signature
  }

  createTransaction( { amount, recipient }) {
    if (amount > this.balance) {
      throw new Error('Amount exceeds balance');
      return;
    }

    return new Transaction({ recipient, amount, senderWallet: this });
  };


}

module.exports = Wallet;
