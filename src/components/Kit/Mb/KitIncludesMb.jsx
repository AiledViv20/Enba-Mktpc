import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Flex,
    Text,
    Stack,
    Skeleton,
    Heading,
    useTheme,
    useMediaQuery,
    Button,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";

import { selectProducts, setProducts, selectKits, setKits, setTotalAmount } from '../../../hooks/slices/counterSlice';

import KitCardMb from './KitCardMb';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { FaTrashAlt } from "react-icons/fa";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ModalTrashProduct from '../ModalTrashProduct';

import { toast } from 'react-toastify';

const CardsRenderer = (products, status, isSelectedProductTrash, setIsSelectedProductTrash, limitTrash, setLimitTrash) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    if (products.length === 0 && status === "loaded") {
        return (
            <Stack direction="row" alignItems="center">
                <Box textAlign="center" py={6} px={3}>
                    <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
                    <Heading as="h2" size="xl" mt={6} mb={2} color={"accent.500"}>
                        Oops!
                    </Heading>
                    <Text fontSize="sm" color={"gray.500"}>
                        Lo sentimos, no pudimos comunicarnos con el servicio de productos,
                        intenta de nuevo mientras lo restablecemos.
                    </Text>
                </Box>
            </Stack>
        );
    } else if (products.length > 0 && status === "loaded") {
        if (!isGreaterThanMd) {
            return <KitCardMb 
                product={products[0]} 
                isSelectedProductTrash={isSelectedProductTrash}
                setIsSelectedProductTrash={setIsSelectedProductTrash}
                limitTrash={limitTrash}
                setLimitTrash={setLimitTrash} />;
        }
        return products.map((element, idx) => (
            <KitCardMb 
                key={idx} 
                product={element} 
                showIconPlus={idx === 0 ? false : true}
                isSelectedProductTrash={isSelectedProductTrash}
                setIsSelectedProductTrash={setIsSelectedProductTrash}
                limitTrash={limitTrash}
                setLimitTrash={setLimitTrash} />
        ));
    } else {
        return isGreaterThanMd ? (
            <Stack direction="row" alignItems="center" mx="2">
                <Skeleton
                    w="xs"
                    m="2"
                    height="413px"
                    borderRadius={{ base: "10px", md: "10px" }}
                />
                <Skeleton
                    w="xs"
                    m="2"
                    height="413px"
                    borderRadius={{ base: "10px", md: "10px" }}
                />
                <Skeleton
                    w="xs"
                    m="2"
                    height="413px"
                    borderRadius={{ base: "10px", md: "10px" }}
                />
            </Stack>
        ) : (
            <Stack direction="row" alignItems="center">
                <Skeleton
                    w="xs"
                    m="2"
                    height="390px"
                    borderRadius={{ base: "10px", md: "10px" }}
                />
            </Stack>
        );
    }
}

const KitIncludes = ({ titleSection, showKitIncludes, setShowKitIncludes, kit, props }) => {
    const productsStore = useSelector(selectProducts);
    const kitsStore = useSelector(selectKits);
    const dispatch = useDispatch();

    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [page, setPage] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [confirmTrash, setConfirmTrash] = useState(false);
    const [limitTrash, setLimitTrash] = useState(0);
    const [isSelectedProductTrash, setIsSelectedProductTrash] = useState([]);
    const [productsIncludes, setProductsIncludes] = useState([]);
    const [status, setStatus] = useState('loading');//loading, loaded

    useEffect(() => {
        if (showKitIncludes) {
            setProductsIncludes(showKitIncludes.slice(page * 1, (page + 1) * 4));
            setStatus('loaded');
        }
        if (showKitIncludes.length > 0) {
            const filterDataKitIncludes = showKitIncludes.map((item, idx) => {
                return {
                    ...item,
                    sku: item.sku,
                    code_item: item.code,
                    unit_price: parseFloat(item.items[0].price),
                    total_price: parseFloat(item.items[0].price),
                    quantity: 1,
                    name: item.name,
                    category: item.category,
                    color: "All Kit",
                    image: item.images?.product_images[0]
                }
            });
            setShowKitIncludes(filterDataKitIncludes);
        }
    },[showKitIncludes])

    useEffect(() => {
        if(showKitIncludes){
            setProductsIncludes(showKitIncludes.slice(page * 1, (page + 1) * 4));   
        }
    },[page]);

    const addListProductsKits = () => {
        const kitAdd = {
            discount_code: "4UAEPO55L",
            is_kit: true,
            sku_kit: kit?.sku,
            code_kit: kit?.code,
            total_kits: 1,
            items: showKitIncludes
        }
        const counterKits = [...kitsStore, 
            kitAdd
        ];
        dispatch(
            setKits({kits: counterKits})
        );
        const counterProducts = [...productsStore, 
            showKitIncludes[0], showKitIncludes[1], showKitIncludes[2], showKitIncludes[3]
        ];
        dispatch(
            setProducts({products: counterProducts})
        );
        let sumTotalKits = 0;
        counterProducts.forEach(element => {
            sumTotalKits = sumTotalKits + element.total_price
        });
        dispatch(
            setTotalAmount({totalAmount: sumTotalKits})
        );
        //Guardar en kit, en products y eliminar todo de kitsLits
        toast.success("¡Se han agregado exitosamente los productos al kit!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const modalTrashProductAction = () => {
        onOpen();
    }

    const trashProductAction = () => {
        // Obtén los sku_item de los objetos en productos seleccionados para eliminar en este caso isSelectedProductTrash
        const skuProductsTrash = isSelectedProductTrash.map((element) => element.sku);
        // Filtra los objetos en products cuyos sku_item no están en isSelectedProductTrash
        const productsFilter = showKitIncludes.filter((element1) => !skuProductsTrash.includes(element1.sku));
        setShowKitIncludes(productsFilter)
        setIsSelectedProductTrash([]);
        setConfirmTrash(false);
        localStorage.setItem("kit_trash_category", isSelectedProductTrash[0].category);
        setLimitTrash(0);
        toast.warning("¡Se ha eliminado correctamente el producto del kit!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    useEffect(() => {
        if (confirmTrash) {
            trashProductAction();
        }
    }, [confirmTrash])

    return ( 
        <Box
            w="full"
            mx="auto"
            height="full"
            px={{ base: "2", md: "8" }}
            pt={10}
            pb={10}
            {...props}
        >
            <Flex w={"100%"} flexDirection={"column"}>
                <Flex w={"100%"} justifyContent={"end"} zIndex={1} mb={5}>
                    <IconButton
                        variant='outline'
                        colorScheme='accent.500'
                        aria-label='Trash'
                        icon={<FaTrashAlt />}
                        onClick={() => modalTrashProductAction()}
                        isDisabled={isSelectedProductTrash.length > 0 ? false : true}/>
                </Flex>
                <Flex>
                    <IconButton
                        icon={<ChevronLeftIcon color={"#888888"} />}
                        rounded="full"
                        border="0"
                        colorScheme="brand"
                        shadow="md"
                        transitionDuration=".3s"
                        _hover={{ shadow: "lg" }}
                        isDisabled={page <= 0 ? true : false}
                        onClick={() => setPage(page - 1)}
                        position="relative"
                        left={210}
                        bg="#E2E2E2"
                        zIndex="2"
                        aria-label={`Mostrar productos página: ${page - 1}`}
                    />
                    <IconButton
                        icon={<ChevronRightIcon color={"#888888"} />}
                        rounded="full"
                        border="0"
                        colorScheme="brand"
                        shadow="md"
                        transitionDuration=".3s"
                        _hover={{ shadow: "lg" }}
                        onClick={() => setPage(page + 1)}
                        position="relative"
                        left={230}
                        isDisabled={showKitIncludes.length < 4 || page === 3 ? true : false}
                        bg="#E2E2E2"
                        zIndex="2"
                        aria-label={`Mostrar productos página: ${page + 1}`}
                    />
                </Flex>
                <Flex>
                    <Text
                        fontSize={"18px"}
                        color="#424242"
                        mb="2"
                        fontWeight="700"
                    >
                        {titleSection}
                    </Text>
                </Flex>
            </Flex>
            <Flex direction="column" align="center">
                <Box mt={"2rem"}>
                    <Flex direction="row" alignItems="center">
                        {CardsRenderer(productsIncludes, status, isSelectedProductTrash, setIsSelectedProductTrash, limitTrash, setLimitTrash)}
                    </Flex>
                </Box>
                <Flex mt={"2rem"}>
                    <Button  type='button'
                    _hover={{
                        bg: "#063D5F"
                    }}
                    onClick={() => addListProductsKits()}
                    isDisabled={showKitIncludes.length === 4 && isSelectedProductTrash.length === 0 ? false : true}>Agregar kit</Button>
                </Flex>
            </Flex>
            {isOpen ?
                <ModalTrashProduct 
                    isOpen={isOpen}
                    onClose={onClose}
                    setConfirmTrash={setConfirmTrash}
                /> : null
            }
        </Box>
    );
}
 
export default KitIncludes;
