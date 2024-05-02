const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
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

  // replying to messages
  if (content === 'pls meme') {
    const meme = await axios('https://meme-api.com/gimme').then((res) => res.data);

    client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url));
  } else if (content === 'pls joke') {
    const joke = await axios('https://v2.jokeapi.dev/joke/Any?safe-mode').then((res) => res.data);

    const jokeMsg = await client.sendMessage(message.from, joke.setup);
    if (joke.delivery) setTimeout(() => jokeMsg.reply(joke.delivery), 5000);
  }
});

// Start your client
client.initialize();
