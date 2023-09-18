import React from 'react';
import { 
    Flex, 
    Text,
    Button,
    Input,
    Textarea,
    useDisclosure
} from '@chakra-ui/react';
import ModalPrintImage from '../../ModalPrintImage';

const Step1 = ({ step1, createOrder, setCreateOrder, setLogo, logoInfo, setLogoInfo, validateStep1, isLoadingStep1, handleSubmit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChange = (e) => {
        setCreateOrder({
            ...createOrder,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeFile = (e) => {
        setLogo(e.target.files[0]);
        setLogoInfo({
            ...logoInfo,
            titleImg: e.target.files[0].name
        })
    }

    return (
        <Flex mt={10} flexDirection={"column"} display={step1 ? "flex" : "none"}>
            <Flex mb={3} zIndex={1}>
                <Input name='name' onChange={handleChange} fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Nombre(s)' mr={5} />
                <Input name='last_name' onChange={handleChange} fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Apellido' />
            </Flex>
            <Flex mb={3} zIndex={1}>
                <Input name='email' onChange={handleChange} fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Email' mr={5} />
                <Input name='phone' onChange={handleChange} fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Teléfono' />
            </Flex>
            <Flex mb={3} zIndex={1}>
                <Input name='state' onChange={handleChange} fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Estado' mr={5} />
                <Input name='city' onChange={handleChange} fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Municipio' />
            </Flex>
            <Flex mb={3} zIndex={1}>
                <Input name='postal_code' onChange={handleChange} fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Código postal' mr={5} />
                <Input name='internal_number' onChange={handleChange} fontSize={"14px"} width={"152px"} height={"48px"} placeholder='No. Interior' mr={2} />
                <Input name='external_number' onChange={handleChange} fontSize={"14px"} width={"152px"} height={"48px"} placeholder='No. Exterior' />
            </Flex>
            <Flex zIndex={1}>
                <Input name='max_delivery_date' onChange={handleChange} fontSize={"14px"} width={"100%"} height={"48px"} placeholder='Fecha máxima de entrega (¿Cuándo necesita el pedido?)' />
            </Flex>
            <Flex mt={10} mb={3} zIndex={1}>
                <Flex flexDirection={"column"} justifyContent={"center"}>
                    <Text mb={2} fontFamily={"Montserrat, sans-serif"} fontSize={"14px"} fontWeight={500}>Anexe su logotipo Max. 20 Mb</Text>
                    <Input name='logo' type='file' onChange={handleChangeFile} pl={0} border={"transparent"} accept="image/*" placeholder='Seleccionar archivo' />
                </Flex>
                <Flex>
                    <Button onClick={onOpen} type='button' fontWeight={500} fontSize={"14px"} color={"accent.500"} border={"1px solid"} borderColor={"accent.500"} variant='outline'>Ver previsualización de impresión</Button>
                </Flex>
            </Flex>
            <Flex zIndex={1}>
                <Textarea name='comments' onChange={handleChange} fontSize={"14px"} placeholder='Indicaciones o dudas' />
            </Flex>
            <Flex mt={20} justifyContent={"center"} zIndex={1}>
                <Button 
                    type='button'
                    _hover={{ bg: "#063D5F"}} w={"174px"} 
                    fontWeight={500} fontSize={"14px"}
                    onClick={() => handleSubmit()}
                    isDisabled={validateStep1()}
                    isLoading={isLoadingStep1}>
                    Enviar
                </Button>
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
 
export default Step1;