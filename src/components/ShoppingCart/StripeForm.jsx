import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalAmount } from '../../hooks/slices/counterSlice';
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
import { api } from '../../service';

import { toast } from 'react-toastify';

const StripeForm = () => {
    const totalAmountStore = useSelector(selectTotalAmount);

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
                const response = await api({
                    method: "post",
                    url: "/api-stripe/procesar-pago",
                    data: { payment_method_id: paymentMethod.id, amount_total: totalAmountStore }
                });
                const { data, status } = response;
                if (status === 200) {
                    toast.success("¡Tu pago hecho correctamente!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
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