import React, { useContext } from 'react';
import { 
    Flex, 
    Select, 
    Text
} from '@chakra-ui/react';
import { CardFilterContext } from '../../../context';
import { actions } from '../../../context/actions';

const OrderBy = () => {
    const { state, dispatch } = useContext(CardFilterContext);

    const handleChange = (e) => {
        dispatch({
            type: actions.orderCards,
            payload: e.target.value
        });
    };

    return ( 
        <Flex flexDirection={"column"} pl={10}>
            <Text fontSize={"14px"} fontWeight={500} mb={2}>Organizar por</Text>
            <Select 
                name='order'
                _hover={{ cursor: 'pointer' }} 
                fontSize={"14px"} 
                onChange={handleChange}
                value={state.order}>
                <option value='ASC'>Menor a mayor precio</option>
                <option value='DESC'>Mayor a menor precio</option>
            </Select>
        </Flex>
    );
}
 
export default OrderBy;