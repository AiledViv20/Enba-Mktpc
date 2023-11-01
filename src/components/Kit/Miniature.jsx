import React from 'react';
import { 
    Flex, 
    IconButton,
    Image
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const Miniature = ({images, setImg, setIdx, idx}) => {
    return ( 
        <Flex flexDirection={"column"} alignItems={"center"}>
            <IconButton
                w={"48px"} h={"48px"}
                bg='#FFF' mb={5}
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronUpIcon />}
                isDisabled={idx === 0}
                onClick={() => setIdx(idx - 1)}
            />
            <Flex flexDirection={"column"}>
                <Image src={images[idx].image} width={"100"} height={"100"} mb={3} onClick={() => setImg(images[idx])} cursor={"pointer"}/>
                <Image src={images[idx+1].image} width={"100"} height={"100"} mb={3} onClick={() => setImg(images[idx+1])} cursor={"pointer"}/>
                <Image src={images[idx+2].image} width={"100"} height={"100"} onClick={() => setImg(images[idx+2])} cursor={"pointer"}/>
            </Flex>
            <IconButton
                w={"48px"} h={"48px"}
                bg='#FFF' mt={5}
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronDownIcon />}
                isDisabled={idx === images.length - 3}
                onClick={() => setIdx(idx + 1)}
            />
        </Flex>
    );
}
 
export default Miniature;