import 'mocha';
import { expect, assert } from 'chai';

import { hash, compareWithHashValue } from './crypt';

describe('Crypt', () => {
  describe('hash()', () => {
    it('generates a hash for the string', async () => {
      const inputText = 'test';
      const generatedHash = await hash(inputText);

      assert.isNotNull(generatedHash);
    });
  });

  describe('compareWithHashValue()', () => {
    it('matches given same strings', async () => {
      const string = 'test';
      const expectedHashString = await hash(string);

      const result = await compareWithHashValue(string, expectedHashString);

      expect(result).to.equal(true);
    });

    it('does not matches given different strings', async () => {
      const string = 'test';
      const randomString = 'testing';
      const expectedHashString = await hash(string);

      const result = await compareWithHashValue(randomString, expectedHashString);

      expect(result).to.equal(false);
    });
  });
});
