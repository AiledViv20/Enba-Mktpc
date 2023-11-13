import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts, setTotalAmount } from '../../hooks/slices/counterSlice';
import {
    Flex,
    Image,
    Text,
    IconButton
} from "@chakra-ui/react";
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import { formatterValue, capitalizeFirstLetter } from '../../resource/validate';

const KitCardSp = ({ product, setSubTotalSum, setSumTotalOrder }) => {
    const productsStore = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        num: product.total_kits
    });
    const [newArray, setNewArray] = useState(null);
    const [totalSumKitsSp, setTotalSumKitsSp] = useState(product ? product.sum_total_kit : 0);

    return ( 
        <Flex bg={"#FFF"} border={"1px solid #E2E2E2"} mb={3} padding={3} pl={5} pr={0} borderRadius={"8px"}>
            <Flex w={"100%"}>
                <Flex w={"70%"} flexDirection={"column"} h={"100%"}>
                    <Flex w={"100%"} height={"100%"}>
                        <Text lineHeight={1.2} w={"90%"} color={"#212121"} fontSize={"16px"} fontWeight={600}>Kit {capitalizeFirstLetter(product.name_kit)}</Text>
                    </Flex>
                    <Flex alignItems={"end"} h={"100%"}>
                        <Text color={"#828282"} fontSize={"16px"} fontWeight={400}>Cantidad:  {values.num}</Text>
                    </Flex>
                </Flex>
                <Flex w={"30%"} flexDirection={"column"} h={"100%"}>
                    <Flex justifyContent={"center"} mb={2}>
                        <Text color={"#212121"} fontSize={"16px"} fontWeight={600}>{formatterValue(totalSumKitsSp)}</Text>
                    </Flex>
                    <Flex alignItems={"end"} h={"100%"} justifyContent={"center"}>
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg={"#D0D0D2"}
                            boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                            color={"#383838"}
                            fontSize={"12px"}
                            icon={<MinusIcon />}
                            isDisabled/>
                        <Text ml={2} mr={2} mb={2} color={"#828282"} fontSize={"16px"} fontWeight={400}>{values.num}</Text>
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg='#31508C'
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
    );
}
 
export default KitCardSp;