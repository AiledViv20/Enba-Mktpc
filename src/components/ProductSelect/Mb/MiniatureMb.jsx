import React from 'react';
import { 
    Flex, 
    IconButton,
    Image,
    Text
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const MiniatureMb = ({ data, images, setImg, setIdx, idx }) => {
    
    return (
        <>
            <Flex>
                <Text lineHeight={1.2} fontSize={"26px"} fontWeight={600} color={"accent.500"}>{data ? data.name.toUpperCase() : ""}</Text>
            </Flex>
            <Flex mt={10} mb={10} fontSize={"14px"} fontWeight={400} color={"#424242"}>
                <Text mr={10}><Text as={"b"}>SKU:</Text>{" "}{data ? data.sku : ""}</Text>
                <Text><Text as={"b"}>Categoría:</Text>{" "}{data ? data.category.toUpperCase() : ""}</Text>
            </Flex>
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
        </>
    );
}
 
export default MiniatureMb;