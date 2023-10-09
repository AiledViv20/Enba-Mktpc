import React, { useState } from 'react';
import {
    Flex,
    Text,
    Input,
    Button,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';

import { usePostCreateInvoiceMutation } from '../../../hooks/enbaapi';
import { toast } from 'react-toastify';

const ElectronicBill = ({ step5, sendOrder }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [postCreateInvoice] = usePostCreateInvoiceMutation();
    const [isLoadingStep3, setIsLoadingStep3] = useState(false);

    const [createInvoice, setCreateInvoice] = useState({
        order_number: sendOrder.folio,
        business_name: "",
        RFC: "",
        CFDI_use: "",
        tax_regime: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        external_number: "",
        internal_number: ""
    });

    const handleChange = (e) => {
        setCreateInvoice({
            ...createInvoice,
            [e.target.name]: e.target.value
        })
    }

    const validateData = () => {
        if (createInvoice.order_number === "" || createInvoice.business_name === "" || createInvoice.RFC === "" || 
        createInvoice.CFDI_use === "" || createInvoice.tax_regime === "" || createInvoice.street === "" || 
        createInvoice.city === "" || createInvoice.state === "" || createInvoice.postal_code === "" || 
        createInvoice.external_number === "" || createInvoice.internal_number === "") {
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        setIsLoadingStep3(true);
        let invoice = {
            user: {
                order_number: sendOrder.folio,
                business_name: createInvoice.business_name,
                RFC: createInvoice.RFC,
                CFDI_use: createInvoice.CFDI_use,
                tax_regime: createInvoice.tax_regime,
                location: {
                    street: createInvoice.street,
                    city: createInvoice.city,
                    state: createInvoice.state,
                    postal_code: createInvoice.postal_code,
                    external_number: createInvoice.external_number,
                    internal_number: createInvoice.internal_number
                }
            },
            folio: sendOrder.folio
        }
        postCreateInvoice(invoice).then(res => {
            toast.success("¡Tus datos para facturar han sido eviados correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep3(false);
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep3(false);
        })
    }

    return ( 
        <Flex mt={10} flexDirection={"column"} display={step5 ? "flex" : "none"}>
            <Flex fontSize={"16px"} flexDirection={"column"}>
                <Text mb={10} as={"b"}>Te hemos enviado una confirmación por correo</Text>
                <Text mb={5} as={"b"}>{"Factura electronica (CFDI)"}</Text>
                <Text mb={5}>Solicita tu factura electrónica (CFDI)</Text>
            </Flex>
            <Flex flexDirection={"column"}>
                <Flex mb={3} zIndex={1}>
                    <Input name='order_number' value={sendOrder.folio} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "53%"} height={"48px"} placeholder='No. de pedido' mr={isGreaterThanMd ? 5 : 2} isDisabled/>
                    <Input name='business_name' onChange={handleChange} value={createInvoice.business_name} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "53%"} height={"48px"} placeholder='Razón social' />
                </Flex>
                <Flex mb={3} zIndex={1}>
                    <Input name='RFC' onChange={handleChange} value={createInvoice.RFC} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "53%"} height={"48px"} placeholder='RFC' mr={isGreaterThanMd ? 5 : 2} />
                    <Input name='CFDI_use' onChange={handleChange} value={createInvoice.CFDI_use} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "53%"} height={"48px"} placeholder='Uso de CFDI' />
                </Flex>
                <Flex mb={3} zIndex={1}>
                    <Input name='tax_regime' onChange={handleChange} value={createInvoice.tax_regime} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "100%"} height={"48px"} placeholder='Regimen fiscal' mr={isGreaterThanMd ? 5 : 0} />
                </Flex>
                <Flex mb={3} zIndex={1}>
                    <Input name='street' onChange={handleChange} value={createInvoice.street} fontSize={"14px"} width={"100%"} height={"48px"} placeholder='Calle' />
                </Flex>
                <Flex mb={3} zIndex={1}>
                    <Input name='state' onChange={handleChange} value={createInvoice.state} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "100%"} height={"48px"} placeholder='Estado' mr={isGreaterThanMd ? 5 : 2} />
                    <Input name='city' onChange={handleChange} value={createInvoice.city} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "100%"} height={"48px"} placeholder='Municipio' />
                </Flex>
                <Flex mb={3} zIndex={1} flexDirection={isGreaterThanMd ? "row" : "column"}>
                    <Input name='postal_code' onChange={handleChange} value={createInvoice.postal_code} fontSize={"14px"} width={isGreaterThanMd ? "312px" : "100%"} height={"48px"} placeholder='Código postal' mr={isGreaterThanMd ? 5 : 0} />
                    <Input mt={isGreaterThanMd ? 0 : 3} name='internal_number' onChange={handleChange} value={createInvoice.internal_number} fontSize={"14px"} width={isGreaterThanMd ? "152px" : "100%"} height={"48px"} placeholder='No. Interior' mr={isGreaterThanMd ? 2 : 0} />
                    <Input mt={isGreaterThanMd ? 0 : 3} name='external_number' onChange={handleChange} value={createInvoice.external_number} fontSize={"14px"} width={isGreaterThanMd ? "152px" : "100%"} height={"48px"} placeholder='No. Exterior' />
                </Flex>
                <Flex mt={10} justifyContent={"center"} zIndex={1}>
                    <Button 
                        _hover={{ bg: "#063D5F"}} w={"100%"} 
                        fontWeight={500} fontSize={"20px"}
                        onClick={() => handleSubmit()}
                        isDisabled={validateData()}
                        isLoading={isLoadingStep3}>Solicitar factura</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default ElectronicBill;