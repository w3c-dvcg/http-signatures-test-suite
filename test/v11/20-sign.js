const config = require('../../config.json');
const util = require('./util');
const {expect} = require('chai');
const {registry} = require('./input/algorithms');

// base64 string should only consist of letters,
// numbers, and end with an = sign.
const base64String = /[A-Za-z0-9+/=]=$/;

describe.skip('Sign should', function() {
  let generatorOptions = null;
  before(function() {
    generatorOptions = {
      generator: config.generator,
      command: 'sign',
      args: {},
      date: new Date().toGMTString(),
    };
  });

  describe('2.4 Creating a Signature', function() {
    it('should return a base64 string', async function() {
      // The `signature` is then generated by base 64
      // encoding the output of the digital signature algorithm.
      const result = await util.generate(
        'basic-request.httpMessage', generatorOptions);
      expect(result, 'Expected sign to return a Signature').to.exist;
      result.should.match(base64String);
      console.log(result);
    });
    it('should return a valid signature string', async function() {
      const result = await util.generate(
        'basic-request.httpMessage', generatorOptions);
      expect(result, 'Expected sign to return a Signature').to.exist;
      result.should.match(base64String);
      console.log(result);
    });
    it('should use the key from keyId', async function() {
      // Use the key associated with `keyId`
      // to generate a digital signature on the signature string.
      const result = await util.generate(
        'basic-request.httpMessage', generatorOptions);
      expect(result, 'Expected sign to return a Signature').to.exist;
      result.should.match(base64String);
      console.log(result);
    });
    it('should use the algorithm to verify key type', async function() {
      //Use the `headers` and `algorithm` values as
      //well as the contents of the HTTP message,
      //to create the signature string.
    });
  });

  it('should throw if the signature scheme is not in the hsa repo', async function() {

  });

  it.skip('should conform to 2.1.1 - fail if there is no keyId', async function() {
    let error = null;
    try {
      await util.generate('nokeyid-request.httpMessage', generatorOptions);
    } catch(e) {
      error = e;
    }
    error.should.not.be.null;
  });

  it.skip('should fail if there is no signature parameter', async function() {
    let error = null;
    try {
      await util.generate('nosignature-request.httpMessage', generatorOptions);
    } catch(e) {
      error = e;
    }
    error.should.not.be.null;
  });

  it.skip('should succeed with out algorithm parameter', async function() {
    const result = await util.generate(
      'noalgorithm-request.httpMessage', generatorOptions);
    result.should.not.be.null;
    result.should.be.a('string');
  });

  it.skip('should conform to 2.1.4 - not process if created is in the future', async function() {
    /**
     * A signature with a `created` timestamp value
     * that is in the future MUST NOT be processed.
    */
    let error = null;
    try {
      await util.generate('created-in-future.httpMessage', generatorOptions);
    } catch(e) {
      error = e;
    }
    error.should.not.be.null;
  });

  it.skip('should conform to 2.1.5 - not process if expires is in the past', async function() {
    /**
      * A signatures with a `expires` timestamp
      * value that is in the past MUST NOT be processed.
    */
    let error = null;
    try {
      await util.generate('expired.httpMessage', generatorOptions);
    } catch(e) {
      error = e;
    }
    error.should.not.be.null;
  });

  it('should conform to 2.1.3 - use the algorithm param to verify key', async function() {
    /**
     * If `algorithm` is provided and differs from
     * the key metadata identified by the `keyId`,
     * for example `rsa-sha256` but an EdDSA key
     * is identified via `keyId`, then an implementation MUST produce an error.
    */
  });

});
