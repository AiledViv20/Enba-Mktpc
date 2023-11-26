import React from 'react';
import { 
    Flex 
} from '@chakra-ui/react';
import KitCardSp from './KitCardSp';

const ListKitCard = ({ data, setPriceIva, setPriceSend, setSubTotalSum, setSumTotalOrder }) => {
    
    return ( 
        <Flex flexDirection={"column"} w={"100%"} pr={0} pt={5}>
            {data ? data.map((item, idx) => {
                return (
                    <KitCardSp 
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

export default ListKitCard;