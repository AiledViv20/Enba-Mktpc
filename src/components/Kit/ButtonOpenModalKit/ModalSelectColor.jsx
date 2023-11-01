import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Flex,
    Select
} from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../../../resource/validate';

const ModalSelectColor = ({ isOpen, onClose, showKitIncludes, addKitShoppingCart }) => {
    const [values, setValues] = useState({
        colorp1: "",
        colorp2: "",
        colorp3: "",
        colorp4: "",
    });

    const validateValues = () => {
        if (values.colorp1 !== "" && values.colorp2 !== "" && values.colorp3 !== "" && values.colorp4 !== "") {
            return false;
        }
        return true;
    }

    return ( 
        <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Agregar al carrito</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <Text>Selecciona un color para agregar al carrito de compra</Text>
                    </Flex>
                    <Flex mt={10}>
                        <Flex w={"40%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[0]?.name)}</Text>
                        </Flex>
                        <Flex w={"60%"}>
                            <Select placeholder='Color'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} w={"100%"}>
                        <Flex w={"40%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[1]?.name)}</Text>
                        </Flex>
                        <Flex w={"60%"}>
                            <Select placeholder='Color'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} w={"100%"}>
                        <Flex w={"40%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[2]?.name)}</Text>
                        </Flex>
                        <Flex w={"60%"}>
                            <Select placeholder='Color'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} mb={10} w={"100%"}>
                        <Flex w={"40%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[3]?.name)}</Text>
                        </Flex>
                        <Flex w={"60%"} flexDirection={"column"}>
                            <Flex>
                                <Select placeholder='Color'>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </Flex>
                            <Flex w={"100%"} justifyContent={"center"}>
                                <Button 
                                    _hover={{
                                        bg: "#063D5F"
                                    }}
                                    mt={8}
                                    w={"176px"} 
                                    fontSize={"14px"} 
                                    fontWeight={500}
                                    onClick={() => addKitShoppingCart()}
                                    isDisabled={validateValues()}>
                                    Agregar al carrito
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
 
export default ModalSelectColor;