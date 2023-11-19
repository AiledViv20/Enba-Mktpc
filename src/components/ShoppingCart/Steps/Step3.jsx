import React, { useState } from 'react';
import { 
    Button,
    Flex,
    Text,
    Alert,
    AlertIcon,
    Input,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import '../styled.css';

import { usePostProofMutation } from '../../../hooks/enbaapi';
import { toast } from 'react-toastify';

const Step3 = ({ step3, nextStep, sendOrder }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [proofPayment, setProofPayment] = useState();

    const [postProof] = usePostProofMutation();
    const [isLoadingStep4, setIsLoadingStep4] = useState(false);

    const handleChangeFile = (e) => {
        setProofPayment(e.target.files[0]);
    }

    const handleSubmitCreateOrder = () => {
        setIsLoadingStep4(true);
        const folio = sendOrder.folio;
        const formData = new FormData();
        formData.append("files", proofPayment);
        postProof({folio, body: formData}).then(res => {
            toast.success("¡Tus orden de compra fue creada correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep4(false);
            nextStep();
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsLoadingStep4(false);
        })
    }

    return ( 
        <Flex w={"100%"} mt={10}  justifyContent={"center"} display={step3 ? "flex" : "none"} color={"#424242"}>
            <Flex flexDirection={"column"}>
                <Text mb={10} fontSize={"18px"} fontWeight={700}>Te hemos enviado una confirmación por correo</Text>
                <Text mt={5} fontSize={"16px"}><span className='info-trans'>Banco: </span>{"Banco mercantil del norte sa (Banorte sa)"}</Text>
                <Text mt={5} fontSize={"16px"}><span className='info-trans'>No. de cuenta: </span>0864865722</Text>
                <Text mt={5} fontSize={"16px"}><span className='info-trans'>Clabe: </span>072 320 008648645722 4</Text>
                <Text as={"b"} mt={10} fontSize={"16px"}>Cargar comprobante de pago:</Text>
                <Input 
                    name='proofPayment' type='file' 
                    onChange={handleChangeFile} mt={5}
                    border={"transparent"} accept="image/*, application/pdf" 
                    placeholder='' 
                    _hover={{
                        cursor: "pointer"
                    }}/>
                <Text mt={5} color={"#000"} fontSize={"16px"} lineHeight={1.2}>
                    <Text>Envíe el comprobante de pago al correo de</Text>
                    <Text as={"b"} fontSize={"18px"} textDecoration={"underline"}>marketplace@enba.mx</Text>
                    <Text>con el número de orden.</Text>
                </Text>
                <Flex justifyContent={"center"}>
                    <Button 
                        variant={"outline"} border={"1px solid #064A73"}
                        width={isGreaterThanMd ? "350px" : "100%"} height={"40px"} color={"accent.500"}
                        fontSize={"18px"} fontWeight={600} mt={5}
                        onClick={() => handleSubmitCreateOrder()}
                        isLoading={isLoadingStep4}>Siguiente</Button>
                </Flex>
                <Alert mt={20} status='info' width={isGreaterThanMd ? "max-content" : "100%"}>
                    <AlertIcon />
                    A partir de este momento cuentas con 14 días naturales/10 días hábiles<br />para realizar el pago, de lo contrario el pedido se cancelará.
                </Alert>
            </Flex>     
        </Flex>
    );
}

export default Step3;
