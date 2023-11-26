import React from 'react';
import { 
    Flex 
} from '@chakra-ui/react';
import ProductCardSp from './ProductCardSp';

const ListProductCard = ({ data, setPriceIva, setPriceSend, setSubTotalSum, setSumTotalOrder }) => {
    
    return ( 
        <Flex flexDirection={"column"} w={"100%"} pr={0}>
            {data ? data.map((item, idx) => {
                return (
                    <ProductCardSp 
                        key={idx} 
                        idx={idx}
                        product={item} 
                        setPriceIva={setPriceIva}
                        setPriceSend={setPriceSend}
                        setSubTotalSum={setSubTotalSum} 
                        setSumTotalOrder={setSumTotalOrder} />
                )
            }) : null}
        </Flex>
    );
}

export default ListProductCard;