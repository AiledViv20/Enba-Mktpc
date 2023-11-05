import React from 'react';
import { 
    Flex 
} from '@chakra-ui/react';
import ProductCardSp from './ProductCardSp';

const ListProductCard = ({ data, subTotalSum, setSubTotalSum, setSumTotalOrder }) => {
    
    return ( 
        <Flex flexDirection={"column"} w={"100%"} pr={0}>
            {data ? data.map((item, idx) => {
                return (
                    <ProductCardSp 
                        key={idx} 
                        product={item} 
                        subTotalSum={subTotalSum}
                        setSubTotalSum={setSubTotalSum} 
                        setSumTotalOrder={setSumTotalOrder} />
                )
            }) : null}
        </Flex>
    );
}

export default ListProductCard;