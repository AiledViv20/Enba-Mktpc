import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts, selectKits, setKits, selectKitsList, setKitsList, selectTotalAmount, setTotalAmount } from '../../hooks/slices/counterSlice';
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
import KitCard from './KitCard';

import { FaTrashAlt } from "react-icons/fa";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ModalTrashProduct from './ModalTrashProduct';

import { toast } from 'react-toastify';

const CardsRenderer = (products, status, isSelectedProductTrash, setIsSelectedProductTrash) => {
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
            return <KitCard 
                product={products[0]} 
                isSelectedProductTrash={isSelectedProductTrash}
                setIsSelectedProductTrash={setIsSelectedProductTrash} />;
        }
        return products.map((element, idx) => (
            <KitCard 
                key={idx} 
                product={element} 
                showIconPlus={idx === 0 ? false : true}
                isSelectedProductTrash={isSelectedProductTrash}
                setIsSelectedProductTrash={setIsSelectedProductTrash} />
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

const KitIncludes = ({ titleSection, data, kit, props }) => {
    const productsStore = useSelector(selectProducts);
    const dispatch = useDispatch();

    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [page, setPage] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [confirmTrash, setConfirmTrash] = useState(false);
    const [isSelectedProductTrash, setIsSelectedProductTrash] = useState([]);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loading');//loading, loaded

    useEffect(() => {
        if (data) {
            setProducts(data.slice(page * 4, (page + 1) * 4));
            setStatus('loaded');
        }
    },[data])

    useEffect(() => {
        if(data){
            setProducts(data.slice(page * 4, (page + 1) * 4));   
        }
    },[page]);

    const addListProductsKits = () => {
        const kitAdd = {
            discount_code: "4UAEPO55L",
            is_kit: true,
            sku_kit: kit?.sku,
            code_kit: kit?.code,
            total_kits: 1,
            items: data
        }
        dispatch(
            setKits({kits: kitAdd})
        );
        const counterProducts = [...productsStore, 
            data[0], data[1], data[2], data[3]
        ];
        dispatch(
            setProducts({products: counterProducts})
        );
        dispatch(
            setKitsList({kitsList: []})
        );
        //Guardar en kit, en products y eliminar todo de kitsLits
    }

    const modalTrashProductAction = () => {
        onOpen();
    }

    const trashProductAction = () => {
        // Obtén los sku_item de los objetos en productos seleccionados para eliminar en este caso isSelectedProductTrash
        const skuProductsTrash = isSelectedProductTrash.map((element) => element.sku_item);

        // Filtra los objetos en products cuyos sku_item no están en isSelectedProductTrash
        const productsFilter = products.filter((element1) => !skuProductsTrash.includes(element1.sku_item));
        dispatch(
            setKitsList({kitsList: productsFilter})
        );
        setIsSelectedProductTrash([]);
        setConfirmTrash(false);
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
            p={isGreaterThanMd ? 2 : 10}
            mb={10}
            {...props}
        >
            <Flex w={"100%"}>
                <Flex w={"50%"}>
                    <Text
                        fontSize={"18px"}
                        color="#424242"
                        mb="2"
                        mt={"10"}
                        fontWeight="700"
                    >
                        {titleSection}
                    </Text>
                </Flex>
                <Flex w={"50%"} justifyContent={"end"} zIndex={1}>
                    <IconButton
                        variant='outline'
                        colorScheme='accent.500'
                        aria-label='Trash'
                        icon={<FaTrashAlt />}
                        onClick={() => modalTrashProductAction()}
                        isDisabled={isSelectedProductTrash.length > 0 ? false : true}/>
                </Flex>
            </Flex>
            <Flex direction="column" align="center">
                <Box mt={"2rem"}>
                    <Flex direction="row" alignItems="center">
                        {CardsRenderer(products, status, isSelectedProductTrash, setIsSelectedProductTrash)}
                    </Flex>
                </Box>
                <Flex mt={"2rem"}>
                    <Button  type='button'
                    _hover={{
                        bg: "#063D5F"
                    }}
                    onClick={() => addListProductsKits()}
                    isDisabled={data.length === 4 && isSelectedProductTrash.length === 0 ? false : true}>Agregar kit</Button>
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
