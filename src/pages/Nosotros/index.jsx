import React from 'react';
import { 
    Flex,
    Box,
    Text,
    Image,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import Footer from '../../components/Footer';

import banner from '../../assets/images/banner/banner-nosotros.png';

import vIcon1 from '../../assets/icons/nosotros/valores/honestidad.svg';
import vIcon2 from '../../assets/icons/nosotros/valores/calidad.svg';
import vIcon3 from '../../assets/icons/nosotros/valores/competitividad.svg';
import vIcon4 from '../../assets/icons/nosotros/valores/puntualidad.svg';
import CarouselOurWork from '../../components/CarouselOurWork';

const Nosotros = ({ props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={isGreaterThanMd ? "2rem 5%" : "10px 5%"} pt={10} pb={isGreaterThanMd ? 20 : 10} position="relative">
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
                    color={"#FFFFFF"}
                    borderRadius="20px">
                    <Flex borderRadius="20px" height='100%' w='100%' backgroundColor={"#0000004e"}></Flex>
                    <Flex
                        height="100vh"
                        width={"100%"}
                        top={"40"}
                        justifyContent={"center"}
                        position="absolute">
                        <Flex flexDirection="column" alignItems={"center"}>
                            <Text textAlign={"center"} fontWeight={700} fontSize={'39px'}>
                                Nosotros
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"100%"} fontWeight={400} color={"#000"} fontSize={"18px"} flexDirection={"column"} pt={10}>
                    <Text mb={3} textAlign={"center"} fontSize={isGreaterThanMd ? "32px" : "26px"} as={"b"}>SOMOS UNA EMPRESA 100% MEXICANA</Text>
                    <Text mb={10} lineHeight={1.2} textAlign={"center"}>Nos especializamos en innovación y desarrollo de nuevos<br />productos para facilitar tu día a día.</Text>
                    <Text mb={5} lineHeight={1.2} textAlign={"center"}>En Grupo Enba somos una empresa líder en la industria de artículos promocionales desde 1992, dedicados a la innovación constante<br />mediante un servicio al cliente de primer nivel.</Text>
                    <Text mb={5} lineHeight={1.2} textAlign={"center"}>
                        Nuestro enfoque principal es brindar soluciones personalizadas para promover y fortalecer la imagen de marca de nuestros clientes. Con amplia experiencia en importación, exportación, fabricación y comercialización, nos destacamos por nuestra atención al detalle, entrega puntual y compromiso inquebrantable con la satisfacción del cliente.
                    </Text>
                    <Text mb={20} textAlign={"center"}>Lo hacemos por ti.</Text>
                    <Text textAlign={"center"} fontSize={"32px"} as={"b"}>Nuestros clientes</Text>
                </Flex>
            </Box>
            <CarouselOurWork />
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} w={"100%"} fontWeight={400} fontSize={"18px"} h={isGreaterThanMd ? "200px" : "auto"} mb={isGreaterThanMd ? 10 : 5}>
                <Flex w={isGreaterThanMd ? "50%" : "100%"} bg={"#F2F2F2"} justifyContent={"center"} alignItems={"center"}>
                    <Flex display={isGreaterThanMd ? "flex" : "none"} flexDirection={"column"}>
                        <Text fontSize={"32px"} as={"b"} lineHeight={1.8}>Misión</Text>
                        <Text lineHeight={1.2}>Estar a la vanguardia y ofrecerle siempre el mejor<br />precio, servicio y calidad en nuestros productos.</Text>
                    </Flex>
                    <Flex pt={5} pb={8} display={isGreaterThanMd ? "none" : "flex"} textAlign={"center"} flexDirection={"column"}>
                        <Text fontSize={"26px"} as={"b"} lineHeight={1.8}>Misión</Text>
                        <Text lineHeight={1.2}>Estar a la vanguardia y ofrecerle<br />siempre el mejor precio, servicio y<br />calidad en nuestros productos.</Text>
                    </Flex>
                </Flex>
                <Flex w={isGreaterThanMd ? "50%" : "100%"} bg={"#DEDEDE"} justifyContent={"center"} alignItems={"center"}>
                    <Flex display={isGreaterThanMd ? "flex" : "none"} flexDirection={"column"}>
                        <Text fontSize={"32px"} as={"b"} lineHeight={1.8}>Visión</Text>
                        <Text lineHeight={1.2}>Innovar para satisfacer las necesidades de nuestros<br />clientes, de manera integral.</Text>
                    </Flex>
                    <Flex pt={5} pb={8} display={isGreaterThanMd ? "none" : "flex"} textAlign={"center"} flexDirection={"column"}>
                        <Text fontSize={"26px"} as={"b"} lineHeight={1.8}>Visión</Text>
                        <Text lineHeight={1.2}>Innovar para satisfacer las necesidades<br />de nuestros clientes, de manera integral.</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex pt={10} justifyContent={"center"} mb={5}>
                <Text fontSize={"32px"} as={"b"}>Valores</Text>
            </Flex>
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={10} alignItems={"center"} justifyContent={"center"} fontSize={"18px"} fontWeight={400}>
                <Flex mt={isGreaterThanMd ? 0 : 5} mr={isGreaterThanMd ? 20 : 0} alignItems={"center"}>
                    <Image src={vIcon1} mr={3} />
                    <Text>Honestidad</Text>   
                </Flex>
                <Flex mt={isGreaterThanMd ? 0 : 10} mr={isGreaterThanMd ? 20 : 0} alignItems={"center"}>
                    <Image src={vIcon2} mr={3} />
                    <Text>Calidad</Text>   
                </Flex>
                <Flex mt={isGreaterThanMd ? 0 : 10} mr={isGreaterThanMd ? 20 : 0} alignItems={"center"}>
                    <Image src={vIcon3} mr={3} />
                    <Text>Competitividad</Text>   
                </Flex>
                <Flex mt={isGreaterThanMd ? 0 : 10} alignItems={"center"}>
                    <Image src={vIcon4} mr={3} />
                    <Text>Puntualidad</Text>   
                </Flex>
            </Flex>
            <Flex pt={isGreaterThanMd ? 10 : 5} justifyContent={"center"} mb={10}>
                <Text fontSize={"32px"} as={"b"}>Ubicación</Text>
            </Flex>
            <Flex w={"100%"} justifyContent={"center"} mb={20}>
                <Flex w={isGreaterThanMd ? "70%" : "100%"} zIndex={1}>
                    <iframe title='ubicacion' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.9541394757584!2d-103.3564272246096!3d20.67144469995493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1fc1c9d968b%3A0x92b1a33dc4f1cfe7!2sLibertad%201211%2C%20Zona%20Centro%2C%2044100%20Guadalajara%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1693467917930!5m2!1ses-419!2smx" width="100%" height={isGreaterThanMd ? "530" : "350"} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Flex>
            </Flex>
            <Footer />
        </>
    );
}
 
export default Nosotros;