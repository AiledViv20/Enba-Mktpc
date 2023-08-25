import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack, 
    Text,
    Image,
    VStack,
    FormControl,
    Input,
    InputGroup,
    InputLeftAddon,
    Spinner
} from '@chakra-ui/react';
import { handleDownload } from '../resource';
import brochure from '../resource/pdf/CentroZapopan_Brochure_Digital.pdf';

const ModalCard = ({ isOpen, onClose, title, thankyoupage, idForm }) => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        nombreError: false,
        apellidoError: false,
        telefonoError: "",
        emailError: false,
    });

    const icons = [
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/soare/icons/logo_guia.webp' },
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/soare/icons/mexico.svg' }
    ];

    const handleSubmit = () => {
        setLoading(true);
        const valuesForm = [
            {
                name: "firstname",
                value: values.nombre,
            },
            {
                name: "lastname",
                value: values.apellidos,
            },
            {
                name: "email",
                value: values.email,
            },
            {
                name: "phone",
                value: values.telefono,
            }
        ];
        const body = {
            fields: valuesForm,
            context: {
                ipAddress: "3.14.97.137",
                pageUri: "www.grupoguia.mx/contacto",
                pageName: "Grupo Guia | Contacto",
            },
        };
        fetch(
            "https://api.hsforms.com/submissions/v3/integration/submit/5930840/" + idForm,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            }
            ).then((response) => {
                if (title === "Descargar Brochure" || title === "Descarga el Brochure") {
                    handleDownload(brochure, "Centro_Zapopan_Brochure_Digital.pdf");
                }
                setTimeout(() => {
                    window.location.href = `https://grupoguia.mx/desarrollos/${thankyoupage}`;
                    setLoading(false);
                }, 1000);
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader display={"flex"} justifyContent={"center"} paddingBottom={"0px"}>
                    <Image src={icons[0].imageUrl} w={24} />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack textAlign={"center"} alignItems="center">
                        <Text fontSize={"xl"} fontWeight={600}>
                            {title}
                        </Text>
                    </Stack>
                    <VStack
                        borderRadius="lg"
                        margin="auto"
                        maxW={"100%"}
                        py={12}
                    >
                        <form
                            style={{width: '80%'}}
                            onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                            }}>
                            <FormControl mb={3}>
                                <Input
                                    onInvalid={() => setValues({...values, nombreError: true})}
                                    rounded="full"
                                    placeholder="Nombre(s)"
                                    marginBottom="10px"
                                    id="nombres"
                                    type="text"
                                    py={5}
                                    value={values.nombre}
                                    isRequired
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setValues({...values, nombre: e.target.value});
                                    }}
                                    onBlur={(e) => {
                                        e.preventDefault();
                                        setValues({...values, nombre: e.target.value});
                                    }}
                                />
                            </FormControl>
                            <FormControl mb={3}>
                                <Input
                                    onInvalid={() => setValues({...values, apellidoError: true})}
                                    rounded="full"
                                    placeholder="Apellidos"
                                    marginBottom="10px"
                                    value={values.apellidos}
                                    id="apellidos"
                                    type="text"
                                    py={5}
                                    isRequired
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setValues({...values, apellidos: e.target.value});
                                    }}
                                    onBlur={(e) => {
                                        e.preventDefault();
                                        setValues({...values, apellidos: e.target.value});
                                    }}
                                />
                            </FormControl>
                            <FormControl mb={3}>
                                <InputGroup marginBottom="20px">
                                    <InputLeftAddon
                                        backgroundColor="#FFFFFF"
                                        rounded="full"
                                        padding="15px 6px 15px 15px"
                                        py={5}
                                        // eslint-disable-next-line jsx-a11y/alt-text
                                        children={
                                            <img src={icons[1].imageUrl} alt='icon' width="16" height="16" />
                                        }
                                        />
                                    <InputLeftAddon
                                        backgroundColor="#FFFFFF"
                                        borderLeftColor="#FFFFFF"
                                        borderRadius="0px"
                                        padding="0px"
                                        children="+52"
                                        paddingRight="10px"
                                        py={5}
                                        />
                                    <Input
                                        onInvalid={() => setValues({...values, telefonoError: true})}
                                        borderRadius="24px"
                                        placeholder="Teléfono"
                                        type="number"
                                        id="telefono"
                                        py={5}
                                        value={values.telefono}
                                        isRequired
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setValues({...values, telefono: e.target.value});
                                        }}
                                        onBlur={(e) => {
                                            e.preventDefault();
                                            setValues({...values, telefono: e.target.value});
                                        }}
                                        />
                                </InputGroup>
                            </FormControl>
                            <FormControl mb={3}>
                                <Input
                                    onInvalid={() => setValues({...values, emailError: true})}
                                    rounded="full"
                                    placeholder="Correo electrónico"
                                    marginBottom="10px"
                                    value={values.email}
                                    id="email"
                                    type="email"
                                    py={5}
                                    isRequired
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setValues({...values, email: e.target.value});
                                    }}
                                    onBlur={(e) => {
                                        e.preventDefault();
                                        setValues({...values, email: e.target.value});
                                    }}
                                />
                            </FormControl>
                            <Button
                                rounded="full"
                                w="100%"
                                fontWeight="500"
                                color="black"
                                borderColor="#FFCD00"
                                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                                _hover={{
                                    bg: "#EDBE00",
                                }}
                                type="submit"
                                >
                                {loading ?
                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='#fff'
                                        size='lg'
                                        />
                                    :
                                    <span>Enviar</span>
                                }
                            </Button>
                        </form>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
 
export default ModalCard;