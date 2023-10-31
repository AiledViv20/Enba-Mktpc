import React, { useState, useEffect } from 'react';
import {
    Box,
    HStack,
    Flex,
    Image,
    Text,
    Tag,
    Container,
} from "@chakra-ui/react";
import { formatterValue } from '../resource/validate';

import imgDefault from '../assets/images/productsT/none-product.png';

const ProductCard = ({ product }) => {
    const [img, setImg] = useState(null);
    const image = product?.images?.product_images?.length > 0 ? product?.images?.product_images[0] : (product?.images?.vector_images?.length > 0 ? product?.images?.vector_images[0] : product?.images?.images_item?.length > 0 ? product?.images?.images_item[0] : "");
    let price = product?.retail_price || product?.items[0]?.retail_price;
    price = parseFloat(price);
    price = price.toFixed(2);

    useEffect(() => {
        if (image) {
            setImg(image);
        } else {
            setImg(imgDefault);
        }
    }, [image]);

    return ( 
        <Container key={product.id} margin="0" gap="0" padding="0">
            <Box
                w="280px"
                h="410px"
                m="2"
                bg={"#FFF"}
                border={"1px solid #A4A4A4"}
                borderRadius={"20px"}
                overflow="hidden"
                cursor="pointer"
                onClick={() => window.location.href = `/producto/${product ? product.product_sku ? product.product_sku : product.sku : ""}`}
                aria-label={product.name}
            >
                <Tag
                    bg={product.promotion ? "#FF9900" : "#FFF"}
                    color="white"
                    fontSize={"12px"}
                    fontWeight={500}
                    px="8"
                    py="2"
                    rounded="20px 0px 20px 0px"
                >
                    {product.promotion ? product.promotion : ""}
                </Tag>
                <Flex justifyContent={"center"} pt={5}>
                    <Image width={"192px"} height={"192px"} src={img} alt='producto' />
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
                                    <br />{formatterValue(price)}
                                </Text>
                        </Text>
                    </HStack>
                </Flex>
            </Box>
        </Container>
    );
}
 
export default ProductCard;