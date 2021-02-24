/* BlockChain */
const cryptoHash = require('./crypto-hash');
const { GENESIS_DATA } = require('./config');


class Block {
  // all blocks should have timestamp, last hash, hash, and data
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;

  }

  // genesis block is created off of hardcoded data to serve as first reference in the blockchain
  static genesis() {
    return new this(GENESIS_DATA);
  }

  // create/mine a block
  static mineBlock({ lastBlock, data}) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;

    return new this({
      timestamp,
      lastHash,
      data,
      hash: cryptoHash(timestamp, lastHash, data)
    });
  }
}


module.exports = Block;
