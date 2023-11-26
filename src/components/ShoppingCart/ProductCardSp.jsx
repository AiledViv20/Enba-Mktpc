import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts, selectKits, setTotalAmount } from '../../hooks/slices/counterSlice';
import {
    Flex,
    Image,
    Text,
    IconButton,
    Input
} from "@chakra-ui/react";
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import { formatterValue, capitalizeFirstLetter } from '../../resource/validate';
import {DeleteIcon} from '@chakra-ui/icons';

const ProductCardSp = ({ product, setPriceIva, setPriceSend, setSubTotalSum, setSumTotalOrder, idx }) => {
    const productsStore = useSelector(selectProducts);
    const kitsStore = useSelector(selectKits);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        num: product.quantity
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
            const filterProductsShopping = productsStore.filter(it => it.sku !== product.sku);
            dispatch(
                setProducts({products: filterProductsShopping })
            );
        } else {
            let products_ = [...productsStore]
            let filterModificate = {...products_[idx]};
            let sumPrint = values.num * filterModificate?.printing?.price;
            let sumProduct = values.num * filterModificate.unit_price;
            filterModificate['quantity'] = values.num;
            filterModificate['total_price'] = sumProduct + sumPrint;
            products_[idx] = filterModificate;
            setNewArray(products_);
            dispatch(
                setProducts({products: products_ })
            );
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
            if (newArray.length > 0) {
                newArray.forEach((elementP) => {
                    sumP = elementP.total_price + sumP;
                });
            }
            if (kitsStore.length > 0) {
                kitsStore.forEach((elementK) => {
                    sumK = elementK.sum_total_kit + sumK;
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
                    setProducts({products: newArray })
                );
                dispatch(
                    setTotalAmount({totalAmount: sums + sumsIv + sumsSp})
                );
            }
        }
    }, [newArray]);

    return ( 
        <Flex bg={"#FFF"} border={"1px solid #E2E2E2"} mb={3} padding={3} borderRadius={"8px"}>
            <Flex w={"30%"}>
                <Image src={product.image} width={"106px"} height={"80px"} alt='img' />
            </Flex>
            <Flex w={"70%"}>
                <Flex w={"70%"} flexDirection={"column"} h={"100%"}>
                    <Flex w={"100%"} height={"100%"}>
                        <Text lineHeight={1.2} w={"90%"} color={"#212121"} fontSize={"16px"} fontWeight={600}>{capitalizeFirstLetter(product ? product.name : '')}</Text>
                    </Flex>
                    <Flex alignItems={"end"} h={"100%"}>
                        <Text color={"#828282"} fontSize={"16px"} fontWeight={400}>Cantidad:  {values.num}</Text>
                    </Flex>
                </Flex>
                <Flex w={"30%"} flexDirection={"column"} h={"100%"}>
                    <Flex alignSelf={'center'}>
                        <Flex gap={6}>
                            <Text color={"#212121"} fontSize={"16px"} fontWeight={600}>{formatterValue(product ? product.total_price : 0)}</Text>
                            <DeleteIcon onClick={() => changeNumProducts(0)} color='red' cursor={"pointer"} _hover={{color: 'red.500'}}/>
                        </Flex>
                    </Flex>
                    <Flex alignItems={"end"} h={"100%"} justifyContent={"center"}>
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg={"#D0D0D2"}
                            mb={2} 
                            onClick={() => changeNumProducts(values.num - 1)}
                            boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                            color={"#383838"}
                            fontSize={"12px"}
                            icon={<MinusIcon />} />
                        <Input 
                            ml={2} 
                            mr={2}
                            color={"#828282"} 
                            fontSize={"16px"} 
                            fontWeight={400}
                            value={values.num}
                            type='number'
                            min={0}
                            onChange={(e)=>{
                                e.target.value !== "" && changeNumProducts(Number(e.target.value))
                            }}
                        />
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg='#31508C'
                            onClick={() => changeNumProducts(values.num + 1)}
                            boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                            color={"#FFF"}
                            mb={2} 
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
 
export default ProductCardSp;