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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (elements == null) {
          return;
        }
    
        // Trigger form validation and wallet collection
        const {error: submitError} = await elements.submit();
        if (submitError) {
          // Show error to your customer
          setErrorMessage(submitError.message);
          return;
        }
    
        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await fetch('/create-intent', {
          method: 'POST',
        });
    
        const {client_secret: clientSecret} = await res.json();
    
        const {error} = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          clientSecret,
          confirmParams: {
            return_url: 'https://example.com/order/123/complete',
          },
        });
    
        if (error) {
          setErrorMessage(error.message);
        } else {

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