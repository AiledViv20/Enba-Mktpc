import React, { useState, useEffect } from 'react';
import { 
    Flex, 
    Text,  
    useMediaQuery, 
    useTheme,
    Image,
    Box
} from '@chakra-ui/react';

import "../styles/styled.css";
import "../styles/presentacion.css";

import Nav from './Nav';

import { Carousel } from './Carousel/Carousel';

import bg1 from '../assets/images/banner/banner1.png';
import bg2 from '../assets/images/banner/banner2.png';
import bg3 from '../assets/images/banner/banner3.png';

import icon1 from '../assets/icons/circle-on.svg';
import icon2 from '../assets/icons/circle-off.svg';

import SearchBar from './SearchBar';

const Presentacion = (props) => {
    const [current, setCurrent] = useState(0);
    const [dotClicked, setDotClicked] = useState(false);
    //Elementos para responsive
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
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

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
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
                            <Flex borderRadius="20px" height='100%' w='100%' backgroundColor={"#0000002e"}></Flex>
                            <Flex
                                height="100vh"
                                width={"100%"}
                                top={"20"}
                                justifyContent={"center"}
                                position="absolute">
                                <Flex textTransform={"uppercase"} flexDirection="column" alignItems={"center"}>
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