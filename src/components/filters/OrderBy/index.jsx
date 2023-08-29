import React from 'react';
import { 
    Flex, 
    Select, 
    Text
} from '@chakra-ui/react';

const OrderBy = () => {

    return ( 
        <Flex flexDirection={"column"} pl={10}>
            <Text fontSize={"14px"} fontWeight={500} mb={2}>Organizar por</Text>
            <Select placeholder='Menor a mayor precio' fontSize={"14px"}>
                <option value='1'>Mayor a menor precio</option>
            </Select>
        </Flex>
    );
}
 
export default OrderBy;