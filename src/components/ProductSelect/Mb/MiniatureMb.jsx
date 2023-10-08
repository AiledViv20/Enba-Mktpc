import React from 'react';
import { 
    Flex, 
    IconButton,
    Image
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const MiniatureMb = ({images, setImg, setIdx, idx}) => {
    return ( 
        <Flex alignItems={"center"}>
            <IconButton
                w={"38px"} h={"38px"}
                bg='#FFF'
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronLeftIcon />}
                isDisabled={idx === 0}
                onClick={() => setIdx(idx - 1)}
            />
            <Flex flexDirection={"column"}>
                <Image src={images[idx]} width={"250"} height={"250"} mb={3} onClick={() => setImg(images[idx])} cursor={"pointer"}/>
            </Flex>
            <IconButton
                w={"38px"} h={"38px"}
                bg='#FFF'
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronRightIcon />}
                isDisabled={idx === images.length - 3}
                onClick={() => setIdx(idx + 1)}
            />
        </Flex>
    );
}
 
export default MiniatureMb;