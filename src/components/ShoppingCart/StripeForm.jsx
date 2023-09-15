import React, { useState } from 'react';
import { 
    Flex,
    Button
} from '@chakra-ui/react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import './styled.css';

const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async () => {
      
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
            // Envía el ID del método de pago a tu servidor para completar la transacción
            try {
                const response = await fetch('http://localhost:3001/procesar-pago', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_SECRET_KEY}`
                    },
                    body: JSON.stringify({ payment_method_id: paymentMethod.id }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Respuesta exitosa:', data);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    };      

    return ( 
        <Flex flexDirection={"column"}>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();}}>
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                
                            },
                        },
                    }}/>
                <Flex mt={3} justifyContent={"end"}>
                    <Button width={"208px"} _hover={{ bg: "#063D5F"}} fontWeight={600} fontSize={"14px"}
                        type="submit" disabled={!stripe || !elements}>
                        Pagar
                    </Button>
                    {errorMessage && <div>{errorMessage}</div>}
                </Flex>
            </form>
        </Flex>
    );
}
 
export default StripeForm;