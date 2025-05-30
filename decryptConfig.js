const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

module.exports = function() {
    try {
        const algorithm = 'aes-256-ctr';
        const secretKey = process.env.DECRYPTION_KEY;
        const encryptedFilePath = path.join(__dirname, 'env.enc');

        const fileContent = fs.readFileSync(encryptedFilePath, 'utf8');
        const [iv, encryptedData] = fileContent.split(':');

        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
        const decryptedData = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);
        const decryptedString = decryptedData.toString();

        const lines = decryptedString.split('\n');
        lines.forEach(line => {
            if (line) {
                const [key, ...valueParts] = line.split('=');
                let value = valueParts.join('=').trim();
                
                // Remove quotes if they exist
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1);
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
