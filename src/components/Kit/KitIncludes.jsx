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
    Button
} from "@chakra-ui/react";
import KitCard from './KitCard';

import { FaTrashAlt } from "react-icons/fa";
import { WarningTwoIcon } from "@chakra-ui/icons";

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
        return products.map((element, idx) => (
            <KitCard key={idx} product={element} showIconPlus={idx === 0 ? false : true} />
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

const KitIncludes = ({ titleSection, data, props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [page, setPage] = useState(0);
    const [isSelectedProductTrash, setIsSelectedProductTrash] = useState(false);
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
                        isDisabled={isSelectedProductTrash ? false : true}/>
                </Flex>
            </Flex>
            <Flex direction="column" align="center">
                <Box mt={"2rem"}>
                    <Flex direction="row" alignItems="center">
                        {CardsRenderer(products, status)}
                    </Flex>
                </Box>
                <Flex mt={"2rem"}>
                    <Button  type='button'
                    _hover={{
                        bg: "#063D5F"
                    }}
                    isDisabled={data.length === 4 ? false : true}>Agregar kit</Button>
                </Flex>
            </Flex>
        </Box>
    );
}
 
export default KitIncludes;
