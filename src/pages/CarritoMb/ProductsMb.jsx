import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts, selectKits, setTotalAmount } from '../../hooks/slices/counterSlice';
import { 
    Flex,
    Text,
    Image,
    IconButton
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import { capitalizeFirstLetter, formatterValue } from '../../resource/validate';

const ProductsMb = ({ product, setSumIva, setSumShopping, setSubTotalSum, setSumTotalOrder }) => {
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
            let filterDataNotModificate = productsStore.filter(item => item.sku !== product.sku);
            let filterModificate = productsStore.filter(item => item.sku === product.sku);
            filterModificate = filterModificate[0];
            let newListFilter = filterDataNotModificate;
            let newModificate = {
                ...filterModificate,
                quantity: values.num,
                total_price: values.num * product.unit_price
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
                setSumIva(sumsIv);
                setSumShopping(sumsSp);
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
                                icon={<MinusIcon />} />
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
                                icon={<FaPlus />} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default ProductsMb;