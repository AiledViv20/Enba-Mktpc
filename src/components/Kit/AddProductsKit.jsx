import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Stack,
    Skeleton,
    useTheme,
    useMediaQuery
} from "@chakra-ui/react";
import AddKitCard from './AddKitCard';

import logoGif from '../../assets/icons/logo.gif';

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
            return <AddKitCard product={products[0]} showKitIncludes={showKitIncludes} setShowKitIncludes={setShowKitIncludes} />;
        }
        return products.map((element, idx) => (
            <AddKitCard key={idx} product={element} showKitIncludes={showKitIncludes} setShowKitIncludes={setShowKitIncludes} />
        ));
        //
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
                        {CardsRenderer(products, status, showKitIncludes, setShowKitIncludes)}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
 
export default AddProductsKit;
