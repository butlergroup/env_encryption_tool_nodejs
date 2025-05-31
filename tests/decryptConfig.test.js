const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

jest.mock('fs');

describe('decryptConfig', () => {
  const decryptConfig = require('../decryptConfig');

  beforeEach(() => {
    process.env.DECRYPTION_KEY = '12345678901234567890123456789012'; // 32 chars
    const iv = crypto.randomBytes(12);
    const authTag = Buffer.alloc(16);
    const data = 'TEST_KEY=TEST_VALUE\nANOTHER_KEY=123';

    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(process.env.DECRYPTION_KEY), iv);
    const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const authTagBuffer = cipher.getAuthTag();

    fs.readFileSync.mockReturnValue([
      iv.toString('hex'),
      authTagBuffer.toString('hex'),
      encryptedData.toString('hex'),
    ].join(':'));
  });

  it('should decrypt and set environment variables', () => {
    decryptConfig();
    expect(process.env.TEST_KEY).toBe('TEST_VALUE');
    expect(process.env.ANOTHER_KEY).toBe('123');
  });
});
