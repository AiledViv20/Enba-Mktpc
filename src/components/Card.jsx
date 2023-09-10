import React from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCounter, setCounter } from '../hooks/slices/counterSlice';

const Card = () => {
    const counter = useSelector(selectCounter);
    const dispatch = useDispatch();

    const addProductShoppingCart = () => {
        dispatch(
            setCounter({counter: counter+1})
        )
    }

    return ( 
        <Flex>
            <Text>{`El contador es ${counter}`}</Text>
            <Button zIndex={1} variant={'outline'} type='button' onClick={() => addProductShoppingCart()}>Contador</Button>
        </Flex>
    );
}
 
export default Card;