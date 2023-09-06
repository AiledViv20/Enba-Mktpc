import React from 'react';
import { 
    Flex 
} from '@chakra-ui/react';
import ProductCardSp from './ProductCardSp';

const ListProductCard = ({ data }) => {
    
    return ( 
        <Flex flexDirection={"column"} mt={8}>
            {data ? data.map((item, idx) => {
                return (
                    <ProductCardSp key={idx} product={item} />
                )
            }) : null}
        </Flex>
    );
}

export default ListProductCard;