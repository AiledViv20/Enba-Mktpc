import React, { useState } from 'react';
import { 
    Flex,
    Box,
    Text,
    Input,
    Textarea,
    Button
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { usePostQuotationMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';

const Cotizar = ({ props }) => {
    const [values, setValues] = useState({
        firstname: "",
        email: "",
        phone: "",
        cp: "",
        numberOfPieces: "",
        message: "",
        titleImg: "",
    });
    const [img, setImg] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [postQuotation] = usePostQuotationMutation();

    const handleChangeFile = (e) => {
        setImg(e.target.files[0]);
        setValues({
            ...values,
            titleImg: e.target.files[0].name
        })
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("quantity", values.numberOfPieces);
        formData.append("comments", values.message);
        formData.append("name", values.firstname);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("postal_code", values.cp);
        formData.append("files", img);
        postQuotation({body: formData}).then(res => {
            toast.success("¡Tus datos fueron eviados correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setValues({
                firstname: "",
                email: "",
                phone: "",
                cp: "",
                numberOfPieces: "",
                message: "",
                titleImg: "",
            })
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsLoading(false);
        })
    }

    return (
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={20} position="relative">
                <Flex pt={10} justifyContent={"center"}>
                    <Text fontSize={"26px"} as={"b"}>Cotizar</Text>
                </Flex>
                <Flex w="100%" justifyContent={"center"} pt={10}>
                    <form
                        style={{ width: "70%" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        <Flex w={"100%"} flexDirection={"column"} mt={5}>
                            <Flex mb={4} justifyContent={"center"}>
                                <Input name='firstname' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Nombre(s)' mr={5} />
                                <Input name='email' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Email' />
                            </Flex>
                            <Flex mb={4} justifyContent={"center"}>
                                <Input name='phone' type='number' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Teléfono' mr={5} />
                                <Input name='cp' type='number' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Código postal' />
                            </Flex>
                            <Flex mb={5} justifyContent={"center"}>
                                <Input name='numberOfPieces' type='number' onChange={handleChange} fontSize={"14px"} width={"756px"} height={"56px"} placeholder='Cant. No de piezas' />
                            </Flex>
                            <Flex mb={2} justifyContent={"center"}>
                                <Flex w={"366px"}>
                                    <Text fontSize={"14px"} fontWeight={400}>Anexe su logotipo Max. 20 Mb</Text>
                                </Flex>
                                <Flex w={"366px"}></Flex>
                            </Flex>
                            <Flex mb={4} justifyContent={"center"}>
                                <Input name='img' type='file' onChange={handleChangeFile} border={"transparent"} width={"366px"} pl={0}/>
                                <Flex w={"366px"}></Flex>
                            </Flex>
                            <Flex mb={10} justifyContent={"center"}>
                                <Textarea name='message' onChange={handleChange} w={"756px"} height={"180px"} fontSize={"14px"} placeholder='Indicaciones o dudas' />
                            </Flex>
                            <Flex justifyContent={"center"}>
                                <Button type='submit' _hover={{ bg: "#063D5F"}} w={"174px"} fontWeight={500} fontSize={"14px"}
                                    isDisabled = {values.firstname === "" || values.email === "" || values.phone === "" || values.cp === "" || values.numberOfPieces === ""}
                                    isLoading={isLoading}
                                >
                                    Enviar
                                </Button>
                            </Flex>
                        </Flex>
                    </form>
                </Flex>
            </Box>
            <Footer />
        </>
    );
}
 
export default Cotizar;