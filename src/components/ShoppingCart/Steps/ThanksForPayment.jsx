import React from 'react';
import { 
    Button,
    Flex,
    Text
} from '@chakra-ui/react';

const ThanksForPayment = ({ step4, nextStep }) => {

    return (
        <Flex mt={10} flexDirection={"column"} display={step4 ? "flex" : "none"}>
            <Text mb={10} fontSize={"16px"} fontWeight={700}>Te hemos enviado una confirmación por correo</Text>
            <Button 
                variant={"outline"} border={"1px solid #064A73"}
                width={"350px"} height={"40px"} color={"accent.500"}
                fontSize={"18px"} fontWeight={600}
                onClick={() => nextStep()}>Solicitar factura</Button>
        </Flex>
    );
}
 
export default ThanksForPayment;
