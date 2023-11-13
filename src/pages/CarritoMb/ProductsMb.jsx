import React, { useState, useEffect } from 'react';
import { 
    Flex,
    Text,
    Image,
    IconButton
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import { capitalizeFirstLetter, formatterValue } from '../../resource/validate';

const ProductsMb = ({ products, product, setSubTotalSum, setSumTotalOrder }) => {
    const [values, setValues] = useState({
        num: product.quantity
    });

    const changeNumProducts = (nums) => {
        setValues({
            ...values,
            num: nums < 0 ? 0 : nums
        }) 
    }

    return ( 
        <Flex w='100%' h={"100%"} pt={2} pb={5} borderTop={"1px solid #E2E2E2"}>
            <Flex w='30%'>
                <Image src={product ? product.image : ''} width={"100%"} height={"80px"} alt='img' />
            </Flex>
            <Flex w='70%' flexDirection={"column"} height={"100%"}>
                <Flex>
                    <Text fontSize='md' fontWeight={500}>{capitalizeFirstLetter(product ? product.name : '')}</Text>
                </Flex>
                <Flex height={"100%"} alignItems={"end"}>
                    <Flex w={"30%"}>
                        <Text color={"#212121"} fontSize={"xs"}>Num: {product ? product.quantity : 0}</Text>
                    </Flex>
                    <Flex w={"70%"} flexDirection={"column"} justifyContent={"end"} alignItems={"end"}>
                        <Flex>
                            <Text pt={3} color={"#212121"} fontWeight={500} fontSize={"md"}>{formatterValue(product ? product.total_price : 0)}</Text>
                        </Flex>
                        <Flex pt={3}>
                            <IconButton
                                w={"10px"} h={"28px"}
                                bg={"#D0D0D2"}
                                onClick={() => changeNumProducts(values.num - 1)}
                                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                                color={"#383838"}
                                fontSize={"12px"}
                                icon={<MinusIcon />}
                                isDisabled/>
                            <Text ml={2} mr={2} mb={2} color={"#828282"} fontSize={"16px"} fontWeight={400}>{values.num}</Text>
                            <IconButton
                                w={"10px"} h={"28px"}
                                bg='#31508C'
                                onClick={() => changeNumProducts(values.num + 1)}
                                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                                color={"#FFF"}
                                fontSize={"12px"}
                                _hover={{
                                    bg: '#24437E'
                                }}
                                icon={<FaPlus />}
                                isDisabled/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default ProductsMb;