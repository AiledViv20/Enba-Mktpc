import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Skeleton,
    Heading,
    useTheme,
    useMediaQuery,
    Link
} from "@chakra-ui/react";
import KitCard from './KitCard';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useGetKitsQuery } from '../hooks/enbaapi';

const CardsRenderer = (products, status) => {
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
            return <KitCard product={products[0]} />;
        }
        return products.map((element) => (
            <KitCard key={element.id} product={element} />
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

export const KitsProduct = ({ titleSection, props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loading');//loading, loaded

    const { data: kits, isLoading: isKitsLoading, error: kitsError } = useGetKitsQuery({
        take: 4,
        page: page,
        category: "",
        name: ""
    });

    useEffect(() => {
        if (kits) {
            setProducts(kits.slice(page * 4, (page + 1) * 4));
            setStatus('loaded');
        }
    },[kits])

    useEffect(() => {
        if(kits){
            setProducts(kits.slice(page * 4, (page + 1) * 4));   
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
                        fontWeight="600"
                    >
                        {titleSection}
                    </Text>
                </Flex>
                <Flex pl={isGreaterThanMd ? 0 : 2} w={isGreaterThanMd ? "50%" : "100%"} justifyContent={isGreaterThanMd ? "end" : "initial"} zIndex={1} color={"accent.500"}>
                    <Link fontSize={isGreaterThanMd ? "18px" : "14px"} textDecoration={"revert"} href='/categoria/Todas'>Ver más</Link>
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
                        left={260}
                        isDisabled={products.length < 4 ? true : false}
                        bg="#E2E2E2"
                        zIndex="2"
                        aria-label={`Mostrar productos página: ${page + 1}`}
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
                            aria-label={`Mostrar productos página: ${page - 1}`}
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
                            isDisabled={products.length < 4 ? true : false}
                            bg="#E2E2E2"
                            zIndex="2"
                            aria-label={`Mostrar productos página: ${page + 1}`}
                        />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
 
export default KitsProduct;