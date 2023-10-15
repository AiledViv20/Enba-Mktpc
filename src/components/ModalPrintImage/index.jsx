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
    ModalHeader,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';

import icon1 from '../../assets/icons/printproduct/enba.svg';
import icon2 from '../../assets/icons/printproduct/creative.svg';
import icon3 from '../../assets/icons/printproduct/namelogo.svg';
import icon4 from '../../assets/icons/printproduct/letterlogo.svg';
import icon5 from '../../assets/icons/printproduct/creativelogo.svg';

const ModalPrintImage = ({ isOpen, onClose, product = null }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [img, setImg] = useState();
    const [nextStepImg, setNextStepImg] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectNum, setSelectNum] = useState(null);

    const [container, setContainer] = useState({
        selected1: false,
        selected2: false,
        selected3: false,
        selected4: false,
        selected5: false
    });

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        setImg(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
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
        setSelectNum(num);
    }
    
    const validateSelectLogoIcon = () => {
        switch (selectNum) {
            case 1:
                return icon1;
            case 2:
                return icon2;
            case 3:
                return icon3;
            case 4:
                return icon4;
            default:
                return icon5;
        }
    }

    return ( 
        <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={"transparent"}>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex display={nextStepImg ? "none" : "flex"} fontWeight={400} mt={2} flexDirection={"column"}>
                        <Flex mb={5} justifyContent={isGreaterThanMd ? "initial" : "center"}>
                            <Text textAlign={isGreaterThanMd ? "initial" : "center"} fontSize={isGreaterThanMd ? "18px" : "16px"} color={"#002B49"}>Sube tu logotipo para tener una previsualizacion de la impresión</Text>
                        </Flex>
                        <Flex mb={10} h={"178px"} bg={"#F6F6F6"} justifyContent={"center"} alignItems={"center"} border={"1px solid #D9D9D9"} flexDirection={"column"}>
                            <Text fontFamily={"Montserrat, sans-serif"} color={"#000"} fontSize={isGreaterThanMd ? "18px" : "16px"}>Carga tu logotipo en formato PNG</Text>
                            <Input name='img' type='file' accept='.png' mt={2} w={"auto"} onChange={handleChangeFile} border={"transparent"} pl={0}/>
                        </Flex>
                        <Flex mb={5} justifyContent={isGreaterThanMd ? "initial" : "center"}>
                            <Text textAlign={isGreaterThanMd ? "initial" : "center"} fontSize={"16px"} color={"#002B49"}>O escoge un logotipo de nuestra biblioteca, para observar un ejemplo de impresión</Text>
                        </Flex>
                        <Flex mb={8} justifyContent={"center"} display={isGreaterThanMd ? "flex" : "none"}>
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
                        <Flex mb={8} display={isGreaterThanMd ? "none" : "flex"} flexDirection={"column"}>
                            <Flex justifyContent={"center"}>
                                <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"112px"} h={"68px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                    onClick={() => selectLogo(1)} border={"3px solid"} borderColor={container.selected1 ? "accent.500" : "transparent"}
                                    _hover={{
                                        cursor: "pointer"                                    
                                    }}>
                                    <Flex>
                                        <Image w={"60px"} h={"16px"} src={icon1} alt='icono logo' />
                                    </Flex>
                                </Flex>
                                <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"112px"} h={"68px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                    onClick={() => selectLogo(2)} border={"3px solid"} borderColor={container.selected2 ? "accent.500" : "transparent"}
                                    _hover={{
                                        cursor: "pointer"                                    
                                    }}>
                                    <Flex>
                                        <Image w={"70px"} h={"50px"} src={icon2} alt='icono logo' />
                                    </Flex>
                                </Flex>
                                <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"112px"} h={"68px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                    onClick={() => selectLogo(3)} border={"3px solid"} borderColor={container.selected3 ? "accent.500" : "transparent"}
                                    _hover={{
                                        cursor: "pointer"                                    
                                    }}>
                                    <Flex>
                                        <Image w={"70px"} h={"40px"} src={icon3} alt='icono logo' />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex mt={5} justifyContent={"center"}>
                                <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"112px"} h={"68px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                    onClick={() => selectLogo(4)} border={"3px solid"} borderColor={container.selected4 ? "accent.500" : "transparent"}
                                    _hover={{
                                        cursor: "pointer"                                    
                                    }}>
                                    <Flex>
                                        <Image w={"70px"} h={"40px"} src={icon4} alt='icono logo' />
                                    </Flex>
                                </Flex>
                                <Flex bg={"#F0F0F0"} borderRadius={"10px"} w={"112px"} h={"68px"} justifyContent={"center"} alignItems={"center"} mr={5}
                                    onClick={() => selectLogo(5)} border={"3px solid"} borderColor={container.selected5 ? "accent.500" : "transparent"}
                                    _hover={{
                                        cursor: "pointer"                                    
                                    }}>
                                    <Flex>
                                        <Image w={"70px"} h={"40px"} src={icon5} alt='icono logo' />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex mb={5} justifyContent={"center"}>
                            <Button fontWeight={500} fontSize={"14px"} color={"accent.500"} w={"290px"} h={"44px"}
                                border={"1px solid"} borderColor={"accent.500"} variant={"outline"} type='button'
                                onClick={() => setNextStepImg(true)}>
                                Continuar
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex display={nextStepImg ? "flex" : "none"} justifyContent={"center"} alignItems={"center"} position={"relative"}>
                        <Flex>
                            <Image src={product ? product : ""} alt='img'/>
                        </Flex>
                        <Flex position={"absolute"} justifyContent={"center"}>
                            <Image src={selectedFile ? selectedFile : validateSelectLogoIcon()} alt='logo'/>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
 
export default ModalPrintImage;