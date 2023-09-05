import React, { useContext, useEffect, useState } from 'react';
import { 
    IconButton,
    Text,
    Flex
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { actions } from '../../context/ShoppingCartContext/actions';

const ButtonShoppingCart = () => {
    const { state, dispatch } = useContext(ShoppingCartContext);
    const [numShoppingCart, setNumShoppingCart] = useState(0);
    const [productsSP, setProductsSP] = useState([]);
    const [kitsSP, setKitsSP] = useState([]);

    useEffect(() => {
        const tlproductsSP = JSON.parse(localStorage.getItem('productos'));
        console.log(tlproductsSP)
        if (tlproductsSP) {
            setProductsSP(tlproductsSP);
            dispatch({ type: actions.getProducts });
            dispatch({ type: actions.getProductsSuccess, payload: productsSP });
            dispatch({ type: actions.getProductsError, payload: "Productos actualizados" });
            setNumShoppingCart(productsSP.length);
        }
        const tlkitsSP = JSON.parse(localStorage.getItem('kits'));
        console.log(tlkitsSP)
        if (tlkitsSP) {
            setKitsSP(tlkitsSP);
            dispatch({ type: actions.getKits });
            dispatch({ type: actions.getKitsSuccess, payload: kitsSP });
            dispatch({ type: actions.getKitsError, payload: "Productos de kit actualizados" });
            setNumShoppingCart(kitsSP?.length + productsSP?.length);
        }
    }, []);

    useEffect(() => {
        setNumShoppingCart(kitsSP?.length + productsSP?.length);
    }, [productsSP, kitsSP]);

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
            <Text ml={2} fontSize={"16px"} fontWeight={500} color={"#424242"}>Carrito</Text>
        </Flex>
    );
}
 
export default ButtonShoppingCart;