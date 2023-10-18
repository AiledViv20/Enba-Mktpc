import React, { useState } from 'react';
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
    useMediaQuery
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { galleryList } from '../../resource/validate';
import { useEffect } from 'react';

const Gallery = ({ isOpen, onClose }) => {
    const [current, setCurrent] = useState(0);
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [img, setImg] = useState(galleryList[0].imgUrl);

    const changeBanner = (num) => {
        let filterImg = [];
        if (num > 8) {
            filterImg = galleryList.filter(item => item.id === (current - 1));
            setImg(filterImg[0].imgUrl);
            setCurrent(0);
        } else if (num < 0) {
            filterImg = galleryList.filter(item => item.id === 8);
            setImg(filterImg[0].imgUrl);
            setCurrent(8);
        } else {
            filterImg = galleryList.filter(item => item.id === current);
            setImg(filterImg[0].imgUrl);
            setCurrent(num);
        }
    }

    useEffect(() => {
        changeBanner(current);
    }, [current]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
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
                                onClick={() => setCurrent(current - 1)}
                                position="relative"
                                right={14}
                                bg="#FFF"
                                zIndex="2"
                            />
                        </Flex>
                        <img src={img} width='96%' height='534px' alt='img' />
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
                                onClick={() => setCurrent(current + 1)}
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