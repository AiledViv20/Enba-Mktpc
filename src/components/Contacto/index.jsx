import React, { useEffect, useState } from 'react';
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

const Contacto = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const images = [
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/contacto.svg' },
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/animacion6.svg' }
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

    useEffect(() => {
        const observerL = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-contacto');
          } else {
            entry.target.classList.remove('show-contacto');
          }
        })
        })
          
        const hiddenElementsL = document.querySelectorAll('.hidden-left-contacto');
        hiddenElementsL.forEach((el) => observerL.observe(el));
          
        const observerR = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show-contacto');
            } else {
              entry.target.classList.remove('show-contacto');
            }
          })
        })
          
        const hiddenElementsR = document.querySelectorAll('.hidden-right-contacto');
        hiddenElementsR.forEach((el) => observerR.observe(el));
    }, []);

    return ( 
        <div className='sections-contacto'>
            <div className='hidden-left-contacto'>
                <div className='wrapper-img-contacto'>
                <img id='animacion6' src={images[1].imageUrl} width="150" height="250" alt='icon scroll'/>
                </div>
            </div>
            <div className='hidden-right-contacto'>
                <Flex
                    flexDirection={"column"}
                    color={"#545454"}
                    mb={20}
                >
                    <Grid
                        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
                        px={isGreaterThanMd ? 0 : 8}
                        w={isGreaterThanMd ? "80%" : "90%"}
                        margin="auto"
                        pb={10}
                        height={"30rem"}
                        gap="3em 1em"
                        fontWeight={600}
                    >
                        <GridItem w="100%">
                            <Flex height={"100%"} justifyContent={"center"} alignItems={"center"}>
                                <Image src={images[0].imageUrl} width="500" height="500" alt='icon'/>
                            </Flex>
                        </GridItem>
                        <GridItem w="100%">
                            <Flex flexDirection={"column"} pl={10}>
                                <Text
                                    fontSize={{ base: "xl", md: "42px", lg: "42px" }}
                                    fontWeight={300}
                                    textTransform={"uppercase"}
                                >
                                    Centro de Zapopan
                                </Text>
                                <Text
                                    fontSize="20px"
                                    fontWeight={300}
                                    mt={5}
                                    textAlign={{ base: "center", lg: "left" }}
                                >
                                    Si te interesa conocer más, déjanos tus datos y uno de nuestros asesores se pondrá en contacto contigo a la brevedad posible.
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
                        </GridItem>
                    </Grid>
                </Flex>
            </div>
        </div>   
     );
}
 
export default Contacto;