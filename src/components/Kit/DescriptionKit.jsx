import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';

const DescriptionKit = ({ showKitIncludes }) => {

    const renderPause = (num) => {
        if (num === 0) {
            return "";
        } else if (num > 0 && num < showKitIncludes.length - 1) {
            return ", ";
        } else if (num === showKitIncludes.length - 1) {
            return " y ";
        }
    }

    const renderSpace = (num) => {
        if (num === 0) {
            return 2;
        } else if (num > 0 && num < showKitIncludes.length - 1) {
            return 0;
        } else if (num === showKitIncludes.length - 1) {
            return 2;
        }
    }

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex>
                <Text as={"b"} mb={4}>Descripción y características</Text>                
            </Flex>
            <Flex flexDirection={"row"}>
                <Text lineHeight={1.2}>
                    Kit completo de {showKitIncludes.length} productos:
                </Text>
                {showKitIncludes && showKitIncludes.map((item, idx) => (
                    <Text key={idx} ml={renderSpace(idx)}  width={"auto"}>
                        {renderPause(idx)}
                        {`${item.name.toLowerCase()}`}
                    </Text>
                ))}.
            </Flex>
        </Flex>
    );
}
 
export default DescriptionKit;
