import React from 'react';
import { 
    Flex, 
    Box, 
    Text,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import Footer from '../../components/Footer';
import QuoteProductDkts from './QuoteProductDkst';
import QuoteProductMb from './QuoteProductMb';

const QuoteProduct = ({ props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / Cotizar`}
                    </Text>
                </Flex>
            </Box>
            <Flex w={"100%"} display={isGreaterThanMd ? "flex" : "none"} padding={"2rem 5%"} pt={0} mb={10}>
                <QuoteProductDkts />
            </Flex>
            <Flex w={"100%"} display={isGreaterThanMd ? "none" : "flex"} flexDirection={"column"} padding={"2rem 5%"} pt={0} mb={10}>
                <QuoteProductMb />
            </Flex>
            <Footer />
        </>
    );
}
 
export default QuoteProduct;