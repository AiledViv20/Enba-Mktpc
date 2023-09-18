import React from 'react';
import { 
    Flex, 
    Select, 
    Text
} from '@chakra-ui/react';

const OrderBy = ({setOrder}) => {

    return ( 
        <Flex flexDirection={"column"} pl={10} zIndex={1} bg={"#FFF"}>
            <Text fontSize={"14px"} fontWeight={500} mb={2}>Organizar por</Text>
            <Select _hover={{ cursor: 'pointer' }} zIndex={1} fontSize={"14px"} onChange={(e) => setOrder(e.target.value)}>
                <option value='ASC'>Menor a mayor precio</option>
                <option value='DESC'>Mayor a menor precio</option>
            </Select>
        </Flex>
    );
}
 
export default OrderBy;