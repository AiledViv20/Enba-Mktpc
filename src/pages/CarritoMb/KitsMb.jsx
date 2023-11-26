import React, { useState, useEffect } from 'react';
import { 
    Flex,
    Text,
    Image,
    IconButton,
    Input
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import { capitalizeFirstLetter, formatterValue } from '../../resource/validate';
import { DeleteIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts, selectKits, setKits, setTotalAmount } from '../../hooks/slices/counterSlice';

const KitsMb = ({ idx, kits, kit, setSumIva, setSumShopping, setSubTotalSum, setSumTotalOrder }) => {
    console.log({kit, kits});
    const productsStore = useSelector(selectProducts);
    const kitsStore = useSelector(selectKits);
    const dispatch = useDispatch();
    const [newArray, setNewArray] = useState(null);
    const [values, setValues] = useState({
        num: kit.total_kits
    });

    const changeNumProducts = (nums) => {
        setValues({
            ...values,
            num: nums < 0 ? 0 : nums
        }) 
    }

    useEffect(() => {
        if (values.num === 0) {
            const filterProductsShopping = kitsStore.filter((it, idx_) => idx_ !== idx);
            dispatch(
                setKits({kits: filterProductsShopping })
            );
        } else {
            let products_ = [...kitsStore]
            let filterModificate = {...products_[idx]};
            filterModificate['total_kits'] = values.num;
            filterModificate['sum_total_kit'] = values.num * (kit?.sub_sum_total_kit ? kit?.sub_sum_total_kit : 0);
            let items = [...filterModificate?.items];
            let price = 0;
            items?.map((item, idx) => {
                const item_ = {...item}
                if(item_){
                    item_['quantity'] = values.num;
                    item_['total_price'] = values.num * item?.unit_price;
                    price += item_?.unit_price
                }
                items[idx] = item_;
            })
            filterModificate['items'] = items;
            filterModificate['unit_price_kit'] = price;
            filterModificate['sub_sum_total_kit'] = price;
            filterModificate['sum_total_kit'] = values.num * price;
            products_[idx] = filterModificate;
            setNewArray(products_);
            dispatch(
                setKits({kits: products_ })
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
            if (productsStore.length > 0) {
                productsStore.forEach((elementP) => {
                    sumP = elementP.total_price + sumP;
                });
            }
            if (newArray.length > 0) {
                newArray.forEach((elementK) => {
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
                    setKits({kits: newArray })
                );
                dispatch(
                    setTotalAmount({totalAmount: sums + sumsIv + sumsSp})
                );
            }
        }
    }, [newArray]);

    return ( 
        <Flex w='100%' h={"100%"} flexDirection={"column"} pt={2} pb={5} borderTop={"1px solid #E2E2E2"}>
            <Flex pl={10}>
                <Text fontSize='md' fontWeight={500}>{capitalizeFirstLetter(kit ? kit.name_kit : '')}</Text>
            </Flex>
            <Flex height={"100%"} alignItems={"end"}>
                <Flex w={"40%"} pl={10} flexDirection={"column"}>
                    <Text pt={3} color={"#212121"} fontSize={"xs"}>Num: {kit ? kit.total_kits : 0}</Text>
                </Flex>
                <Flex w={"60%"} flexDirection={"column"} justifyContent={"end"} alignItems={"end"}>
                    <Flex gap={6} alignSelf={"auto"} placeItems={'baseline'}>
                        <Text pt={3} color={"#212121"} fontWeight={500} fontSize={"md"}>{formatterValue(kit ? kit.sum_total_kit : 0)}</Text>
                        <DeleteIcon onClick={() => changeNumProducts(0)} color='red' cursor={"pointer"} _hover={{color: 'red.500'}}/>
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
                            />
                        {/*<Text ml={2} mr={2} mb={2} color={"#828282"} fontSize={"16px"} fontWeight={400}>{values.num}</Text>*/}
                        <Input 
                            ml={2} 
                            mr={2}
                            color={"#828282"} 
                            fontSize={"16px"} 
                            fontWeight={400}
                            value={values.num}
                            type='number'
                            min={0}
                            maxW={'50px'}
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
                            fontSize={"12px"}
                            _hover={{
                                bg: '#24437E'
                            }}
                            icon={<FaPlus />}
                            />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default KitsMb;