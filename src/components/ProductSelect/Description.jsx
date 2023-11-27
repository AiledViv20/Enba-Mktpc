import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts } from '../../hooks/slices/counterSlice';
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
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import icon2 from '../../assets/icons/package.svg';
import ModalPrintImage from '../ModalPrintImage';

import { formatterValue, capitalizeFirstLetter } from '../../resource/validate';

import { toast } from 'react-toastify';

const Description = ({ previewImage, setImg, images, data, colors, colorsProduct }) => {
    const productsStore = useSelector(selectProducts);
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
            prices.push(item.wholesale_price)
        })
        setPrice(Math.min(...prices));
    },[colors])

    const handleChangeSelected = (color, sku) => {
        setSelectColor(color);
        const item = data.items.filter((item)=>item.sku === sku)[0]
        setItemSelected(item)
        setPrice(item.wholesale_price);
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
            if (selectColor && values.num !== 0 && values.num <= itemSelected.stock) {
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
                unit_price: parseFloat(filterItem[0].wholesale_price),
                total_price: parseFloat(calcTotalPrice),
                quantity: values.num,
                name: data.name,
                category: data.category,
                color: selectColor.toUpperCase(),
                image: previewImage,
                productsPreview: filterItem,
                printing: { type: "", price:  0 }
            }
            dispatch(
                setProducts({products: [
                    ...productsStore, product
                ]})
            );
            toast.success("¡Se ha agregado correctamente el nuevo producto!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    return ( 
        <Flex flexDirection={"column"}>
            <Flex>
                <Text fontSize={"26px"} fontWeight={600} color={"accent.500"}>{data.name.toUpperCase()}</Text>
            </Flex>
            <Flex mt={10} fontSize={"14px"} fontWeight={400} color={"#424242"}>
                <Text mr={10}><Text as={"b"}>SKU:</Text>{" "}{data.sku}</Text>
                <Text><Text as={"b"}>Categoría:</Text>{" "}{data.category.toUpperCase()}</Text>
            </Flex>
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
                <Flex mt={2} mb={1}>
                    <Text fontSize={"12px"} fontWeight={400} color={"#383838"}>Desde</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <Text mr={5} fontSize={"36px"} fontWeight={700} color={"#383838"}>{formatterValue(price)}</Text>
                </Flex>
            </Flex>
            <Flex mt={10}>
                <Flex>
                    <Button w={"176px"} fontSize={"14px"} fontWeight={500}
                        _hover={{
                            bg: "#063D5F"
                        }}
                        onClick={() => addProductShoppingCart()}
                        isDisabled={validateData()}>Agregar al carrito
                    </Button>
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
                        width={"80px"} height={"40px"} 
                        max={itemSelected.stock}
                        />
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
            <Flex mt={5}>
                <Button onClick={onOpen} type='button' w={"430px"} fontSize={"14px"} fontWeight={500} color={"accent.500"} borderColor={"accent.500"} variant='outline'>Ver previsualización de impresión</Button>
            </Flex>
            {isOpen ?
                    <ModalPrintImage
                        isOpen={isOpen}
                        onClose={onClose}
                        category={data.name.toUpperCase()}
                        product={previewImage} />
                : null
            }
        </Flex>
    );
}
 
export default Description;