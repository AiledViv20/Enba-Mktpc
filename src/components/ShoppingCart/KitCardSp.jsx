import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectKits, setKits, setTotalAmount } from '../../hooks/slices/counterSlice';
import {
    Flex,
    Image,
    Text,
    IconButton
} from "@chakra-ui/react";
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import { formatterValue, capitalizeFirstLetter } from '../../resource/validate';

const KitCardSp = ({ product, setPriceIva, setPriceSend, setSubTotalSum, setSumTotalOrder }) => {
    const productsStore = useSelector(selectProducts);
    const kitsStore = useSelector(selectKits);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        num: product.total_kits
    });
    const [newArray, setNewArray] = useState(null);

    const changeNumProducts = (nums) => {
        setValues({
            ...values,
            num: nums < 0 ? 0 : nums
        }) 
    }

    useEffect(() => {
        if (values.num === 0) {
            const filterProductsShopping = kitsStore.filter(it => it.sku_kit !== product.sku_kit);
            dispatch(
                setKits({kits: filterProductsShopping })
            );
        } else {
            let filterDataNotModificate = kitsStore.filter(item => item.sku_kit !== product.sku_kit);
            let filterModificate = kitsStore.filter(item => item.sku_kit === product.sku_kit);
            filterModificate = filterModificate[0];
            let newListFilter = filterDataNotModificate;
            let newModificate = {
                ...filterModificate,
                total_kits: values.num,
                sum_total_kit: values.num * product.sub_sum_total_kit
            }
            newListFilter = [
                ...newListFilter,
                newModificate
            ];
            setNewArray(newListFilter);
        }
    }, [values]);

    const calculateSend = (sumTotalKit2) => {
        if (sumTotalKit2 <= 3000) {
            return 199;
        } else if (sumTotalKit2 >= 3000 && sumTotalKit2 <= 10000) {
            return 99;
        } else if (sumTotalKit2 > 10000) {
            return 0;
        }
    }

    useEffect(() => {
        if (newArray) {
            let sumP = 0;
            let sumK = 0;
            let sums = 0;
            let sumsIv = 0;
            let sumsSp = 0;
            if (productsStore.length > 0) {
                productsStore.forEach((elementP) => {
                    sumP = elementP.total_price + sumP;
                });
            }
            if (newArray.length > 0) {
                newArray.forEach((elementK) => {
                    sumK = elementK.sub_sum_total_kit + sumK;
                });
            }
            sums = sumP + sumK;
            sumsIv = sums * 0.16;
            sumsSp = calculateSend(sums);
            if (sums > 0) {
                setPriceIva(sumsIv);
                setPriceSend(sumsSp);
                setSubTotalSum(sums);
                setSumTotalOrder(sums + sumsIv + sumsSp);
                dispatch(
                    setKits({kits: newArray })
                );
                dispatch(
                    setTotalAmount({totalAmount: sums + sumsIv + sumsSp})
                );
            }
        }
    }, [newArray]);

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
                        <Text color={"#212121"} fontSize={"16px"} fontWeight={600}>{formatterValue(product.sum_total_kit)}</Text>
                    </Flex>
                    <Flex alignItems={"end"} h={"100%"} justifyContent={"center"}>
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg={"#D0D0D2"}
                            boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                            onClick={() => changeNumProducts(values.num - 1)}
                            color={"#383838"}
                            fontSize={"12px"}
                            icon={<MinusIcon />} />
                        <Text ml={2} mr={2} mb={2} color={"#828282"} fontSize={"16px"} fontWeight={400}>{values.num}</Text>
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg='#31508C'
                            boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                            onClick={() => changeNumProducts(values.num + 1)}
                            color={"#FFF"}
                            fontSize={"12px"}
                            _hover={{
                                bg: '#24437E'
                            }}
                            icon={<FaPlus />} />
                        
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default KitCardSp;