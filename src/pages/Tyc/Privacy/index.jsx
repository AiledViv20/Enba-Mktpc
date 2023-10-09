import React from 'react';
import { 
    Flex,
    useTheme, 
    useMediaQuery
} from '@chakra-ui/react';
import Footer from '../../../components/Footer';
import PrivacyDkst from './PrivacyDkst';
import PrivacyMb from './PrivacyMb';

const Privacy = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    
    return ( 
        <>
            <Flex display={isGreaterThanMd ? "flex" : "none"} width={"100%"} mt={10} mb={20}>
                <PrivacyDkst />
            </Flex>
            <Flex display={isGreaterThanMd ? "none" : "flex"} width={"100%"} mt={10} mb={10} flexDirection={"column"}>
                <PrivacyMb />
            </Flex>
            <Footer />
        </>
    );
}
 
export default Privacy;
