import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    IconButton,
    useTheme,
    useMediaQuery,
    Image
} from '@chakra-ui/react';

import { galleryList } from '../../resource/validate';

import { Carousel } from '../Carousel/Carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Gallery = ({ isOpen, onClose, selectGallery }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [current, setCurrent] = useState(0);
    const [dotClicked, setDotClicked] = useState(false);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        if (slides.length === 0) {
            const filterSlides = galleryList.filter(item => item.id === selectGallery);
            setSlides(filterSlides[0].images);
        }
    }, []);

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
        let numLimit = 0;
        switch (selectGallery) {
            case 0:
                numLimit = 5;
                break;
            case 1:
            case 3:
                numLimit = 2;
                break;
            case 2:
                numLimit = 3;
                break;
            case 4:
                numLimit = 1;
                break;
            default:
                break;
        }
        if (selectGallery === 0) {
            
        }
        else if (selectGallery === 4) {
            numLimit = 1;
        } else if (selectGallery !== 4 && selectGallery === 0) {
            numLimit = 2;
        }
        if (num > numLimit) {
            setCurrent(0);
        } else if (num < 0) {
            setCurrent(numLimit);
        }
         else {
            setCurrent(num);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex justifyContent={"center"} pt={5} pb={5} position={"relative"}>
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
                                right={14}
                                bg="#FFF"
                                zIndex="2"
                            />
                        </Flex>
                        <Flex justifyContent={"center"}>
                            <Carousel current={current}>
                                { slides.map((slide, idx) => (
                                    <Flex justifyContent={"center"}>
                                        <Image
                                            key={idx}
                                            boxSize='534px'
                                            objectFit='cover'
                                            src={slide.imgUrl}
                                            alt='img' />
                                    </Flex>
                                ))}
                            </Carousel>
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
                                right={-14}
                                bg="#FFF"
                                zIndex="2"
                            />
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
 
export default Gallery;