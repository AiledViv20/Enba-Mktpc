import React from 'react';
import { 
    Button,
    Flex,
    Text,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import '../styled.css';

const Step3 = ({ step3, nextStep }) => {
    return ( 
        <Flex mt={10} flexDirection={"column"} display={step3 ? "flex" : "none"} color={"#424242"}>
            <Text mb={10} fontSize={"18px"} fontWeight={700}>Te hemos enviado una confirmación por correo</Text>
            <Text mt={5} fontSize={"16px"}><span className='info-trans'>Banco: </span>{"Banco mercantil del norte sa (Banorte sa)"}</Text>
            <Text mt={5} fontSize={"16px"}><span className='info-trans'>No. de cuenta: </span>0864865722</Text>
            <Text mt={5} fontSize={"16px"}><span className='info-trans'>Clabe: </span>072 320 008648645722 4</Text>
            <Button 
                bg={"accent.500"} borderRadius={"8px"} 
                fontSize={"14px"} fontWeight={600}
                width={"268px"} height={"48px"} mt={10}
                _hover={{
                    bg: "#063D5F"
                }}>
                Cargar comprobante de pago
            </Button>
            <Text mt={5} color={"#000"} fontSize={"16px"} lineHeight={1.2}>
                <Text>Envíe el comprobante de pago al correo de</Text>
                <Text as={"b"} fontSize={"18px"} textDecoration={"underline"}>marketplace@enba.mx</Text>
                <Text>con el número de orden.</Text>
            </Text>
            <Button 
                variant={"outline"} border={"1px solid #064A73"}
                width={"350px"} height={"40px"} color={"accent.500"}
                fontSize={"18px"} fontWeight={600} mt={5}
                onClick={() => nextStep()}>Siguiente</Button>
            <Alert mt={20} status='info' width={"max-content"}>
                <AlertIcon />
                A partir de este momento cuentas con 14 días naturales/10 días hábiles<br />para realizar el pago, de lo contrario el pedido se cancelará.
            </Alert>
        </Flex>
    );
}

export default Step3;
