import React from 'react';
import { 
    Flex,
    useTheme, 
    useMediaQuery
} from '@chakra-ui/react';
import Footer from '../../../components/Footer';
import TermsDkst from './TermsDkst';
import TermsMb from './TermsMb';

const Terms = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return ( 
        <>
            <Flex display={isGreaterThanMd ? "flex" : "none"} width={"100%"} mt={10} mb={20}>
                <TermsDkst />
            </Flex>
            <Flex display={isGreaterThanMd ? "none" : "flex"} width={"100%"} mt={10} mb={10} flexDirection={"column"}>
                <TermsMb />
            </Flex>
            <Footer />
        </>
    );
}
 
export default Terms;
