import React from 'react';
import { 
    IconButton,
    Text,
    Flex
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

const ButtonShoppingCart = () => {
    return (
        <Flex alignItems={"center"}>
            <IconButton
                zIndex={1}
                isRound={true}
                border={"transparent"}
                variant='outline'
                onClick={() => window.location.href = '/productos/cotizar'}
                fontSize='20px'
                icon={<FaShoppingCart />}
            />
            <Text fontSize={"16px"} fontWeight={500} color={"#424242"}>Carrito</Text>
        </Flex>
    );
}
 
export default ButtonShoppingCart;