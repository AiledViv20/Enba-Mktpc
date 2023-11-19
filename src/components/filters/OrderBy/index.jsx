import React, { useState, useEffect } from 'react';
import { 
    Flex, 
    Select, 
    Text
} from '@chakra-ui/react';

const OrderBy = ({ setLoading, currentProducts, setCurrentProducts }) => {
    const [order, setOrder] = useState({
        subOrder: ''
    });

    const handleChange = (e) => {
        setOrder({
            subOrder: e.target.value
        });
    };

    useEffect(() => {
        setLoading(true);
        if (currentProducts) {
            let sortedData = [];
            if (order.subOrder === "ASC") {
                sortedData = currentProducts.sort((a, b) => parseFloat(a.wholesale_price) - parseFloat(b.wholesale_price));
            } else {
                sortedData = currentProducts.sort((a, b) => parseFloat(b.wholesale_price) - parseFloat(a.wholesale_price));
            }
            setCurrentProducts(sortedData);
            setLoading(false);
        }
    }, [order]);

    return ( 
        <Flex flexDirection={"column"} pl={10}>
            <Text fontSize={"14px"} fontWeight={500} mb={2}>Organizar por</Text>
            <Select 
                name='order'
                _hover={{ cursor: 'pointer' }} 
                fontSize={"14px"} 
                onChange={handleChange}
                value={order.subOrder}>
                <option value='ASC'>Menor a mayor precio</option>
                <option value='DESC'>Mayor a menor precio</option>
            </Select>
        </Flex>
    );
}
 
export default OrderBy;