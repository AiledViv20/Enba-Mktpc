import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../../../resource/validate';

const DescriptionKit = ({ showKitIncludes }) => {

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"}>
            <Flex>
                <Text as={"b"} mb={4}>Descripción y características</Text>                
            </Flex>
            <Flex flexDirection={"column"}>
                <Text lineHeight={1.2}>
                    Kit completo de {showKitIncludes.length} productos:
                </Text>
                <ul style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
                    {showKitIncludes && showKitIncludes.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "4px" }}>{capitalizeFirstLetter(item.name)}</li>
                    ))}
                </ul>
            </Flex>
        </Flex>
    );
}
 
export default DescriptionKit;