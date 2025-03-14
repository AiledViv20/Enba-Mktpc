import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Stack,
    Skeleton,
    useTheme,
    useMediaQuery,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
import KitCard from './KitCard';

import { FaTrashAlt } from "react-icons/fa";

import logoGif from '../../assets/icons/logo.gif';

import ModalTrashProduct from './ModalTrashProduct';

import { toast } from 'react-toastify';
import ButtonOpenModalKit from './ButtonOpenModalKit';

const CardsRenderer = (products, status, isSelectedProductTrash, setIsSelectedProductTrash, limitTrash, setLimitTrash) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    if (products.length === 0 && status === "loaded") {
        return (
            <Stack direction="row" alignItems="center">
                <Box textAlign="center" py={6} px={3}>
                    <img src={logoGif} width={"400px"} height={"150px"} alt="Cargando" />
                </Box>
            </Stack>
        );
    } else if (products.length > 0 && status === "loaded") {
        if (!isGreaterThanMd) {
            return <KitCard 
                product={products[0]} 
                isSelectedProductTrash={isSelectedProductTrash}
                setIsSelectedProductTrash={setIsSelectedProductTrash}
                limitTrash={limitTrash}
                setLimitTrash={setLimitTrash} />;
        }
        return products.map((element, idx) => (
            <KitCard 
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
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [page, setPage] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [confirmTrash, setConfirmTrash] = useState(false);
    const [limitTrash, setLimitTrash] = useState(0);
    const [isSelectedProductTrash, setIsSelectedProductTrash] = useState([]);
    const [productsIncludes, setProductsIncludes] = useState([]);
    const [status, setStatus] = useState('loading');//loading, loaded

    const [values, setValues] = useState({
        num: 1
    });

    useEffect(() => {
        if (showKitIncludes) {
            setProductsIncludes(showKitIncludes.slice(page * 4, (page + 1) * 4));
            setStatus('loaded');
        }
        if (showKitIncludes.length > 0) {
            const filterDataKitIncludes = showKitIncludes.map((item) => {
                return {
                    ...item,
                    sku: item.items[0].sku,
                    code_item: item.items[0].code,
                    unit_price: parseFloat(item.items[0].wholesale_price),
                    total_price: parseFloat(item.total_price),
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
            setProductsIncludes(showKitIncludes.slice(page * 4, (page + 1) * 4));   
        }
    },[page]);

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

    const validateData = () => {
        if (showKitIncludes.length === 4 && isSelectedProductTrash.length === 0) {
            return false;
        }
        return true;
    }

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
                        {CardsRenderer(productsIncludes, status, isSelectedProductTrash, setIsSelectedProductTrash, limitTrash, setLimitTrash)}
                    </Flex>
                </Box>
                <Flex mt={"2rem"}>
                    <ButtonOpenModalKit 
                        title={"Agregar kit"}
                        kit={kit}
                        validateData={validateData}
                        showKitIncludes={showKitIncludes}
                        setShowKitIncludes={setShowKitIncludes}
                        values={values} />
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
