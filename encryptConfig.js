const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const algorithm = 'aes-256-ctr'; // Choose an encryption algorithm
const secretKey = ''; // Replace with a strong 32-character secret key
const iv = crypto.randomBytes(16); // Initialization vector

const configFilePath = path.join(__dirname, '.env');
const encryptedFilePath = path.join(__dirname, 'env.enc');

const configData = fs.readFileSync(configFilePath, 'utf8');
const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
const encryptedData = Buffer.concat([cipher.update(configData), cipher.final()]);

fs.writeFileSync(encryptedFilePath, `${iv.toString('hex')}:${encryptedData.toString('hex')}`);
