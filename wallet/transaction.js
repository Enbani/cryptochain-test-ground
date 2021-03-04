const uuid = require('uuid');

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid.v4();
    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount })
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    let outputMap = {};

    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

    return outputMap;
  }
}

module.exports = Transaction;
