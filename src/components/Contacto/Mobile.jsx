import React, { useState } from 'react';
import { 
    Flex,
    useMediaQuery, 
    useTheme,
    Grid,
    GridItem,
    Image,
    Text,
    Input,
    Checkbox, 
    Button,
    Link
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import './animation.css';

const ContactoMobile = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const images = [
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/contacto.svg' }
    ];

    const postForm = () => {
        let data_send = {
            fields: [
              {
                name: "firstname",
                value: name,
              },
              {
                name: "lastname",
                value: lastName,
              },
              {
                name: "email",
                value: email,
              },
              {
                name: "phone",
                value: phone,
              },
            ],
            context: {
              ipAddress: "3.14.97.137",
              pageUri: "www.grupoguia.mx",
              pageName: "Grupo Guia | Torre MM",
            },
          };
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data_send),
          };
          fetch(
            "https://api.hsforms.com/submissions/v3/integration/submit/5930840/0f89c480-10be-4d00-a260-5e047f7ad065",
            // "03479824-13fb-4023-a9c1-a35a76088498",
            requestOptions
          )
        .then((response) => response.json())
        .then((data_w) => {
            toast.success("¡Tus datos fueron eviados correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setName("");
            setLastName("");
            setEmail("");
            setPhone("");
        });
    }

    return ( 
        <Flex
            flexDirection={"column"}
            color={"#545454"}
            mb={5}
        >
            <Flex height={"100%"} justifyContent={"center"} alignItems={"center"}>
                <Image src={images[0].imageUrl} width="400" height="400" alt='icon'/>
            </Flex>
            <Flex textAlign={"center"} flexDirection={"column"} alignItems={"center"} mt={10}>
                <Text
                    fontSize={"32px"}
                    fontWeight={700}
                    textTransform={"uppercase"}
                    width={"100%"}
                >
                    Centro de Zapopan
                </Text>
                <Text
                    fontSize="20px"
                    fontWeight={300}
                    mt={5}
                    textAlign={{ base: "center", lg: "left" }}
                >
                    Si te interesa conocer más, déjanos tus datos<br />y uno de nuestros asesores se pondrá en contacto contigo a la brevedad posible.
                </Text>
                <Flex justifyContent={"center"} id="contacto" mt={10}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        postForm();
                        }}>
                        <Grid templateColumns={"repeat(2, 1fr)"} w='100%' maxW={'5xl'} mx='auto' gap={10}>
                            <GridItem colSpan={2}>
                                <Input 
                                    variant='flushed' 
                                    placeholder='Nombre*' 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    isRequired
                                />
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Input 
                                    variant='flushed'
                                    placeholder='Apellido*'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} 
                                    isRequired
                                    />
                            </GridItem>
                            <GridItem colSpan={isGreaterThanMd?1:2}>
                                <Input 
                                    variant='flushed' 
                                    type='number' 
                                    placeholder='Número de teléfono*' 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    isRequired
                                />
                            </GridItem>
                            <GridItem colSpan={isGreaterThanMd?1:2}>
                                <Input 
                                    variant='flushed' 
                                    type='email' 
                                    placeholder='Correo*' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired
                                />
                            </GridItem>
                            <GridItem colSpan={2} textAlign={'center'} mt={4}>
                                <Checkbox>
                                    <Text>
                                        He leído y acepto el 
                                        <Link href='https://grupoguia.mx/Aviso-de-privacidad' color='blue' textDecoration={'underline'} ml={2} isExternal>
                                            Aviso de privacidad
                                        </Link>
                                    </Text>
                                </Checkbox>
                            </GridItem>

                            <GridItem colSpan={2} textAlign={'center'} mt={4}>
                                <Button type='submit' border={"2px solid #C80A7F"} color={"#C80A7F"} bg={"#FFF"} 
                                    px={8} rounded={'none'}
                                    _hover={{ bg: "#C80A7F", color: "#FFF" }}>
                                    Enviar
                                </Button>
                            </GridItem>
                        </Grid>
                    </form>
                </Flex>
            </Flex>
        </Flex>  
     );
}
 
export default ContactoMobile;