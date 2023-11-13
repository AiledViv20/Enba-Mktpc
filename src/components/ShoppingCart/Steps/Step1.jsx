import React, { useState } from 'react';
import { 
    Flex, 
    Text,
    Button,
    Input,
    Textarea,
    useDisclosure,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import ModalPrintImage from '../../ModalPrintImage';

const Step1 = ({ errorCreateOrder, showPreview, productsStore, step1, createOrder, setCreateOrder, setLogo, logoInfo, setLogoInfo, categoryPrintImg }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    
    const handleChange = (e) => {
        setCreateOrder({
            ...createOrder,
            [e.target.name]: e.target.value
        });
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
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={3} zIndex={1}>
                <Input 
                    name='name' onChange={handleChange} 
                    value={createOrder.name} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Nombre(s)' 
                    mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3}
                    isInvalid={errorCreateOrder.name}/>
                <Input 
                    name='last_name' onChange={handleChange} 
                    value={createOrder.last_name} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Apellido'
                    isInvalid={errorCreateOrder.last_name} />
            </Flex>
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={3} zIndex={1}>
                <Input 
                    name='email' onChange={handleChange} 
                    value={createOrder.email} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Email' 
                    mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3}
                    isInvalid={errorCreateOrder.email} />
                <Input 
                    name='phone' onChange={handleChange} 
                    value={createOrder.phone} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Teléfono'
                    isInvalid={errorCreateOrder.phone} />
            </Flex>
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={3} zIndex={1}>
                <Input 
                    name='state' onChange={handleChange} 
                    value={createOrder.state} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Estado' 
                    mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3}
                    isInvalid={errorCreateOrder.state} />
                <Input 
                    name='city' onChange={handleChange} 
                    value={createOrder.city} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Municipio'
                    isInvalid={errorCreateOrder.city} />
            </Flex>
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={3} zIndex={1}>
                <Input 
                    name='postal_code' onChange={handleChange} 
                    value={createOrder.postal_code} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Código postal' 
                    mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3}
                    isInvalid={errorCreateOrder.postal_code} />
                <Input 
                    name='external_number' onChange={handleChange} 
                    value={createOrder.external_number} fontSize={"14px"} 
                    width={isGreaterThanMd ? "152px" : "100%"} 
                    height={"48px"} placeholder='No. Exterior' 
                    mr={isGreaterThanMd ? 2 : 0} mb={isGreaterThanMd ? 0 : 3}
                    isInvalid={errorCreateOrder.external_number} />
                <Input 
                    name='internal_number' onChange={handleChange} 
                    value={createOrder.internal_number} fontSize={"14px"} 
                    width={isGreaterThanMd ? "152px" : "100%"} height={"48px"} 
                    placeholder='No. Interior' />
            </Flex>
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} zIndex={1}>
                <Input 
                    name='address' onChange={handleChange} 
                    value={createOrder.address} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Calle' 
                    mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3}
                    isInvalid={errorCreateOrder.address} />
                <Input 
                    name='max_delivery_date' onChange={handleChange} 
                    value={createOrder.max_delivery_date} fontSize={"14px"} 
                    width={isGreaterThanMd ? "312px" : "100%"} 
                    height={"48px"} placeholder='Fecha máxima de entrega'
                    isInvalid={errorCreateOrder.max_delivery_date} />
            </Flex>
            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mt={10} mb={3} zIndex={1}>
                <Flex flexDirection={"column"} justifyContent={"center"}>
                    <Text mb={2} fontFamily={"Montserrat, sans-serif"} fontSize={"14px"} fontWeight={500}>Anexe su logotipo Max. 20 Mb (Logotipo en formato .ai, .cdr o PDF)</Text>
                    <Input name='logo' type='file' accept='.ai, .cdr, .pdf' onChange={handleChangeFile} value={createOrder.logo} pl={0} border={"transparent"} placeholder='Seleccionar archivo' />
                </Flex>
                <Flex display={showPreview ? "flex" : "none"}>
                    <Button onClick={onOpen} type='button' fontWeight={500} fontSize={"14px"} color={"accent.500"} border={"1px solid"} borderColor={"accent.500"} variant='outline'>Ver previsualización de impresión</Button>
                </Flex>
            </Flex>
            <Flex zIndex={1}>
                <Textarea 
                    name='comments' onChange={handleChange} 
                    value={createOrder.comments} fontSize={"14px"} 
                    placeholder='Indicaciones o dudas'
                    isInvalid={errorCreateOrder.comments} />
            </Flex>
            {isOpen ?
                <ModalPrintImage 
                    isOpen={isOpen}
                    onClose={onClose}
                    category={categoryPrintImg}
                    product={productsStore[0]?.productsPreview[0]?.images?.images_item[0]} />
                : null
            }
        </Flex>
    );
}
 
export default Step1;