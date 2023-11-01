import React from 'react';
import { 
    Flex 
} from '@chakra-ui/react';
import ProductCardSp from './ProductCardSp';

const ListProductCard = ({ data, setSubTotalSum, setSumTotalOrder }) => {
    
    return ( 
        <Flex flexDirection={"column"} w={"100%"} pr={0}>
            {data ? data.map((item, idx) => {
                return (
                    <ProductCardSp key={idx} product={item} setSubTotalSum={setSubTotalSum} setSumTotalOrder={setSumTotalOrder} />
                )
            }) : null}
        </Flex>
    );
}

export default ListProductCard;