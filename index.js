const { Clien, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
client.on('message_create', (message) => {
  console.log(message.body);
  // replying to messages
  if (message.body === 'customer text') {
    // sending a message
    client.sendMessage(message.from, 'answer text');
    // reply directly to the message
    message.reply('answer text');
  }
});

// Start your client
client.initialize();
