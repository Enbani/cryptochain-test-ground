const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: '--- welcome to the new world ---',
  hash: 'hash-one',
  data: [],
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0
};


module.exports = { GENESIS_DATA, INITIAL_DIFFICULTY };
