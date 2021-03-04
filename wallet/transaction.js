const uuid = require('uuid');
const { verifySignature } = require('../util');

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid.v4();
    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount });
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {};

    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

    return outputMap;
  }

  createInput({ senderWallet, outputMap }) {
    const input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap)
    };

    return input;
  }

  static validTransaction(transaction) {
    const { signature, amount, address } = transaction.input;
    const { outputMap } = transaction;

    const outputTotal = Object.values(outputMap)
      .reduce((total, propAmount) => total + propAmount);

    if (outputTotal !== amount) {
      console.error('invalid total');
      return false;
    }

    if (!verifySignature({ publicKey: address, data: outputMap, signature })) {
      console.error('invalid signature');
      return false
    }


    return true
  }
}

module.exports = Transaction;
