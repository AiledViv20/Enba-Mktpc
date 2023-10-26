const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');

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
        });
        await stripe.paymentIntents.confirm(paymentIntent.id);
        // Responde con el estado del pago
        res.json({ success: true, paymentIntent });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
});

app.listen(3001, () => {
  console.log('Servidor iniciado en el puerto 3001');
});
