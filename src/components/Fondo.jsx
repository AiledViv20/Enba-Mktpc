import React from 'react';
import { 
    Flex,
    useTheme,
    useMediaQuery
} from "@chakra-ui/react";

import "../styles/fondo.css";

const Fondo = ({ bg, bgmb }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return (
        <Flex
            width={"100%"} height={isGreaterThanMd ? "312px" : "350px"} 
            borderRadius={"20px"} backgroundImage={`url(${isGreaterThanMd ? bg : bgmb})`} 
            backgroundSize="cover" mb={10}
            backgroundAttachment={isGreaterThanMd ? "fixed" : "none"}
            backgroundPosition="center center"
            backgroundRepeat="no-repeat">
        </Flex>
    );
}
 
export default Fondo;