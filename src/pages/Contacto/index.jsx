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
import banner from '../../assets/images/banner/banner-contactanos.png';
import { usePostLeadMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';

const Contacto = ({ props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [values, setValues] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
        chanel: "Formulario de contacto"
    });
    const [postLead] = usePostLeadMutation();

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        postLead(values).then(res => {
            toast.success("¡Tus datos fueron eviados correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setValues({
                name: "",
                last_name: "",
                email: "",
                phone: "",
                message: "",
                channel: "Formulario de contacto"
            })
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={20} position="relative">
                <Flex
                    width={"100%"} pt={5} pb={8}
                    justifyContent={"center"}>
                    <Flex flexDirection="column" alignItems={"center"}>
                        <Text color={"accent.500"} textAlign={"center"} fontWeight={700} fontSize={'39px'}>
                            Contáctanos
                        </Text>
                    </Flex>
                </Flex>
                <Flex
                    w="100%"
                    h="354px"
                    backgroundImage={`url(${banner})`}
                    backgroundSize="cover"
                    backgroundPosition="center center"
                    backgroundRepeat="no-repeat"
                    backgroundColor="gray.100"
                    position="relative"
                    p="0"
                    color={"#FFFFFF"}
                    borderRadius="20px">
                    <Flex borderRadius="20px" height='100%' w='100%' backgroundColor={"#0000004e"}></Flex>
                </Flex>
                <Flex w="100%" justifyContent={"center"} pt={isGreaterThanMd ? 20 : 10}>
                    <form
                        style={{ width: isGreaterThanMd ? "70%" : "100%" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        <Flex w={"100%"} flexDirection={"column"}>
                            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={3} justifyContent={"center"} zIndex={1}>
                                <Input name='name' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Nombre(s)' mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3} />
                                <Input name='last_name' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Apellido' />
                            </Flex>
                            <Flex flexDirection={isGreaterThanMd ? "row" : "column"} mb={3} justifyContent={"center"} zIndex={1}>
                                <Input name='email' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Email' mr={isGreaterThanMd ? 5 : 0} mb={isGreaterThanMd ? 0 : 3} />
                                <Input name='phone' type='number' onChange={handleChange} fontSize={"14px"} width={isGreaterThanMd ? "366px" : "100%"} height={"56px"} placeholder='Teléfono' />
                            </Flex>
                            <Flex mb={10} justifyContent={"center"} zIndex={1}>
                                <Textarea name='message' onChange={handleChange} w={isGreaterThanMd ? "756px" : "100%"} height={"180px"} fontSize={"14px"} placeholder='Mensaje' />
                            </Flex>
                            <Flex justifyContent={"center"} zIndex={1}>
                                <Button type='submit' _hover={{ bg: "#063D5F"}} w={"174px"} fontWeight={500} fontSize={"14px"}
                                    isDisabled = {values.name === "" || values.last_name === "" || values.email === "" || values.phone === ""}>
                                    Enviar mensaje
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
 
export default Contacto;