import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectKitsList, setKitsList } from '../../hooks/slices/counterSlice';
import {
    Box,
    HStack,
    Flex,
    Image,
    Text,
    Tag,
    Container,
    Button
} from "@chakra-ui/react";

import { toast } from 'react-toastify';

const AddKitCard = ({ product }) => {
    const kitsListStore = useSelector(selectKitsList);
    const dispatch = useDispatch();

    const [price, setPrice] = useState(0);

    useEffect(() => {
        let total = product.items[0]?.price;
        total = parseFloat(total);
        setPrice(total.toFixed(2))
    },[product]);

    const addListKit = () => {
        const productSelect = {
            sku_item: product.sku,
            code_item: product.code,
            unit_price: product.items[0]?.price,
            total_price: product.items[0]?.price,
            quantity: 1,
            name: product.name,
            color: product.items[0]?.color,
            img: product.items[0]?.images.images_item[0]
        }
        dispatch(
            setKitsList({kitsList: [
                ...kitsListStore, productSelect
            ]})
        );
        toast.success("¡Se ha agregado correctamente el nuevo producto al kit!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    return ( 
        <Container key={product.name} margin="0" gap="0" padding="0" zIndex={1}>
            <Box
                w="294px"
                h="470px"
                m="2"
                border={"1px solid #A4A4A4"}
                borderRadius={"20px"}
                overflow="hidden"
                cursor="pointer"
                aria-label={product.name} zIndex={-1}
            >
                <Tag
                    bg={'#FF9900'}
                    color="white"
                    fontSize={"12px"}
                    fontWeight={500}
                    px="8"
                    py="2"
                    rounded="20px 0px 20px 0px"
                >
                    -5% en la compra del kit
                </Tag>
                <Flex justifyContent={"center"} pt={5}>
                    <Image width={"192px"} height={"192px"} src={product.images?.product_images[0]} alt={product.name} />
                </Flex>
                <Flex direction="column" px="4" pt="10" pb="1">
                    <Box
                        title={product.name.toLowerCase()} textAlign={"center"}
                    >
                        <Text fontSize="14px" fontWeight={500} color="#A4A4A4" lineHeight={"10px"} textTransform={"capitalize"}>
                            {product.category.toLowerCase()}
                        </Text>
                        <Text fontSize="16px" fontWeight={500} color="#424242" lineHeight={"46px"} textTransform={"capitalize"}>
                            {product.name.toLowerCase()}
                        </Text>
                    </Box>
                    <HStack justifyContent={"center"}>
                        <Text
                            textAlign={"center"}
                            fontSize="12px"
                            color="#424242"
                            fontWeight={400}
                            isTruncated
                            >
                                Desde
                                <Text fontSize={"20px"} fontWeight={500} color={"#1A6EA0"}>
                                    <br />${price}
                                </Text>
                        </Text>
                    </HStack>
                </Flex>
                <Flex justifyContent={"center"} position={"relative"} pt={3}>
                    <Button 
                        w={"144px"} h={"38px"} fontSize={"14px"} 
                        variant={"outline"} border={"1px solid #064A73"}
                        onClick={() => addListKit()}>
                        Agregar al kit
                    </Button>
                </Flex>
            </Box>
        </Container>
    );
}
 
export default AddKitCard;