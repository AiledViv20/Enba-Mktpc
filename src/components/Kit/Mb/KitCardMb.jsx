import React, { useEffect, useState } from 'react';
import {
    Box,
    HStack,
    Flex,
    Image,
    Text,
    Tag,
    Container,
    IconButton,
    Checkbox
} from "@chakra-ui/react";
import { formatterValue } from '../../../resource/validate';

import { FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';

const KitCard = ({ product, showIconPlus, isSelectedProductTrash, setIsSelectedProductTrash, limitTrash, setLimitTrash }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        if (!isChecked) {
            if (limitTrash === 0) {
                setIsChecked(!isChecked);
                setLimitTrash(limitTrash + 1);
            } else if (limitTrash === 1) {
                toast.error("¡Solo es posible reemplazar uno a la vez!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } else {
            setIsChecked(!isChecked);
            setLimitTrash(0);
        }
    };

    useEffect(() => {
        if (isChecked) {
            setIsSelectedProductTrash([
                ...isSelectedProductTrash,
                product
            ]);
        } else {
            const filterListProductTrash = isSelectedProductTrash.filter((element) => element.name !== product.name);
            setIsSelectedProductTrash(filterListProductTrash);
        }
    }, [isChecked])

    useEffect(() => {
        if (isSelectedProductTrash.length === 0) {
            setIsChecked(false);
        }
    }, [isSelectedProductTrash])

    return (
        <Flex>
            <Flex display={showIconPlus ?  "flex" : "none"} alignItems={"center"}>
                <IconButton
                    variant='outline'
                    w={"20px"} h={"30px"}
                    colorScheme='accent.500'
                    aria-label='Plus'
                    cursor={"default"}
                    icon={<FaPlus />}
                    />
            </Flex>
            <Container key={product.name} margin="0" gap="0" padding="0" zIndex={1}>  
                <Box
                    w="294px"
                    h="430px"
                    m="2"
                    border={"1px solid #A4A4A4"}
                    borderRadius={"20px"}
                    overflow="hidden"
                    aria-label={product.name} zIndex={-1}
                >
                    <Flex w={"100%"}>
                        <Flex w={"80%"}>
                            <Tag
                                bg={'#FF9900'}
                                color="white"
                                fontSize={"12px"}
                                fontWeight={500}
                                px="8"
                                py="2"
                                rounded="20px 0px 20px 0px"
                            >
                                -5%
                            </Tag>
                        </Flex>
                        <Flex w={"20%"} justifyContent={"center"}>
                            <Checkbox
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
                            ></Checkbox>
                        </Flex>
                    </Flex>
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
                                        <br />{formatterValue(product.items[0]?.price)}
                                    </Text>
                            </Text>
                        </HStack>
                    </Flex>
                </Box>
            </Container>
        </Flex>
    );
}
 
export default KitCard;