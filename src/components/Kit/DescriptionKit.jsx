import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';

const DescriptionKit = ({ data }) => {

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex flexDirection={"column"}>
                <Text as={"b"} mb={4}>Descripción y características</Text>
                <Text lineHeight={1.2}>
                    {data.description}
                </Text>
            </Flex>
        </Flex>
    );
}
 
export default DescriptionKit;