const hexToBinary = require('hex-to-binary');
const { cryptoHash } = require('../util');
const { GENESIS_DATA, MINE_RATE } = require('../config');


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
    let { difficulty } = lastBlock;
    let nonce = 0;

    // for proof of work
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp })
      hash = cryptoHash(timestamp, lastHash, data, difficulty, nonce);
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty))

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash

    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;

    if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}


module.exports = Block;
