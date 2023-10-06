const crypto = require('crypto');

// Specify the key length (128, 192, or 256 bits)
const keyLengthBits = 256; // Change this to your desired key length

// Generate a random AES passkey
const aesPasskey = crypto.randomBytes(keyLengthBits / 8).toString('hex');

console.log('AES Passkey:', aesPasskey);
