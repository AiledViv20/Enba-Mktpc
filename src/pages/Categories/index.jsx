import React from 'react';
import { 
    Flex, 
    Box, 
    Text,
    useMediaQuery, 
    useTheme
} from '@chakra-ui/react';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';

import CategoriesDkst from './CategoriesDkst';
import CategoriesMb from './CategoriesMb';

const Categories = (props) => {
    const params_url = useParams();
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={20} position="relative">
                <Flex display={isGreaterThanMd ? "flex" : "none"}>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / ${params_url.category}`}
                    </Text>
                </Flex>
                <Flex display={isGreaterThanMd ? "flex" : "none"} width={"100%"} mt={10}>
                    <CategoriesDkst />
                </Flex>
                <Flex flexDirection={"column"} display={isGreaterThanMd ? "none" : "flex"} width={"100%"}>
                    <CategoriesMb />
                </Flex>
            </Box>
            <Footer />
        </>
    );
}
 
export default Categories;