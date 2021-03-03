const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {

  it('produces a SHA-256 hashed output',() => {
    expect(cryptoHash('obamarocks'))
      .toEqual('2b8cf2e664652d5b4b54e1c073007d378eda3502a61a10d8d7043bff87ed5c42');
  });

  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three'))
      .toEqual(cryptoHash('three', 'two', 'one'));
  })
});
