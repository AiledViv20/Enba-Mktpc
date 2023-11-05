import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectKits, setKits, selectTotalAmount, setTotalAmount } from '../../hooks/slices/counterSlice';
import { 
    Flex,
    Text,
    IconButton,
    Input,
} from '@chakra-ui/react';
import { formatterValue } from '../../resource/validate';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";

import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import ButtonOpenModalKit from './ButtonOpenModalKit';

const Description = ({ kit, showKitIncludes, setShowKitIncludes }) => {
    const params_url = useParams();
    const kitsStore = useSelector(selectKits);
    const totalAmountStore = useSelector(selectTotalAmount);
    const dispatch = useDispatch();

    const [price, setPrice] = useState(0);
    const [values, setValues] = useState({
        num: 0
    });
    const changeNumProducts = (nums) => {
        setValues({
            ...values,
            num: nums < 0 ? 0 : nums
        }) 
    }

    useEffect(() => {
        if (values.num === 0) {
            let sumTotalKit = 0;
            showKitIncludes.forEach((item) => {
                sumTotalKit = parseFloat(item?.items[0]?.retail_price) + sumTotalKit
            })
            setPrice(sumTotalKit.toFixed(2));
        }
    }, [values]);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const validateData = () => {
        if (values.num !== 0) {
            return false;
        }
        return true;
    }

    const addKitShoppingCart = () => {
        let sumTotal = price * values.num;
        sumTotal = sumTotal + totalAmountStore;
        const kitAdd = {
            discount_code: "4UAEPO55L",
            is_kit: true,
            sku_kit: kit?.sku,
            code_kit: kit?.code,
            total_kits: values.num,
            items: showKitIncludes
        }
        const counterKits = [...kitsStore, 
            kitAdd
        ];
        dispatch(
            setKits({kits: counterKits})
        );
        dispatch(
            setTotalAmount({totalAmount: sumTotal})
        );
        toast.success("¡Se han agregado exitosamente los productos al kit!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const checkSelectColorKit = () => {
        toast.success("¡Se han agregado exitosamente los productos al kit!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    return ( 
        <Flex flexDirection={"column"}>
            <Flex>
                <Text fontSize={"26px"} fontWeight={600} color={"accent.500"}>{params_url.product ? params_url.product : ""}</Text>
            </Flex>
            <Flex mt={10} fontSize={"14px"} fontWeight={400} color={"#424242"}>
                <Text mr={10}><Text as={"b"}>SKU:</Text>{" "}{kit.sku}</Text>
                <Text><Text as={"b"}>Categoría:</Text>{" "}{kit.category.toUpperCase()}</Text>
            </Flex>
            <Flex mt={5} flexDirection={"column"}>
                <Flex mt={2} mb={1}>
                    <Text fontSize={"12px"} fontWeight={400} color={"#383838"}>Desde</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <Text mr={5} fontSize={"36px"} fontWeight={700} color={"#383838"}>{formatterValue(price)}</Text>
                </Flex>
            </Flex>
            <Flex mt={10}>
                <Flex>
                    <ButtonOpenModalKit 
                        validateData={validateData}
                        showKitIncludes={showKitIncludes}
                        setShowKitIncludes={setShowKitIncludes}
                        addKitShoppingCart={addKitShoppingCart} />
                </Flex>
                <Flex ml={10} alignItems={"center"}>
                    <IconButton
                        w={"37px"} h={"37px"}
                        bg={"#D0D0D2"}
                        onClick={() => changeNumProducts(values.num - 1)}
                        boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                        color={"#383838"}
                        fontSize={"16px"}
                        icon={<MinusIcon />}/>
                    <Input 
                        name='num' type='number' m={"0px 1rem"}
                        onChange={handleChange} value={values.num} fontWeight={500} fontSize={"16px"} 
                        width={"80px"} height={"40px"} />
                    <IconButton
                        w={"37px"} h={"37px"}
                        bg='#31508C'
                        onClick={() => changeNumProducts(values.num + 1)}
                        boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                        color={"#FFF"}
                        fontSize={"16px"}
                        _hover={{
                            bg: '#24437E'
                        }}
                        icon={<FaPlus />}/>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default Description;