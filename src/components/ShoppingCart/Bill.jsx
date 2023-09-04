import React from 'react';
import {
    Flex,
    Text,
    Input,
    Button
} from '@chakra-ui/react';

const Bill = ({ step3 }) => {

    return ( 
        <Flex mt={10} flexDirection={"column"} display={step3 ? "flex" : "none"}>
            <Flex fontSize={"16px"} flexDirection={"column"}>
                <Text mb={10} as={"b"}>Te hemos enviado una confirmación por correo</Text>
                <Text mb={5} as={"b"}>{"Factura electronica (CFDI)"}</Text>
                <Text mb={5}>Solicita tu factura electrónica (CFDI)</Text>
            </Flex>
            <Flex flexDirection={"column"}>
                <Flex mb={3} zIndex={1}>
                    <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='No. de pedido' mr={5} />
                    <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Razón social' />
                </Flex>
                <Flex mb={3} zIndex={1}>
                    <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='RFC' mr={5} />
                    <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Uso de CFDI' />
                </Flex>
                <Flex mb={3} zIndex={1}>
                    <Input fontSize={"14px"} width={"312px"} height={"48px"} placeholder='Regimen fiscal' mr={5} />
                </Flex>
                <Flex mb={3} zIndex={1}>
                    <Input fontSize={"14px"} width={"100%"} height={"48px"} placeholder='Calle' />
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
                <Flex mt={10} justifyContent={"center"} zIndex={1}>
                    <Button _hover={{ bg: "#063D5F"}} w={"100%"} fontWeight={500} fontSize={"20px"}>Solicitar factura</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default Bill;