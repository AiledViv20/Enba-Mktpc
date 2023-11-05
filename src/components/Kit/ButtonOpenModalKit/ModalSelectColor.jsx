import React, { useState, useEffect } from 'react';
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
    Select,
    Spinner
} from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../../../resource/validate';

const ModalSelectColor = ({ isOpen, onClose, showKitIncludes, setShowKitIncludes, addKitShoppingCart }) => {
    const [loading, setLoading] = useState(false);
    const [colors1, setColors1] = useState([]);
    const [colors2, setColors2] = useState([]);
    const [colors3, setColors3] = useState([]);
    const [colors4, setColors4] = useState([]);
    const [values, setValues] = useState({
        colorp1: "",
        colorp2: "",
        colorp3: "",
        colorp4: ""
    });

    const validateValues = () => {
        if (values.colorp1 !== "" && values.colorp2 !== "" && values.colorp3 !== "" && values.colorp4 !== "") {
            return false;
        }
        return true;
    }

    const handleChangeSelected = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const filterObjShoppingCart = () => {
        setLoading(true);
        const listColors = [values.colorp1, values.colorp2, values.colorp3, values.colorp4];
        const selectsOptionsColorKit = showKitIncludes.map((item, idx) => {
            return {
                ...item,
                color: listColors[idx]
            }
        })
        setShowKitIncludes(selectsOptionsColorKit);
        setTimeout(() => {
            setLoading(false);
            addKitShoppingCart();
            onClose();
        }, 1000);
    }

    const renderOptionColors = (product) => {
        const colors_ = [];
        product.items.forEach((elmnt) => {
            colors_.push({sku: elmnt.sku, color: elmnt.color})
        })
        return colors_;
    }

    useEffect(() => {
        const select1 = renderOptionColors(showKitIncludes[0]);
        setColors1(select1);
        const select2 = renderOptionColors(showKitIncludes[1]);
        setColors2(select2);
        const select3 = renderOptionColors(showKitIncludes[2]);
        setColors3(select3);
        const select4 = renderOptionColors(showKitIncludes[3]);
        setColors4(select4);
    }, [showKitIncludes]);

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
                            <Select name='colorp1' onChange={handleChangeSelected} placeholder='Color'>
                                {colors1 && colors1.map((clr, idx) => (
                                    <option key={idx} value={clr.color}>{capitalizeFirstLetter(clr.color)}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} w={"100%"}>
                        <Flex w={"40%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[1]?.name)}</Text>
                        </Flex>
                        <Flex w={"60%"}>
                            <Select name='colorp2' onChange={handleChangeSelected} placeholder='Color'>
                                {colors2 && colors2.map((clr2, idx2) => (
                                    <option key={idx2} value={clr2.color}>{capitalizeFirstLetter(clr2.color)}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} w={"100%"}>
                        <Flex w={"40%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[2]?.name)}</Text>
                        </Flex>
                        <Flex w={"60%"}>
                            <Select name='colorp3' onChange={handleChangeSelected} placeholder='Color'>
                                {colors3 && colors3.map((clr3, idx3) => (
                                    <option key={idx3} value={clr3.color}>{capitalizeFirstLetter(clr3.color)}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} mb={10} w={"100%"}>
                        <Flex w={"40%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[3]?.name)}</Text>
                        </Flex>
                        <Flex w={"60%"} flexDirection={"column"}>
                            <Flex>
                                <Select name='colorp4' onChange={handleChangeSelected} placeholder='Color'>
                                    {colors4 && colors4.map((clr4, idx4) => (
                                        <option key={idx4} value={clr4.color}>{capitalizeFirstLetter(clr4.color)}</option>
                                    ))}
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
                                    onClick={() => filterObjShoppingCart()}
                                    isDisabled={validateValues()}>
                                    {loading ?
                                        <Spinner /> : "Agregar al carrito"
                                    }
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