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
import CategoryCard from './CategoryCard';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import logoGif from '../assets/icons/logo.gif';

const CardsRenderer = (categories, status) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [isGreaterThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
    const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);

    if (categories.length === 0 && status === "loaded") {
        return (
            <Stack direction="row" alignItems="center">
                <Box textAlign="center" py={6} px={3}>
                    <img src={logoGif} width={"400px"} height={"150px"} alt="Cargando" />
                </Box>
            </Stack>
        );
    } else if (categories.length > 0 && status === "loaded") {
        if (!isGreaterThanMd && !isGreaterThanLg && !isGreaterThanXL) {
            return <CategoryCard category={categories[0]} />;
        }
        return categories.map((element) => (
            <CategoryCard key={element.id} category={element} />
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

const FeaturedCategories = ({ titleSection, data, props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [isGreaterThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
    const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loaded');//loading, loaded

    useEffect(() => {
        if (data) {
            if (isGreaterThanXL) {
                setProducts(data.slice(page * 4, (page + 1) * 4));
                setStatus('loaded');
            } else if (isGreaterThanLg) {
                setProducts(data.slice(page * 3, (page + 1) * 3));
                setStatus('loaded');
            } else if (isGreaterThanMd) {
                setProducts(data.slice(page * 2, (page + 1) * 2));
                setStatus('loaded');
            } else {
                setProducts(data.slice(page * 1, (page + 1) * 1));
                setStatus('loaded');
            }
        }
    },[data, isGreaterThanMd])

    useEffect(() => {
        if(data){
            if (isGreaterThanXL) {
                setProducts(data.slice(page * 4, (page + 1) * 4)); 
            } else if (isGreaterThanLg) {
                setProducts(data.slice(page * 3, (page + 1) * 3)); 
            } else if (isGreaterThanMd) {
                setProducts(data.slice(page * 2, (page + 1) * 2)); 
            } else {
                setProducts(data.slice(page * 1, (page + 1) * 1)); 
            }
        }
    },[page])

    return ( 
        <Box
            w="full"
            mx="auto"
            height="full"
            px={{ base: "2", md: "8" }}
            p={isGreaterThanMd ? 2 : 0}
            mb={10}
            {...props}
        >
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} w={"100%"} position={"relative"}>
                <Flex w={isGreaterThanMd ? "50%" : "100%"} pl={isGreaterThanMd ? 0 : 2}>
                    <Text
                        fontSize={isGreaterThanMd ? "26px" : "20px"}
                        color="accent.500"
                        mb="2"
                        mt={"10"}
                        fontWeight="600"
                    >
                        {titleSection}
                    </Text>
                </Flex>
                <Flex display={isGreaterThanMd ? "none" : "flex"} direction="row" alignItems="center" position={isGreaterThanMd ? "relative" : "absolute"}>
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
                        left={250}
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
                        left={260}
                        bg="#E2E2E2"
                        zIndex="2"
                        aria-label={`Mostrar categorias página: ${page + 1}`}
                        isDisabled={page >= 6 ? true : false}
                    />
                </Flex>
            </Flex>
            <Flex direction="column" align="center">
                <Box mt={"2rem"}>
                    <Flex direction="row" alignItems="center">
                        <IconButton
                            display={isGreaterThanMd ? "flex" : "none"}
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
                            right={{ base: "-6", md: 0 }}
                            bg="#E2E2E2"
                            zIndex="2"
                            aria-label={`Mostrar categorias página: ${page - 1}`}
                        />
                        {CardsRenderer(products, status)}
                        <IconButton
                            display={isGreaterThanMd ? "flex" : "none"}
                            icon={<ChevronRightIcon color={"#888888"} />}
                            rounded="full"
                            border="0"
                            colorScheme="brand"
                            shadow="md"
                            transitionDuration=".3s"
                            _hover={{ shadow: "lg" }}
                            onClick={() => setPage(page + 1)}
                            position="relative"
                            left={{ base: "-6", md: 0 }}
                            bg="#E2E2E2"
                            zIndex="2"
                            aria-label={`Mostrar categorias página: ${page + 1}`}
                            isDisabled={page >= 1 ? true : false}
                        />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
 
export default FeaturedCategories;