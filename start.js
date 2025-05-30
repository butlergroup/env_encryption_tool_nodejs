const { spawn } = require('child_process');
const decryptConfig = require('./decryptConfig');

// Decrypt the configuration
const decryptedConfig = decryptConfig();

// Check if decryptedConfig is valid
console.log('Decrypted Config:', decryptedConfig);

if (typeof decryptedConfig === 'string') {
    // Split the decrypted configuration into lines and set each as an environment variable
    const lines = decryptedConfig.split('\n');
    for (const line of lines) {
        if (line) {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
                console.log(`Set ENV: ${key.trim()}=${value.trim()}`);
            } else {
                console.log(`Invalid line: ${line}`);
            }
        }
    }
} else {
    console.error('Decrypted configuration is not a string.');
}

// Start your main application using spawn
const appProcess = spawn('node', ['server.js']); // modify this to the entrypoint of your Node.js app

// Event handlers for the spawned process
appProcess.on('error', (error) => {
    console.error('Error starting main application:', error);
});

appProcess.on('exit', (code) => {
    console.log(`Server exited with code ${code}`);
});

appProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

appProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
