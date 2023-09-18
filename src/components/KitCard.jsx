import React, { useEffect, useState } from 'react';
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

const KitCard = ({ product }) => {
    const [price, setPrice] = useState(0);
    
    useEffect(() => {
        const min_prices = []
        product.products.forEach(element => {
            let min_price = 9999999
            element.prices.map((e) => {
                if (e.retail_price < min_price) {
                    min_price = e.retail_price
                }
            })
            if(min_price !== 9999999)
                min_prices.push(min_price)
        })
        let total = 0
        min_prices.map((e) => {
            total += parseFloat(e)
        })
        setPrice(total.toFixed(2))
    },[product])
    
    return ( 
        <Container key={product.id} margin="0" gap="0" padding="0" zIndex={1}>
            <Box
                w="294px"
                h="410px"
                m="2"
                border={"1px solid #A4A4A4"}
                borderRadius={"20px"}
                overflow="hidden"
                cursor="pointer"
                onClick={() => window.location.href = `/kit/${product ? product.name : ""}`}
                aria-label={product.name}
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
                    -5% en la compra del kit
                </Tag>
                <Flex justifyContent={"center"} pt={5}>
                    <Image width={"192px"} height={"192px"} src={product.products[0].images[0].images.images_item[0]} alt={product.title} />
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
 
export default KitCard;