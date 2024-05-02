const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth()
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// listening to all incoming messages
client.on('message_create', async (message) => {
  const content = message.body;

  console.log(content);
  // replying to messages
  if (content === 'pls meme') {
    const meme = await axios();
  }
});

// Start your client
client.initialize();
