import React, { useState } from 'react';
import { 
    Flex,
    Button,
    Spinner
} from '@chakra-ui/react';
import {
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import './styled.css';
import { usePostStripeSendPaymentMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';

const StripeForm = ({ sumTotalOrder, setCheckPay }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const [postStripeSendPayment] = usePostStripeSendPaymentMutation();

    const handleSubmit = async () => {
        setLoading(true);
        if (!stripe || !elements) {
          return;
        }
      
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });
      
        if (error) {
          console.error(error);
        } else {
            let amountCents = sumTotalOrder * 100;
            amountCents = parseInt(amountCents);
            const sendStripeData = { payment_method_id: paymentMethod.id, amount_total: amountCents };
            // Envía el ID del método de pago a tu servidor para completar la transacción
            postStripeSendPayment(sendStripeData).then(res => {
                if (res.data) {
                    window.open('/pago-completado', '_blank');
                    setCheckPay(true);
                    setLoading(false);
                    toast.success("¡Tu pago se ha realizado correctamente!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else {
                    toast.error("¡Tu pago no se ha realizado correctamente!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }).catch(err => {
                console.error('Error en la solicitud:', error);
            })
        }
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();}}>
            <CardElement 
                options={{
                    style: {
                        base: {
                            fontSize: '16px'
                        },
                    },
            }}/>
            <Flex mt={3} justifyContent={"end"}>
                <Button width={"208px"} _hover={{ bg: "#063D5F"}} fontWeight={600} fontSize={"14px"}
                    type="submit" isDisabled={loading}>
                    {loading ? 
                        <Spinner />
                    : 
                        <p>Pagar</p>
                    }
                </Button>
                {errorMessage && <div>{errorMessage}</div>}
            </Flex>
        </form>
    );
}
 
export default StripeForm;