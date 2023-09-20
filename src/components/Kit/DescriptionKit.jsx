import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';

import TablePrice from '../TablePrice';

const DescriptionKit = ({ data }) => {

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex flexDirection={"column"}>
                <Text as={"b"} mb={4}>DESCRIPCIÓN Y CARACTERÍSTICAS</Text>
                <Text lineHeight={1.2}>
                    {data.description}
                </Text>
            </Flex>
            <Flex mt={10}>
                <TablePrice
                    pdt={data} />
            </Flex>
        </Flex>
    );
}
 
export default DescriptionKit;