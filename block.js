/* BlockChain */
const cryptoHash = require('./crypto-hash');
const { GENESIS_DATA } = require('./config');


class Block {
  // all blocks should have timestamp, last hash, hash, and data
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  // genesis block is created off of hardcoded data to serve as first reference in the blockchain
  static genesis() {
    return new this(GENESIS_DATA);
  }

  // create/mine a block
  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce = 0;

    // for proof of work
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, difficulty, nonce);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash

    });
  }
}


module.exports = Block;
