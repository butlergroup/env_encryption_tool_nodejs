const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

module.exports = function() {
    try {
        const algorithm = 'aes-256-gcm';
        const secretKey = process.env.DECRYPTION_KEY;
        const encryptedFilePath = path.join(__dirname, 'env.enc');

        const fileContent = fs.readFileSync(encryptedFilePath, 'utf8');
        const [ivHex, authTagHex, encryptedHex] = fileContent.split(':');

        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const encryptedData = Buffer.from(encryptedHex, 'hex');

        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'utf8'), iv);
        decipher.setAuthTag(authTag);

        const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        const decryptedString = decryptedData.toString('utf8');

        // Set environment variables
        decryptedString.split('\n').forEach(line => {
            if (line) {
                const [key, ...valueParts] = line.split('=');
                let value = valueParts.join('=').trim();
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                if (key && value) {
                    process.env[key.trim()] = value;
                }
            }
        });
    } catch (error) {
        console.error('Error during decryption:', error);
    }
};
