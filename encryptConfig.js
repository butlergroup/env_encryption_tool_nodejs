const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const algorithm = 'aes-256-gcm';
const secretKey = ''; // Replace with a strong 32-byte (character) key (256-bit)
const iv = crypto.randomBytes(12); // 12 bytes is recommended for GCM

const configFilePath = path.join(__dirname, '.env');
const encryptedFilePath = path.join(__dirname, 'env.enc');

const configData = fs.readFileSync(configFilePath, 'utf8');
const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'utf8'), iv);

const encrypted = Buffer.concat([cipher.update(configData, 'utf8'), cipher.final()]);
const authTag = cipher.getAuthTag();

// Save IV, auth tag, and encrypted data (hex-encoded)
const payload = `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
fs.writeFileSync(encryptedFilePath, payload);