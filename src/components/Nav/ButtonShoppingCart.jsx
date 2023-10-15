import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../hooks/slices/counterSlice';
import { 
    IconButton,
    Text,
    Flex,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

const ButtonShoppingCart = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const productsStore = useSelector(selectProducts);

    const [numShoppingCart, setNumShoppingCart] = useState(0);

    useEffect(() => {
        setNumShoppingCart(productsStore?.length);
    }, []);

    useEffect(() => {
        setNumShoppingCart(productsStore?.length);
    }, [productsStore]);

    return (
        <Flex alignItems={"center"} position={"relative"}>
            <Flex bottom={6} left={8} borderRadius={"full"} p={"2px 6px"} zIndex={1} position={"absolute"} display={numShoppingCart > 0 ? "flex" : "none"} bg={"#329DDE"} color={"#FFF"}>
                <Text fontWeight={600} fontSize={"12px"}>{numShoppingCart}</Text>
            </Flex>
            <IconButton
                zIndex={1}
                isRound={true}
                border={"transparent"}
                variant='outline'
                onClick={() => window.location.href = '/productos/cotizar'}
                fontSize='26px'
                icon={<FaShoppingCart />}
            />
        </Flex>
    );
}
 
export default ButtonShoppingCart;