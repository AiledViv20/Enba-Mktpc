import React, { useState, useEffect } from 'react';
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
} from "@chakra-ui/react";
import AddKitCardMb from './AddKitCardMb';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { WarningTwoIcon } from "@chakra-ui/icons";

const CardsRenderer = (products, status, showKitIncludes, setShowKitIncludes) => {
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
            return <AddKitCardMb product={products[0]} showKitIncludes={showKitIncludes} setShowKitIncludes={setShowKitIncludes} />;
        }
        return products.map((element) => (
            <AddKitCardMb key={element.id} product={element} showKitIncludes={showKitIncludes} setShowKitIncludes={setShowKitIncludes} />
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
            setProducts(data.slice(page * 4, (page + 1) * 4));
            setStatus('loaded');
        }
    },[data])

    useEffect(() => {
        if(data){
            setProducts(data.slice(page * 4, (page + 1) * 4));   
        }
    },[page])

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
            <Text
                fontSize={"18px"}
                color="#424242"
                mb="2"
                mt={"10"}
                fontWeight="700"
            >
                {titleSection}
            </Text>
            <Flex direction="column" align="center">
                <Box mt={"2rem"}>
                    <Flex direction="row" alignItems="center">
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
                            right={{ base: "-6", md: 0 }}
                            bg="#E2E2E2"
                            zIndex="2"
                            aria-label={`Mostrar categorias página: ${page - 1}`}
                        />
                        {CardsRenderer(products, status, showKitIncludes, setShowKitIncludes)}
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
                            left={{ base: "-6", md: 0 }}
                            bg="#E2E2E2"
                            zIndex="2"
                            aria-label={`Mostrar categorias página: ${page + 1}`}
                        />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
 
export default AddProductsKit;
