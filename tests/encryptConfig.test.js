const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ENCRYPT_SCRIPT = path.join(__dirname, '..', 'encryptConfig.js');
const ENV_FILE = path.join(__dirname, '..', '.env');
const ENC_FILE = path.join(__dirname, '..', 'env.enc');
const TEST_KEY = '12345678901234567890123456789012'; // 32 characters

describe('encryptConfig.js', () => {
  beforeAll(() => {
    // Create a dummy .env file
    fs.writeFileSync(ENV_FILE, 'TEST_KEY=supersecret\nDEBUG=true');
    
    // Patch encryptConfig.js with the test key
    const scriptContent = fs.readFileSync(ENCRYPT_SCRIPT, 'utf8');
    const patchedScript = scriptContent.replace(
      /const secretKey = '';/,
      `const secretKey = '${TEST_KEY}';`
    );
    fs.writeFileSync(ENCRYPT_SCRIPT, patchedScript);
  });

  afterAll(() => {
    // Cleanup
    if (fs.existsSync(ENV_FILE)) fs.unlinkSync(ENV_FILE);
    if (fs.existsSync(ENC_FILE)) fs.unlinkSync(ENC_FILE);

    // Restore original encryptConfig.js
    const originalContent = fs.readFileSync(ENCRYPT_SCRIPT, 'utf8').replace(
      new RegExp(`const secretKey = '${TEST_KEY}';`),
      "const secretKey = '';"
    );
    fs.writeFileSync(ENCRYPT_SCRIPT, originalContent);
  });

  it('should generate env.enc file with valid format', () => {
    // Execute the script
    execFileSync('node', [ENCRYPT_SCRIPT]);

    expect(fs.existsSync(ENC_FILE)).toBe(true);

    const content = fs.readFileSync(ENC_FILE, 'utf8');
    const parts = content.split(':');

    expect(parts.length).toBe(3); // IV, authTag, encrypted
    expect(parts[0]).toMatch(/^[a-f0-9]+$/i);
    expect(parts[1]).toMatch(/^[a-f0-9]+$/i);
    expect(parts[2]).toMatch(/^[a-f0-9]+$/i);
  });
});
