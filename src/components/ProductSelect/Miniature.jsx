import React from 'react';
import { 
    Flex, 
    IconButton,
    Image
} from '@chakra-ui/react';
import undefinedImage from '../../assets/images/productsT/none-product.png';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const Miniature = () => {
    return ( 
        <Flex flexDirection={"column"} alignItems={"center"}>
            <IconButton
                w={"48px"} h={"48px"}
                bg='#FFF' mb={5}
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronUpIcon />}
            />
            <Flex flexDirection={"column"}>
                <Image src={undefinedImage} width={"100"} height={"100"} mb={3} />
                <Image src={undefinedImage} width={"100"} height={"100"} mb={3} />
                <Image src={undefinedImage} width={"100"} height={"100"} />
            </Flex>
            <IconButton
                w={"48px"} h={"48px"}
                bg='#FFF' mt={5}
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronDownIcon />}
            />
        </Flex>
    );
}
 
export default Miniature;