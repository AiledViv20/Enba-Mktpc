import React from 'react';
import { Flex } from '@chakra-ui/react';
import iconWpp from '../assets/icons/wpp.svg';

const ButtonWhatsApp = () => {
    const phoneNumber = '3333050000';
    const message = 'Hola, quisiera más información sobre algunos productos.';
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    return (
        <Flex zIndex={"10"} position={"fixed"} bottom={"0"} right={"0"}>
            <Flex display={"inline-flex"} transformOrigin={"center"} p={5} _hover={{ cursor: "pointer" }}>
                <img onClick={() => window.open(whatsappURL, '_blank')} src={iconWpp} width='60' height='60' alt='icon wpp' />
            </Flex>
        </Flex>
    );
}

export default ButtonWhatsApp;
