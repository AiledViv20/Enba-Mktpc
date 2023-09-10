import React from 'react';
import { 
    Flex 
} from '@chakra-ui/react';
import ProductCardSp from './ProductCardSp';

const ListProductCard = ({ data }) => {
    
    return ( 
        <Flex flexDirection={"column"} w={"100%"} pr={2}>
            {data ? data.map((item, idx) => {
                return (
                    <ProductCardSp key={idx} product={item} />
                )
            }) : null}
        </Flex>
    );
}

export default ListProductCard;