import React, { useState } from 'react';
import { 
    Flex,
    Box,
    Text,
    Input,
    Textarea,
    Button,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import Footer from '../../components/Footer';
import { usePostQuotationMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';

const Cotizar = ({ props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
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
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={20} position="relative">
                <Flex pt={isGreaterThanMd ? 10 : 5} justifyContent={"center"}>
                    <Text fontSize={"26px"} as={"b"}>Cotizar</Text>
                </Flex>
                <Flex w="100%" justifyContent={"center"} pt={isGreaterThanMd ? 10 : 5}>
                    <form
                        style={{ width: isGreaterThanMd ? "70%" : "100%" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        <Flex w={"100%"} flexDirection={"column"} mt={5}>
                            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={4} justifyContent={"center"} zIndex={1}>
                                <Input name='firstname' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Nombre(s)' mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3} />
                                <Input name='email' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Email' />
                            </Flex>
                            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={4} justifyContent={"center"} zIndex={1}>
                                <Input name='phone' type='number' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Teléfono' mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3} />
                                <Input name='cp' type='number' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Código postal' />
                            </Flex>
                            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={5} justifyContent={"center"} zIndex={1}>
                                <Input name='numberOfPieces' type='number' onChange={handleChange} fontSize={"14px"} w={isGreaterThanMd ? "756px" : "100%"} height={"56px"} placeholder='Cant. No de piezas' />
                            </Flex>
                            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={2} justifyContent={"center"}>
                                <Flex w={"366px"}>
                                    <Text fontSize={"14px"} fontWeight={400}>Anexe su logotipo Max. 20 Mb</Text>
                                </Flex>
                                <Flex w={"366px"}></Flex>
                            </Flex>
                            <Flex mb={4} justifyContent={"center"} zIndex={1}>
                                <Input name='img' type='file' accept='.svg, .eps, .pdf' onChange={handleChangeFile} border={"transparent"} width={"366px"} pl={0}/>
                                <Flex w={"366px"}></Flex>
                            </Flex>
                            <Flex mb={10} justifyContent={"center"} zIndex={1}>
                                <Textarea name='message' onChange={handleChange} w={isGreaterThanMd ? "756px" : "100%"} height={"180px"} fontSize={"14px"} placeholder='Indicaciones o dudas' />
                            </Flex>
                            <Flex justifyContent={"center"} zIndex={1}>
                                <Button type='submit' _hover={{ bg: "#063D5F"}} w={"174px"} fontWeight={500} fontSize={"14px"}
                                    isDisabled = {values.firstname === "" || values.email === "" || values.phone === "" || values.cp === "" || values.numberOfPieces === ""}
                                    isLoading={isLoading}>
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