const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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
    const { amount_total } = req.body;

    try {
        // Crea un pago o suscripción en Stripe usando payment_method_id
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method: payment_method_id,
            amount: amount_total, // Monto en centavos
            currency: 'MXN',
            confirmation_method: 'manual',
            confirm: true,
            automatic_payment_methods: {enabled: true},
            return_url: 'https://enba.mx/productos/cotizar'
        });
        await stripe.paymentIntents.confirm(paymentIntent.id);
        // Responde con el estado del pago
        res.json({ success: true, paymentIntent });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
});

app.post('/api-stripe/crear-sesion-oxxo', async (req, res) => {
    const {  amount_total } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['oxxo'],
            line_items: [{
                price_data: {
                    currency: 'mxn',
                    product_data: {
                        name: 'Porta notas azalai', // Reemplaza con el nombre de tu producto
                    },
                    unit_amount: amount_total,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `https://enba.mx/pago-completado`,
            cancel_url: `https://enba.mx/cotizar`,
        });
        // Responde con el estado del pago
        res.json({ success: true, checkout_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
});

app.listen(3001, () => {
  console.log('Servidor iniciado en el puerto 3001');
});
