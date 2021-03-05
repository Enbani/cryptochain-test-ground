const Block = require('./block');
const { cryptoHash } = require('../util');

class Blockchain {
  constructor () {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });

    this.chain.push(newBlock);
  };

  static isValidChain(chain) {
    // if the genesis blocks don't match, return false
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false
    };


    for (let i=1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data, nonce, difficulty } = chain[i];
      const lastBlock = chain[i-1];
      const calculatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
      const lastDifficulty = lastBlock.difficulty;

      // if the hash and lastHash don't match, return false
      if (lastHash !== lastBlock.hash) return false;

      // if the hash doesn't match our calculated hash, something was tampered
      // return false
      if (calculatedHash !== hash) return false;

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;

    }
    return true;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error('the incoming chain must be longer');
      return
    };

    if (!Blockchain.isValidChain(chain)) {
      console.error('the incoming chain must be longer');
      return;
    };

    console.log('Replacing chain with:', chain);
    this.chain = chain;
  }
}

module.exports = Blockchain;
