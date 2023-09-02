import React, { useState } from 'react';
import { 
    Flex,
    Text,
    Button,
    IconButton,
    Image
} from '@chakra-ui/react';
import { colors } from '../../resource';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import icon1 from '../../assets/icons/fast-delivery.svg';
import icon2 from '../../assets/icons/package.svg';

const Description = ({data}) => {
    const [numProducts, setNumProducts] = useState(0);

    const changeNumProducts = (num) => {
        setNumProducts(num < 0 ? 0 : num) 
    }

    return ( 
        <Flex flexDirection={"column"}>
            <Flex>
                <Text fontSize={"26px"} fontWeight={600} color={"accent.500"}>{data.name}</Text>
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
                    {colors.map((item, index) => (
                    <Text
                        key={`color-${index}`}
                        marginRight={"1px"}
                        cursor="pointer"
                        fontSize={"50px"}
                        color={item.hex}
                    >
                        &#9679;
                    </Text>
                    ))}
                </Flex>
            </Flex>
            <Flex mt={5} flexDirection={"column"}>
                <Flex mb={1}>
                    <Text fontSize={"12px"} fontWeight={400} color={"#383838"}>Desde</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <Text mr={5} fontSize={"36px"} fontWeight={700} color={"#383838"}>$19.00</Text>
                    <Text fontSize={"18px"} fontWeight={400} color={"#A7A7A7"} as='del'>$99.00</Text>
                    <Text ml={5} fontSize={"18px"} fontWeight={500} color={"#31508C"}>Descuento 50%</Text>
                </Flex>
            </Flex>
            <Flex mt={10}>
                <Flex>
                    <Button w={"176px"} fontSize={"14px"} fontWeight={500}
                        _hover={{
                            bg: "#063D5F"
                        }}>Agregar al carrito
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
                    <Text ml={2}>5412 en stock</Text>
                </Flex>
            </Flex>
            <Flex mt={5}>
                <Button w={"430px"} fontSize={"14px"} fontWeight={500} color={"accent.500"} borderColor={"accent.500"} variant='outline'>Ver previsualización de impresión</Button>
            </Flex>
        </Flex>
    );
}
 
export default Description;