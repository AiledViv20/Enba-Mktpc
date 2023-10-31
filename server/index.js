const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const dontev = require('dotenv');
dontev.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor Node.js!');
});

app.post('/api-stripe/procesar-pago', async (req, res) => {
  const { payment_method_id, amount_total } = req.body;

    try {
        // Crea un pago o suscripción en Stripe usando payment_method_id
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method: payment_method_id,
            amount: amount_total, // Monto en centavos
            currency: 'MXN',
            confirmation_method: 'manual',
            confirm: true,
            return_url: 'https://enba.mx/productos/cotizar'
        });
        console.log(paymentIntent)
        const paymentConfirm = await stripe.paymentIntents.confirm(paymentIntent.id);
        console.log(paymentConfirm)
        // Responde con el estado del pago
        res.json({ success: true, paymentIntent });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
});

app.post('/api-img-convert', async (req, res) => {
    const { imgUrl } = req.body;
  
      try {
            const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data, 'binary');
            const base64Image = imageBuffer.toString('base64');
            res.json({ success: true, base64Image });
      } catch (error) {
          console.error(error);
          res.json({ success: false, error: error.message });
      }
});

app.listen(3001, () => {
  console.log('Servidor iniciado en el puerto 3001');
});
