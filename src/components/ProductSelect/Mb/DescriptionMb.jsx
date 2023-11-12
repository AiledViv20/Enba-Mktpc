import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Flex,
    Text,
    Button,
    IconButton,
    Image,
    Tooltip,
    Input,
    useDisclosure,
    Alert,
    AlertIcon
} from '@chakra-ui/react';

import { selectProducts, setProducts, selectTotalAmount, setTotalAmount } from '../../../hooks/slices/counterSlice';

import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import icon1 from '../../../assets/icons/fast-delivery.svg';
import icon2 from '../../../assets/icons/package.svg';
import ModalPrintImage from '../../ModalPrintImage';

import { formatterValue, capitalizeFirstLetter } from '../../../resource/validate';

import { toast } from 'react-toastify';

const DescriptionMb = ({ previewImage, setImg, images, data, colors, colorsProduct }) => {
    const productsStore = useSelector(selectProducts);
    const totalAmountStore = useSelector(selectTotalAmount);
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
        setPrice(item.retail_price);
    }

    useEffect(() => {
        if(selectColor) {
            const filterProductColors = data?.items.filter(item => item.color === selectColor);
            const imgUrl = filterProductColors[0].images?.images_item[0];
            setImg(imgUrl)
        }
    }, [selectColor]);

    const validateData = () => {
        if (itemSelected.stock !== "0") {
            if (selectColor && values.num !== 0) {
                return false;
            }
        }
        return true;
    }

    const addProductShoppingCart = () => {
        if (values.num > 0 && selectColor) {
            let calcTotalPrice = price * values.num;
            const filterItem = data.items?.filter(element => element.color === selectColor);
            const product = {
                sku: filterItem[0].sku,
                code_item: filterItem[0].code,
                unit_price: parseFloat(filterItem[0].retail_price),
                total_price: parseFloat(calcTotalPrice),
                quantity: values.num,
                name: data.name,
                category: data.category,
                color: selectColor.toUpperCase(),
                image: previewImage,
                productsPreview: filterItem,
                printing: { type: "ninguno", price:  0 }
            }
            dispatch(
                setProducts({products: [
                    ...productsStore, product
                ]})
            );
            dispatch(
                setTotalAmount({totalAmount: totalAmountStore + calcTotalPrice})
            );
            toast.success("¡Se ha agregado correctamente el nuevo producto!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    return ( 
        <>
            <Flex fontSize={"14px"} fontWeight={400} color={"#424242"} alignItems={"center"}>
                <Text as={"b"}>Colores:</Text>
                <Flex
                    w="100%"
                    pl={2}>
                    {colorsProduct.map((item, index) => (
                        <Tooltip key={`color-${index}`} hasArrow label={item.color} bg='gray.300' color='black'>
                            <Text
                                marginRight={"1px"}
                                cursor="pointer"
                                fontSize={"50px"}
                                color={item.color === "BLANCO" ? "#F4F4F4" :  item.hex}
                                onClick={() => {
                                    handleChangeSelected(item.color, item.sku)
                                }}
                            >
                                &#9679;
                            </Text>
                        </Tooltip>
                    ))}
                </Flex>
            </Flex>
            <Flex mt={5} flexDirection={"column"}>
                {selectColor ?
                    <Flex>
                        <Text as={"b"}>Color seleccionado:</Text>
                        <Text ml={2}>{capitalizeFirstLetter(selectColor)}</Text>
                    </Flex>
                    : null
                }
                <Flex mt={4} mb={1}>
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
                        onClick={() => addProductShoppingCart()}
                        isDisabled={validateData()}>Agregar al carrito
                    </Button>
                </Flex>
            </Flex>
            <Alert status='info' mt={4} display={selectColor ? "none" : "flex"}>
                <AlertIcon />
                Selecciona un color para agregar al carrito de compra
            </Alert>
            <Flex mt={5} h={"66px"} border={"1px solid"} borderTopColor={"#CCCCCC"} borderBottomColor={"#CCCCCC"} borderLeftColor={"transparent"} borderRightColor={"transparent"}>
                <Flex  alignItems={"center"}>
                    <Image src={icon2} width={"32px"} height={"32px"} alt='icon'/>
                    <Text ml={2}>{itemSelected.stock} en stock</Text>
                </Flex>
            </Flex>
            <Flex mt={5} justifyContent={"center"}>
                <Button onClick={onOpen} type='button' w={"430px"} fontSize={"14px"} fontWeight={500} color={"accent.500"} borderColor={"accent.500"} variant='outline'>Ver previsualización de impresión</Button>
            </Flex>
            {isOpen ?
                    <ModalPrintImage
                        isOpen={isOpen}
                        onClose={onClose}
                        category={data.name.toUpperCase()}
                        product={images[2]} />
                : null
            }
        </>
    );
}
 
export default DescriptionMb;