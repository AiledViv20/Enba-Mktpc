import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Box,
    Text,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import Footer from '../../components/Footer';

import ConfettiGenerator from "confetti-js";

import banner from '../../assets/images/banner/categoriaspop/img1.png';
import PopularCategoriesDkst from './PopularCategoriesDkst';
import PopularCategoriesMb from './PopularCategoriesMb';

const PopularCategories = ({ props }) => {
    const [stopAnimation, setStopAnimation] = useState(false);
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    useEffect(() => {
        const confettiSettings = {target:"confetti-holder",max:"80",size:"1",animate:true,props:["circle","square","triangle","line"],colors:[[255,0,0],[93,255,0],[255,240,0],[225,225,225]],clock:"25",rotate:true,width:"1920",height:"931",start_from_edge:false,respawn:true};
    
        // Verifica si el elemento canvas existe
        const canvasElement = document.getElementById(confettiSettings.target);
        if (!canvasElement) {
          console.error(`El elemento canvas con el ID "${confettiSettings.target}" no existe.`);
          return;
        }
    
        // Crea una instancia de confetti-js solo si el elemento canvas existe
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(() => {
            setStopAnimation(true);
        }, 16000);
    }, []);

    return ( 
        <>
            <Flex width={"100%"} flexDirection={"column"} position={"relative"}>
                <Flex pt={10} color={"#424242"} fontWeight={400} flexDirection={"column"} padding={"2rem 5%"}>
                    <Text mb={10} fontSize={"16px"}>Home / Categoría popular</Text>
                </Flex>
                <Box w="full" mx="auto" maxW="3x1" {...props} padding={"0px 5%"} pb={20} position="relative">
                    <Flex
                        w="100%"
                        h="354px"
                        backgroundImage={`url(${banner})`}
                        backgroundSize="cover"
                        backgroundPosition="center center"
                        backgroundRepeat="no-repeat"
                        backgroundColor="gray.100"
                        position="relative"
                        p="0"
                        borderRadius="20px">
                        <Flex borderRadius="20px" height='100%' w='100%' backgroundColor={"#0000004e"}></Flex>
                        <Flex
                            height="100vh"
                            width={"100%"}
                            top={"40"}
                            justifyContent={"center"}
                            position="absolute">
                            <Flex flexDirection="column" alignItems={"center"} color={"#FFF"}>
                                <Text textAlign={"center"} fontWeight={700} fontSize={isGreaterThanMd ? '39px' : "26px"}>
                                    Halloween / Día de muertos
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex width={"100%"} mt={10} display={isGreaterThanMd ? "flex" : "none"}>
                        <PopularCategoriesDkst />
                    </Flex>
                    <Flex width={"100%"} mt={10} display={isGreaterThanMd ? "none" : "flex"} flexDirection={"column"}>
                        <PopularCategoriesMb />
                    </Flex>
                </Box>
            </Flex>
            <Footer />
        </>
    );
}
 
export default PopularCategories;