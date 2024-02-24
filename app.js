const qrcode = require('qrcode');

const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const client = new Client();

client.on('qr', async (qr) => {
    try {
      // Generar la imagen del código QR y guardarla en un archivo
      const qrCodeImage = await qrcode.toDataURL(qr, { errorCorrectionLevel: 'H' });
      const qrCodeBuffer = Buffer.from(qrCodeImage.split(',')[1], 'base64');
      fs.writeFileSync('codeqr.png', qrCodeBuffer);
  
      console.log('Código QR generado y guardado como codeqr.png');
    } catch (error) {
      console.error('Error al generar y guardar el código QR:', error);
    }
  });

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
	if (message.body === '!ping') {
		await message.reply('pong');
	}
});

client.initialize();
