import React, { useEffect, useState } from 'react';
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
import { formatterValue } from '../../../resource/validate';

import { toast } from 'react-toastify';

const AddKitCard = ({ product, showKitIncludes, setShowKitIncludes }) => {

    const [price, setPrice] = useState(0);

    useEffect(() => {
        let total = product.items[0]?.wholesale_price;
        total = parseFloat(total);
        setPrice(total.toFixed(2))
    },[product]);

    const validateAddKits = () => {
        if (showKitIncludes.length === 4 ) {
            return true;
        }
        return false;
    }

    const addListKit = () => {
        const categorySaveLS = localStorage.getItem("kit_trash_category");
        const categoryLS = categorySaveLS.split(" ");
        if (product.category.includes(categoryLS[0])) {
            const productSelect = {
                sku: product.items[0]?.sku,
                code_item: product.items[0]?.code,
                unit_price: parseFloat(product.items[0]?.wholesale_price),
                total_price: parseFloat(product.items[0]?.wholesale_price),
                quantity: 1,
                name: product.name,
                category: product.category,
                color: product.items[0]?.color,
                image: product.items[0]?.images.images_item[0],
                images: product.images,
                items: product.items
            }
            const newAddList = [
                ...showKitIncludes,
                productSelect
            ];
            setShowKitIncludes(newAddList)
            toast.success("¡Se ha agregado correctamente el nuevo producto al kit!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            toast.warning("¡Solo es posible reemplazar producto por otro de la misma categoría!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
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
                    <Image width={"192px"} height={"192px"} src={product.items[0]?.images?.images_item[0]} alt={product.name} />
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
                                    <br />{formatterValue(price)}
                                </Text>
                        </Text>
                    </HStack>
                </Flex>
                <Flex justifyContent={"center"} position={"relative"} pt={3}>
                    <Button 
                        w={"144px"} h={"38px"} fontSize={"14px"} 
                        variant={"outline"} border={"1px solid #064A73"}
                        onClick={() => addListKit()}
                        isDisabled={validateAddKits()}>
                        Agregar al kit
                    </Button>
                </Flex>
            </Box>
        </Container>
    );
}
 
export default AddKitCard;