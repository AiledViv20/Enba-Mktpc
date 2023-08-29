import React from 'react';
import {
    Box,
    HStack,
    Flex,
    Stack,
    Image,
    Text,
    Tag,
    Container,
} from "@chakra-ui/react";

const ProductCard = ({ product }) => {
    return ( 
        <Container key={product.id} margin="0" gap="0" padding="0">
            <Box
                w="294px"
                h="410px"
                m="2"
                border={"1px solid #A4A4A4"}
                borderRadius={"20px"}
                overflow="hidden"
                cursor="pointer"
                onClick={() => window.location.href = `/producto/${product ? product.name : ""}`}
                aria-label={product.title}
            >
                <Tag
                    bg={product.bg}
                    color="white"
                    fontSize={"12px"}
                    fontWeight={500}
                    px="8"
                    py="2"
                    rounded="20px 0px 20px 0px"
                >
                    {product.promotion}
                </Tag>
                <Flex justifyContent={"center"} pt={5}>
                    <Image width={"192px"} height={"192px"} src={product.url} alt={product.title} />
                </Flex>
                <Flex direction="column" px="4" pt="10" pb="1">
                    <Box
                        title={product.title} textAlign={"center"}
                    >
                        <Text fontSize="14px" fontWeight={500} color="#A4A4A4" lineHeight={"10px"}>
                            {product.title}
                        </Text>
                        <Text fontSize="16px" fontWeight={500} color="#424242" lineHeight={"46px"}>
                            {product.description}
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
                                    <br />${product.price}
                                </Text>
                        </Text>
                    </HStack>
                </Flex>
            </Box>
        </Container>
    );
}
 
export default ProductCard;