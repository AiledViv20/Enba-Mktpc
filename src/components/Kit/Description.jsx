import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Text,
    Button,
    IconButton,
    Image,
    Tooltip,
    useDisclosure
} from '@chakra-ui/react';
import { colors_dict } from '../../resource';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import icon1 from '../../assets/icons/fast-delivery.svg';
import icon2 from '../../assets/icons/package.svg';
import ModalPrintImage from '../ModalPrintImage';

const Description = ({data, colors}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [numProducts, setNumProducts] = useState(0);
    const [colorsProduct, setColorsProduct] = useState([]);
    const [itemSelected, setItemSelected] = useState(data.items[0]);
    const [price, setPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const changeNumProducts = (num) => {
        setNumProducts(num < 0 ? 0 : num) 
    }

    useEffect(() => {
        const colors_ar = []
        colors.map((item)=>{
            let color_ = ''
            colors_dict.filter((color)=>{
                if(item.color.includes(color.color)){
                    color_ = [{
                        sku: item.sku,
                        color: item.color,
                        hex: color.hex
                    }]
                }
            })
            if(!color_[0]){
                color_ = [{
                        sku: item.sku,
                        color: item.color,
                        hex: '#444444'
                }]
            }
            colors_ar.push(color_[0])
        })
        const prices = []
        data.items.map((item)=>{
            prices.push(item.retail_price)
        })
        setPrice(Math.min(...prices))
        setMaxPrice(Math.max(...prices))
        setColorsProduct(colors_ar)
    },[colors])

    const handleChangeSelected = (sku) => {
        const item = data.items.filter((item)=>item.sku === sku)[0]
        setItemSelected(item)
        setPrice(item.retail_price)
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
                        <Tooltip hasArrow label={item.color} bg='gray.300' color='black'>
                            <Text
                                key={`color-${index}`}
                                marginRight={"1px"}
                                cursor="pointer"
                                fontSize={"50px"}
                                color={item.hex}
                                onClick={() => {
                                    handleChangeSelected(item.sku)
                                }}
                            >
                                &#9679;
                            </Text>
                        </Tooltip>
                    ))}
                </Flex>
            </Flex>
            <Flex mt={5} flexDirection={"column"}>
                <Flex mb={1}>
                    <Text fontSize={"12px"} fontWeight={400} color={"#383838"}>Desde</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <Text mr={5} fontSize={"36px"} fontWeight={700} color={"#383838"}>${price}</Text>
                </Flex>
            </Flex>
            <Flex mt={10}>
                <Flex>
                    <Button w={"176px"} fontSize={"14px"} fontWeight={500}
                        _hover={{
                            bg: "#063D5F"
                        }}
                        onClick={() => console.log()}>Agregar al carrito
                    </Button>
                </Flex>
                <Flex ml={10} alignItems={"center"}>
                    <IconButton
                        w={"37px"} h={"37px"}
                        bg={"#D0D0D2"}
                        onClick={() => changeNumProducts(numProducts - 1)}
                        boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                        color={"#383838"}
                        fontSize={"16px"}
                        icon={<MinusIcon />}/>
                    <Text m={"0px 1rem"} fontSize={"18px"} fontWeight={500} color={"#31508C"}>{numProducts}</Text>
                    <IconButton
                        w={"37px"} h={"37px"}
                        bg='#31508C'
                        onClick={() => changeNumProducts(numProducts + 1)}
                        boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                        color={"#FFF"}
                        fontSize={"16px"}
                        _hover={{
                            bg: '#24437E'
                        }}
                        icon={<FaPlus />}/>
                </Flex>
            </Flex>
            <Flex mt={5} h={"66px"} border={"1px solid"} borderTopColor={"#CCCCCC"} borderBottomColor={"#CCCCCC"} borderLeftColor={"transparent"} borderRightColor={"transparent"}>
                <Flex alignItems={"center"} mr={10}>
                    <Image src={icon1} width={"32px"} height={"42px"} alt='icon'/>
                    <Text ml={2}>Envío gratis</Text>
                </Flex>
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
                        onClose={onClose} />
                : null
            }
        </Flex>
    );
}
 
export default Description;