import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectKitsList, setKitsList } from '../../hooks/slices/counterSlice';
import {
    Box,
    HStack,
    Flex,
    Image,
    Text,
    Tag,
    Container,
    IconButton
} from "@chakra-ui/react";
import { formatterValue } from '../../resource/validate';

import { toast } from 'react-toastify';

import { FaPlus } from "react-icons/fa";

const KitCard = ({ product, showIconPlus }) => {
    const kitsListStore = useSelector(selectKitsList);
    const dispatch = useDispatch();

    return (
        <Flex>
            <Flex display={showIconPlus ?  "flex" : "none"} alignItems={"center"}>
                <IconButton
                    variant='outline'
                    w={"20px"} h={"30px"}
                    colorScheme='accent.500'
                    aria-label='Plus'
                    icon={<FaPlus />}
                    />
            </Flex>
            <Container key={product.name} margin="0" gap="0" padding="0" zIndex={1}>  
                <Box
                    w="294px"
                    h="430px"
                    m="2"
                    border={"1px solid #A4A4A4"}
                    borderRadius={"20px"}
                    overflow="hidden"
                    cursor="pointer"
                    aria-label={product.name} zIndex={-1}
                >
                    <Tag
                        bg={'#FF9900'}
                        color="white"
                        fontSize={"12px"}
                        fontWeight={500}
                        px="8"
                        py="2"
                        rounded="20px 0px 20px 0px"
                    >
                        -5%
                    </Tag>
                    <Flex justifyContent={"center"} pt={5}>
                        <Image width={"192px"} height={"192px"} src={product.img} alt={product.name} />
                    </Flex>
                    <Flex direction="column" px="4" pt="10" pb="1">
                        <Box
                            title={product.name.toLowerCase()} textAlign={"center"}
                        >
                            <Text fontSize="14px" fontWeight={500} color="#A4A4A4" lineHeight={"10px"} textTransform={"capitalize"}>
                                {product.category.toLowerCase()}
                            </Text>
                            <Text fontSize="16px" fontWeight={500} color="#424242" lineHeight={"46px"} textTransform={"capitalize"}>
                                {product.name.toLowerCase()}
                            </Text>
                        </Box>
                        <HStack justifyContent={"center"}>
                            <Text
                                textAlign={"center"}
                                fontSize="12px"
                                color="#424242"
                                fontWeight={400}
                                isTruncated
                                >
                                    Desde
                                    <Text fontSize={"20px"} fontWeight={500} color={"#1A6EA0"}>
                                        <br />{formatterValue(product.total_price)}
                                    </Text>
                            </Text>
                        </HStack>
                    </Flex>
                </Box>
            </Container>
        </Flex>
    );
}
 
export default KitCard;