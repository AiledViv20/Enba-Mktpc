import React from 'react';
import { 
    Flex, 
    Text,
    Button,
    Input,
    Textarea,
    useDisclosure
} from '@chakra-ui/react';
import ModalPrintImage from '../ModalPrintImage';

const Form = ({ step1 }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex mt={10} flexDirection={"column"} display={step1 ? "flex" : "none"}>
            <Flex mb={3} zIndex={1}>
                <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Nombre(s)' mr={5} />
                <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Apellido' />
            </Flex>
            <Flex mb={3} zIndex={1}>
                <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Email' mr={5} />
                <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Teléfono' />
            </Flex>
            <Flex mb={3} zIndex={1}>
                <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Estado' mr={5} />
                <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Municipio' />
            </Flex>
            <Flex mb={3} zIndex={1}>
                <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Código postal' mr={5} />
                <Input fontSize={"14px"} width={"152px"} height={"48px"} placeholder='No. Interior' mr={2} />
                <Input fontSize={"14px"} width={"152px"} height={"48px"} placeholder='No. Exterior' />
            </Flex>
            <Flex zIndex={1}>
                <Input fontSize={"14px"} width={"100%"} height={"48px"} placeholder='Fecha máxima de entrega (¿Cuándo necesita el pedido?)' />
            </Flex>
            <Flex mt={10} mb={3} zIndex={1}>
                <Flex flexDirection={"column"} justifyContent={"center"}>
                    <Text mb={2} fontFamily={"Montserrat, sans-serif"} fontSize={"14px"} fontWeight={500}>Anexe su logotipo Max. 20 Mb</Text>
                    <Input pl={0} border={"transparent"} type='file' accept="image/*" placeholder='Seleccionar archivo' />
                </Flex>
                <Flex>
                    <Button onClick={onOpen} type='button' fontWeight={500} fontSize={"14px"} color={"accent.500"} border={"1px solid"} borderColor={"accent.500"} variant='outline'>Ver previsualización de impresión</Button>
                </Flex>
            </Flex>
            <Flex zIndex={1}>
                <Textarea fontSize={"14px"} placeholder='Indicaciones o dudas' />
            </Flex>
            <Flex mt={20} justifyContent={"center"} zIndex={1}>
                <Button _hover={{ bg: "#063D5F"}} w={"174px"} fontWeight={500} fontSize={"14px"}>Enviar</Button>
            </Flex>
            {isOpen ?
                    <ModalPrintImage 
                        isOpen={isOpen}
                        onClose={onClose} />
                : null
            }
        </Flex>
    );
}
 
export default Form;