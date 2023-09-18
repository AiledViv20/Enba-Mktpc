import React from 'react';
import {
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import { formatterValue, capitalizeFirstLetter } from '../../resource/validate';

const ProductCardSp = ({ product }) => {

    return ( 
        <Flex bg={"#FFF"} border={"1px solid #E2E2E2"} mb={3} padding={3} borderRadius={"8px"}>
            <Flex w={"30%"}>
                <Image src={product.image} width={"106px"} height={"80px"} alt='img' />
            </Flex>
            <Flex w={"70%"}>
                <Flex w={"80%"} flexDirection={"column"} h={"100%"}>
                    <Flex w={"100%"} height={"100%"}>
                        <Text lineHeight={1.2} w={"90%"} color={"#212121"} fontSize={"16px"} fontWeight={600}>{capitalizeFirstLetter(product.name)}</Text>
                    </Flex>
                    <Flex alignItems={"end"} h={"100%"}>
                        <Text color={"#828282"} fontSize={"16px"} fontWeight={400}>Quantity:  {product.quantity}</Text>
                    </Flex>
                </Flex>
                <Flex w={"20%"} flexDirection={"column"} h={"100%"}>
                    <Flex>
                        <Text color={"#212121"} fontSize={"16px"} fontWeight={600}>{formatterValue(product.total_price)}</Text>
                    </Flex>
                    <Flex alignItems={"end"} h={"100%"} justifyContent={"center"}>
                        <Text color={"#828282"} fontSize={"16px"} fontWeight={400}>{product.quantity}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default ProductCardSp;