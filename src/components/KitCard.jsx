import React, { useEffect, useState } from 'react';
import {
    Box,
    HStack,
    Flex,
    Image,
    Text,
    Tag,
    Container,
    Grid,
    GridItem
} from "@chakra-ui/react";
import { formatterValue } from '../resource/validate';

const KitCard = ({ product }) => {
    const [price, setPrice] = useState(0);
    const [imgList, setImgList] = useState([]);
    
    useEffect(() => {
        const min_prices = [];
        let imgCollageList = [];
        product.products.forEach((element, idx) => {
            let min_price = 9999999
            element.prices.map((e) => {
                if (e.wholesale_price < min_price) {
                    min_price = e.wholesale_price
                }
            })
            if(min_price !== 9999999) {
                min_prices.push(min_price)
            }
            imgCollageList = [
                ...imgCollageList,
                {
                    id: idx,
                    imgUrl: element.images[0]?.images?.images_item[0]

                }
            ]
        })
        setImgList(imgCollageList);
        let total = 0
        min_prices.map((e) => {
            total += parseFloat(e)
        })
        let discountAmount = total * 0.05;
        total = total - discountAmount;
        setPrice(total.toFixed(2));
        
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
                <Grid templateColumns='repeat(2, 2fr)' w={"100%"} h={"196px"}>
                    {imgList.length >= 4 && imgList.map((item, idx) => (
                        item.imgUrl ? (
                        <GridItem key={idx}>
                            <Flex w={"100%"} justifyContent={"center"}>
                            <Image w={"96px"} h={"96px"} src={item.imgUrl} alt={"kit1"} />
                            </Flex>
                        </GridItem>
                        ) : null
                    ))}
                </Grid>
                <Flex direction="column" px="4" pt="5" pb="1">
                    <Box
                        title={product.name.toLowerCase()} textAlign={"center"}>
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