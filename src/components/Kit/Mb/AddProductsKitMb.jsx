import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Skeleton,
    useTheme,
    useMediaQuery,
} from "@chakra-ui/react";
import AddKitCardMb from './AddKitCardMb';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import logoGif from '../../../assets/icons/logo.gif';

const CardsRenderer = (products, status, showKitIncludes, setShowKitIncludes) => {
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
            return <AddKitCardMb product={products[0]} showKitIncludes={showKitIncludes} setShowKitIncludes={setShowKitIncludes} />;
        }
        return products.map((element, idx) => (
            <AddKitCardMb key={idx} product={element} showKitIncludes={showKitIncludes} setShowKitIncludes={setShowKitIncludes} />
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

const AddProductsKit = ({ titleSection, data, showKitIncludes, setShowKitIncludes, props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loaded');//loading, loaded

    useEffect(() => {
        if (data) {
            setProducts(data.slice(page * 1, (page + 1) * 4));
            setStatus('loaded');
        }
    },[data]);

    useEffect(() => {
        if(data){
            setProducts(data.slice(page * 1, (page + 1) * 4));   
        }
    },[page]);

    return ( 
        <Box
            w="full"
            mx="auto"
            height="full"
            px={{ base: "2", md: "8" }}
            p={isGreaterThanMd ? 2 : 0}
            pt={8}
            pb={5}
            {...props}
        >
            <Flex w={"100%"} flexDirection={"column"}>
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
                        aria-label={`Mostrar categorias página: ${page - 1}`}
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
                        isDisabled={products.length < 4 || page === 3 ? true : false}
                        bg="#E2E2E2"
                        zIndex="2"
                        aria-label={`Mostrar categorias página: ${page + 1}`}
                    />
                </Flex>
                <Flex mt={5}>
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
                        {CardsRenderer(products, status, showKitIncludes, setShowKitIncludes)}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
 
export default AddProductsKit;
