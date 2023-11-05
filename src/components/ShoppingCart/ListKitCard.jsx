import React from 'react';
import { 
    Flex 
} from '@chakra-ui/react';
import KitCardSp from './KitCardSp';

const ListKitCard = ({ data, subTotalSum, setSubTotalSum, setSumTotalOrder }) => {
    
    return ( 
        <Flex flexDirection={"column"} w={"100%"} pr={0}>
            {data ? data.map((item, idx) => {
                return (
                    <KitCardSp 
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

export default ListKitCard;