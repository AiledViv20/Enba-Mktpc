import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectKits, setKits, selectTotalAmount, setTotalAmount } from '../../../hooks/slices/counterSlice';
import { 
    Flex,
    Text,
    Button,
    IconButton,
    Image,
    Tooltip,
    useDisclosure,
    Input,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import { formatterValue, capitalizeFirstLetter } from '../../../resource/validate';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";

import { toast } from 'react-toastify';

import icon2 from '../../../assets/icons/package.svg';
import ModalPrintImage from '../../ModalPrintImage';

const Description = ({ kit, showKitIncludes }) => {
    const kitsListStore = useSelector(selectKitsList);
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectColor, setSelectColor] = useState(null);
    const [itemSelected, setItemSelected] = useState(data.items[0]);
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

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    useEffect(() => {
        const prices = []
        data.items.map((item)=>{
            prices.push(item.retail_price)
        })
        setPrice(Math.min(...prices));
    },[colors])

    const handleChangeSelected = (color, sku) => {
        setSelectColor(color);
        const item = data.items.filter((item)=>item.sku === sku)[0]
        setItemSelected(item)
        setPrice(item.retail_price)
    }

    const validateData = () => {
        if (itemSelected.stock !== "0") {
            if (selectColor && values.num !== 0) {
                return false;
            }
        }
        return true;
    }

    const addKitShoppingCart = () => {
        let sumTotal = price * values.num;
        const filterItem = data.items?.filter(element => element.color === selectColor);
        const productSelect = {
            sku: filterItem[0].sku,
            code_item: filterItem[0].code,
            unit_price: parseFloat(filterItem[0].retail_price),
            total_price: parseFloat(sumTotal),
            quantity: values.num,
            name: data.name,
            category: data.category,
            color: selectColor,
            image: previewImage,
            productsPreview: filterItem,
            printing: { type: "ninguno", price:  0 }
        }
        dispatch(
            setKitsList({kitsList: [
                ...kitsListStore, productSelect
            ]})
        );
        toast.success("¡Se ha modificado kit correctamente!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    return ( 
        <Flex flexDirection={"column"}>
            <Flex mt={5} flexDirection={"column"}>
                <Flex mt={2} mb={1}>
                    <Text fontSize={"12px"} fontWeight={400} color={"#383838"}>Desde</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <Text mr={5} fontSize={"26px"} fontWeight={700} color={"#383838"}>{formatterValue(price)}</Text>
                </Flex>
            </Flex>
            <Flex mt={8} flexDirection={"column"}>
                <Flex justifyContent={"center"} alignItems={"center"}>
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
                <Flex justifyContent={"center"} mt={5}>
                    <Button w={"430px"} fontSize={"14px"} fontWeight={500}
                        _hover={{
                            bg: "#063D5F"
                        }}
                        onClick={() => console.log("Abrir modal colores")}
                        isDisabled={validateData()}>Agregar al carrito
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default Description;