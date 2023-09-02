import React, { useState, useEffect } from 'react';
import { 
    Flex,
    Box,
    Text,
    Input,
    Textarea,
    Button,
    IconButton
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

import { Carousel } from '../../components/Carousel/Carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { MarkDownSection } from '../../components/Section';

import img1 from '../../assets/images/banner/proyectosesp/img1.png';
import img2 from '../../assets/images/banner/proyectosesp/img2.png';
import img3 from '../../assets/images/banner/proyectosesp/img3.png';
import img4 from '../../assets/images/banner/proyectosesp/img4.png';

import { usePostLeadMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';

const ProyectosEspeciales = ({ props }) => {
    const [current, setCurrent] = useState(0);
    const [dotClicked, setDotClicked] = useState(false);
    const [values, setValues] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
        channel: "Formulario Proyectos Especiales"
    });
    const [postLead] = usePostLeadMutation();

    const [screenSize, getDimension] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    });
    
    const setDimensions = () => {
        getDimension({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        });
    };

    const slides = [
        {
            key: "hero1",
            imageUrl: img1,
            title: "F1 GP MÉXICO",
            description: `Para este proyecto en Enba, nos enorgullece haber trabajado en colaboración<br />con Mobil para llevar a cabo una campaña promocional en el GP de México.`
        },
        {
            key: "hero2",
            imageUrl: img2,
            title: "SCRIBE",
            description: `Estamos encantados de haber colaborado con la marca Scribe en la creación<br />de una campaña promocional para su evento anual de 60 aniversario.`
        },
        {
            key: "hero3",
            imageUrl: img3,
            title: "TORNEO DE TENIS ATP ACAPULCO",
            description: `Estamos encantados de haber colaborado con la marca Scribe en la creación<br />de una campaña promocional para su evento anual de 60 aniversario.`
        },
        {
            key: "hero4",
            imageUrl: img4,
            title: "RENATOS TELCEL EN NAVIDAD",
            description: `Estamos encantados de haber colaborado con la marca Scribe en la creación<br />de una campaña promocional para su evento anual de 60 aniversario. `
        },
        {
            key: "hero5",
            imageUrl: img4,
            title: "PROYECTO ESPECIAL PARA BAYER",
            description: `En una colaboración especial con la farmacéutica Bayer, desarrollamos un proyecto único que consistió en<br />crear "snowballs" incluyendo elementos flotantes de los medicamentos de sus marcas más icónicas.`
        }
    ];

    useEffect(() => {
        if (!dotClicked) {
          const intervalId = setInterval(() => {
            if (current === slides.length-1) {
              setCurrent(0);
            } else {
              setCurrent(current + 1);
            }
          }, 5000);
        
          return () => clearInterval(intervalId);
        }
    }, [dotClicked, current, slides.length]);

    useEffect(() => {
        window.addEventListener("resize", setDimensions);
    
        return () => {
            window.removeEventListener("resize", setDimensions);
        };
    }, [screenSize]);

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

    const changeBanner = (num) => {
        if (num > 2) {
            setCurrent(0);
        } else if (num < 0) {
            setCurrent(2);
        }
         else {
            setCurrent(num);
        }
    }

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
            <Flex pt={10} justifyContent={"center"} mb={10} color={"accent.500"}>
                <Text fontSize={"34px"} as={"b"}>Proyectos Especiales</Text>
            </Flex>
            <Box w="full" mx="auto" maxW="3x1" {...props} position="relative">
                <Carousel current={current}>
                    { slides.map((slide, idx) => (
                        <Flex
                            w="100%"
                            h="570px"
                            key={idx}
                            id="fondo"
                            backgroundImage={`url(${slide.imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat"
                            backgroundColor="gray.100"
                            position="relative"
                            p="0"
                            color={"#FFFFFF"}>
                            <Flex height='100%' w='100%' backgroundColor={"#0000004e"}></Flex>
                            <Flex
                                height="100vh"
                                width={"100%"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                position="absolute">
                                <Flex flexDirection="column" alignItems={"center"}>
                                    <Text mb={5} textAlign={"center"} fontWeight={600} fontSize={'28px'}>
                                        {slide.title}
                                    </Text>
                                    <Text mb={10} lineHeight={1.2} textAlign={"center"} fontWeight={400} fontSize={'18px'}>
                                        <MarkDownSection>{slide.description}</MarkDownSection>
                                    </Text>
                                    <Button w={"280px"} h={"44px"} _hover={{ bg: "#F8F8F8" }} bg={"#FFF"} color={"accent.500"} fontSize={"14px"} fontWeight={500}>
                                        Ver mas
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                </Carousel>
                <Flex
                    justifyContent="flex-start"
                    alignItems="center"
                    position="absolute"
                    pl={"6%"}
                    top={"50%"}
                    w="100%"
                    left="0"
                    right="0"
                >
                    <IconButton
                        icon={<ChevronLeftIcon color={"#919292"} />}
                        rounded="full"
                        border="0"
                        colorScheme="brand"
                        shadow="md"
                        transitionDuration=".3s"
                        _hover={{ shadow: "lg" }}
                        onClick={() => changeBanner(current - 1)}
                        position="relative"
                        right={{ base: "-6", md: 0 }}
                        bg="#FFF"
                        zIndex="2"
                    />
                </Flex>
                <Flex
                    justifyContent="flex-end"
                    alignItems="center"
                    position="absolute"
                    pr={"6%"}
                    top={"50%"}
                    w="100%"
                    left="0"
                    right="0"
                >
                    <IconButton
                        icon={<ChevronRightIcon color={"#919292"} />}
                        rounded="full"
                        border="0"
                        colorScheme="brand"
                        shadow="md"
                        transitionDuration=".3s"
                        _hover={{ shadow: "lg" }}
                        onClick={() => changeBanner(current + 1)}
                        position="relative"
                        right={{ base: "-6", md: 0 }}
                        bg="#FFF"
                        zIndex="2"
                    />
                </Flex>
            </Box>
            <Flex pt={10} justifyContent={"center"} mb={2} color={"#000"}>
                <Text fontSize={"26px"} fontWeight={500}>Aquí estará tu proyecto</Text>
            </Flex>
            <Flex justifyContent={"center"} mb={5} color={"#000"}>
                <Text fontSize={"18px"} fontWeight={400}>Envíanos un mensaje</Text>
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={20} position="relative">
                <Flex w="100%" justifyContent={"center"}>
                    <form
                        style={{ width: "70%" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        <Flex w={"100%"} flexDirection={"column"}>
                            <Flex mb={3} justifyContent={"center"}>
                                <Input name='name' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Nombre(s)' mr={5} />
                                <Input name='last_name' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Apellido' />
                            </Flex>
                            <Flex mb={3} justifyContent={"center"}>
                                <Input name='email' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Email' mr={5} />
                                <Input name='phone' type='number' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Teléfono' />
                            </Flex>
                            <Flex mb={10} justifyContent={"center"}>
                                <Textarea name='message' onChange={handleChange} w={"756px"} height={"180px"} fontSize={"14px"} placeholder='Mensaje' />
                            </Flex>
                            <Flex justifyContent={"center"}>
                                <Button type='submit' _hover={{ bg: "#063D5F"}} w={"174px"} fontWeight={500} fontSize={"14px"}
                                    isDisabled = {values.name === "" || values.last_name === "" || values.email === "" || values.phone === ""}
                                >
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
 
export default ProyectosEspeciales;