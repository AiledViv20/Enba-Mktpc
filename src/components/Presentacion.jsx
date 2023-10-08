import React, { useState, useEffect } from 'react';
import { 
    Flex, 
    Text,
    Image,
    Box,
    IconButton,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';

import "../styles/styled.css";
import "../styles/presentacion.css";

import { Carousel } from './Carousel/Carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import bg1 from '../assets/images/banner/banner1.png';
import bg2 from '../assets/images/banner/banner2.png';
import bg3 from '../assets/images/banner/banner3.png';

import icon1 from '../assets/icons/circle-on.svg';
import icon2 from '../assets/icons/circle-off.svg';

import SearchBar from './SearchBar';

const Presentacion = (props) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [current, setCurrent] = useState(0);
    const [dotClicked, setDotClicked] = useState(false);

    const [screenSize, getDimension] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    });
    
    const setDimensions = () => {
        getDimension({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        });
    };

    const slides = [
        {
            key: "hero1",
            imageUrl: bg1,
        },
        {
            key: "hero2",
            imageUrl: bg2,
        },
        {
            key: "hero3",
            imageUrl: bg3,
        }
    ];

    useEffect(() => {
        if (!dotClicked) {
          const intervalId = setInterval(() => {
            if (current === slides.length-1) {
              setCurrent(0);
            } else {
              setCurrent(current + 1);
            }
          }, 5000);
        
          return () => clearInterval(intervalId);
        }
    }, [dotClicked, current, slides.length]);

    useEffect(() => {
        window.addEventListener("resize", setDimensions);
    
        return () => {
            window.removeEventListener("resize", setDimensions);
        };
    }, [screenSize]);

    const changeBanner = (num) => {
        if (num > 2) {
            setCurrent(0);
        } else if (num < 0) {
            setCurrent(2);
        }
         else {
            setCurrent(num);
        }
    }

    return ( 
        <>
            <Box id='proyecto' w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"}  position="relative">
                <Carousel current={current}>
                    { slides.map((slide, idx) => (
                        <Flex
                            w="100%"
                            h="456px"
                            key={idx}
                            id="fondo"
                            backgroundImage={`url(${slide.imageUrl})`}
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
                                top={"20"}
                                justifyContent={"center"}
                                position="absolute">
                                <Flex flexDirection="column" alignItems={"center"}>
                                    <Text textAlign={"center"} fontWeight={700} fontSize={'39px'}>
                                        {"“Hecho por ti y para ti.“"}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                </Carousel>
                <Flex
                    justifyContent="center"
                    alignItems="end"
                    height="100vh"
                    position="absolute"
                    bottom="60"
                    w="100%"
                    left="0"
                    right="0"
                >
                    <SearchBar />
                </Flex>
                <Flex
                    display={isGreaterThanMd ? "flex" : "none"}
                    justifyContent="flex-start"
                    alignItems="center"
                    position="absolute"
                    pl={"6%"}
                    top={"50%"}
                    w="100%"
                    left="0"
                    right="0"
                >
                    <IconButton
                        icon={<ChevronLeftIcon color={"#919292"} />}
                        rounded="full"
                        border="0"
                        colorScheme="brand"
                        shadow="md"
                        transitionDuration=".3s"
                        _hover={{ shadow: "lg" }}
                        onClick={() => changeBanner(current - 1)}
                        position="relative"
                        right={{ base: "-6", md: 0 }}
                        bg="#FFF"
                        zIndex="2"
                    />
                </Flex>
                <Flex
                    display={isGreaterThanMd ? "flex" : "none"}
                    justifyContent="flex-end"
                    alignItems="center"
                    position="absolute"
                    pr={"6%"}
                    top={"50%"}
                    w="100%"
                    left="0"
                    right="0"
                >
                    <IconButton
                        icon={<ChevronRightIcon color={"#919292"} />}
                        rounded="full"
                        border="0"
                        colorScheme="brand"
                        shadow="md"
                        transitionDuration=".3s"
                        _hover={{ shadow: "lg" }}
                        onClick={() => changeBanner(current + 1)}
                        position="relative"
                        right={{ base: "-6", md: 0 }}
                        bg="#FFF"
                        zIndex="2"
                    />
                </Flex>
                <Flex
                    justifyContent="center"
                    alignItems="end"
                    height="100vh"
                    position="absolute"
                    bottom="12"
                    w="100%"
                    left="0"
                    right="0"
                >
                    {slides.map((item, index) => (
                        <Flex key={`dot-${index}`}>
                            <Image 
                                width={"14px"}
                                height={"14px"}
                                margin={"0px 5px"}
                                src={(index === current) ? icon1 : icon2}
                                onClick={()=> {
                                    setDotClicked(!dotClicked);
                                    setCurrent(index);
                                }}
                                cursor="pointer"
                             />
                        </Flex>
                    ))}
                </Flex>
            </Box>
        </>
    );
}
 
export default Presentacion;