import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Image,
    Input,
    Flex,
    Tooltip
} from '@chakra-ui/react';

import icon1 from '../../assets/icons/printproduct/enba.svg';
import icon2 from '../../assets/icons/printproduct/creative.svg';
import icon3 from '../../assets/icons/printproduct/namelogo.svg';
import icon4 from '../../assets/icons/printproduct/letterlogo.svg';
import icon5 from '../../assets/icons/printproduct/creativelogo.svg';

import { colors_print_product } from '../../resource';

const ModalPrintImage = ({ isOpen, onClose }) => {
    const [selectColor, setSelectColor] = useState(null);
    const [img, setImg] = useState();
    const [container, setContainer] = useState({
        selected1: false,
        selected2: false,
        selected3: false,
        selected4: false,
        selected5: false
    });

    const handleChangeFile = (e) => {
        setImg(e.target.files[0]);
    }

    const selectLogo = (num) => {
        switch (num) {
            case 1:
                setContainer({
                    selected1: true,
                    selected2: false,
                    selected3: false,
                    selected4: false,
                    selected5: false
                });
                break;
            case 2:
                setContainer({
                    selected1: false,
                    selected2: true,
                    selected3: false,
                    selected4: false,
                    selected5: false
                });
                break;
            case 3:
                setContainer({
                    selected1: false,
                    selected2: false,
                    selected3: true,
                    selected4: false,
                    selected5: false
                });
                break;
            case 4:
                setContainer({
                    selected1: false,
                    selected2: false,
                    selected3: false,
                    selected4: true,
                    selected5: false
                });
                break;
            default:
                setContainer({
                    selected1: false,
                    selected2: false,
                    selected3: false,
                    selected4: false,
                    selected5: true
                });
                break;
        }
    }

    return ( 
        <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Flex fontWeight={400} mt={5} flexDirection={"column"}>
                        <Flex mb={5}>
                            <Text fontSize={"18px"} color={"#002B49"}>Sube tu logotipo para tener una previsualizacion de la impresión</Text>
                        </Flex>
                        <Flex mb={10} h={"178px"} bg={"#F6F6F6"} justifyContent={"center"} alignItems={"center"} border={"1px solid #D9D9D9"} flexDirection={"column"}>
                            <Text fontFamily={"Montserrat, sans-serif"} color={"#000"} fontSize={"18px"}>Carga tu logotipo en formato PNG</Text>
                            <Input accept='image/*' mt={2} w={"auto"} name='img' type='file' onChange={handleChangeFile} border={"transparent"} pl={0}/>
                        </Flex>
                        <Flex mb={5} justifyContent={"center"}>
                            <Text fontSize={"16px"} color={"#002B49"}>O escoge un logotipo de nuestra biblioteca, para observar un ejemplo de impresión</Text>
                        </Flex>
                        <Flex mb={8} justifyContent={"center"}>
                            <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"146px"} h={"90px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                onClick={() => selectLogo(1)} border={"3px solid"} borderColor={container.selected1 ? "accent.500" : "transparent"}
                                _hover={{
                                    cursor: "pointer"                                    
                                }}>
                                <Flex>
                                    <Image src={icon1} alt='icono logo' />
                                </Flex>
                            </Flex>
                            <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"146px"} h={"90px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                onClick={() => selectLogo(2)} border={"3px solid"} borderColor={container.selected2 ? "accent.500" : "transparent"}
                                _hover={{
                                    cursor: "pointer"                                    
                                }}>
                                <Flex>
                                    <Image src={icon2} alt='icono logo' />
                                </Flex>
                            </Flex>
                            <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"146px"} h={"90px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                onClick={() => selectLogo(3)} border={"3px solid"} borderColor={container.selected3 ? "accent.500" : "transparent"}
                                _hover={{
                                    cursor: "pointer"                                    
                                }}>
                                <Flex>
                                    <Image src={icon3} alt='icono logo' />
                                </Flex>
                            </Flex>
                            <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"146px"} h={"90px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                onClick={() => selectLogo(4)} border={"3px solid"} borderColor={container.selected4 ? "accent.500" : "transparent"}
                                _hover={{
                                    cursor: "pointer"                                    
                                }}>
                                <Flex>
                                    <Image src={icon4} alt='icono logo' />
                                </Flex>
                            </Flex>
                            <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"146px"} h={"90px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                onClick={() => selectLogo(5)} border={"3px solid"} borderColor={container.selected5 ? "accent.500" : "transparent"}
                                _hover={{
                                    cursor: "pointer"                                    
                                }}>
                                <Flex>
                                    <Image src={icon5} alt='icono logo' />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex mb={5} justifyContent={"center"}>
                            <Text fontSize={"16px"} color={"#002B49"}>{`Escoge el color del logotipo ${selectColor ? `(${selectColor})` : ''}`}</Text>
                        </Flex>
                        <Flex mb={5} justifyContent={"center"}>
                            {colors_print_product.map((item, index) => (
                                <Tooltip hasArrow label={item.color} bg='gray.300' color='black'>
                                    <Text
                                        key={`color-${index}`}
                                        marginRight={"1px"}
                                        cursor="pointer"
                                        fontSize={"50px"}
                                        color={item.hex}
                                        onClick={() => setSelectColor(item.color)}
                                    >
                                        &#9679;
                                    </Text>
                                </Tooltip>
                            ))}
                        </Flex>
                        <Flex mb={5} justifyContent={"center"}>
                            <Button fontWeight={500} fontSize={"14px"} color={"accent.500"} w={"290px"} h={"44px"}
                                border={"1px solid"} borderColor={"accent.500"} variant={"outline"} type='button'
                                onClick={onClose}>
                                Continuar
                            </Button>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
 
export default ModalPrintImage;