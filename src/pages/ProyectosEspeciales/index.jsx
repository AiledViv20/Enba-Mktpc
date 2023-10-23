import React, { useState, useEffect } from 'react';
import { 
    Flex,
    Box,
    Text,
    Input,
    Textarea,
    Button,
    useDisclosure,
    Grid, 
    GridItem
} from '@chakra-ui/react';
import Footer from '../../components/Footer';

import { MarkDownSection } from '../../components/Section';

import img1 from '../../assets/images/banner/proyectosesp/img1.png';
import img2 from '../../assets/images/banner/proyectosesp/img2.png';
import img3 from '../../assets/images/banner/proyectosesp/img3.png';
import img4 from '../../assets/images/banner/proyectosesp/img4.png';
import img5 from '../../assets/images/banner/proyectosesp/img5.png';

import { usePostLeadMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';
import Gallery from '../../components/Gallery';

const ProyectosEspeciales = ({ props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [values, setValues] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
        channel: "Formulario Proyectos Especiales"
    });
    const [postLead] = usePostLeadMutation();
    const [selectGallery, setSelectGallery] = useState(0);

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
            description: `Para este proyecto en Enba, nos enorgullece haber<br />trabajado en colaboración con Mobil para llevar a cabo<br />una campaña promocional en el GP de México.`
        },
        {
            key: "hero2",
            imageUrl: img2,
            title: "SCRIBE",
            description: `Estamos encantados de haber colaborado con la<br />marca Scribe en la creación de una campaña<br />promocional para su evento anual de 60 aniversario.`
        },
        {
            key: "hero3",
            imageUrl: img3,
            title: "TORNEO DE TENIS ATP ACAPULCO",
            description: `Colaboramos en el Torneo Abierto de Tenis de Acapulco<br />año con año con diferentes patrocinadores como Telcel,<br />Samsung y Oppo.`
        },
        {
            key: "hero4",
            imageUrl: img4,
            title: "RENATOS TELCEL EN NAVIDAD",
            description: `Cada año, en la temporada navideña, tenemos el gusto de<br />colaborar con Telcel en el desarrollo de conceptos y<br />propuestas de diferentes peluches temáticos, mismos que<br />se convierten en regalos especiales que se entregan<br />durante esta época del año.`
        },
        {
            key: "hero5",
            imageUrl: img5,
            title: "Snowball para bayer",
            description: `En una colaboración especial con la farmacéutica Bayer,<br />desarrollamos un proyecto único que consistió en crear<br />"snowballs" incluyendo elementos flotantes de los<br />medicamentos de sus marcas más icónicas.`
        }
    ];

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

    return ( 
        <>
            <Flex pt={10} justifyContent={"center"} mb={10} color={"accent.500"}>
                <Text fontSize={"34px"} as={"b"}>Proyectos Especiales</Text>
            </Flex>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[0].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[0].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(0); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[0].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"end"}>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[1].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[1].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[1].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(1); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[2].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[2].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(2); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[2].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"end"}>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[3].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[3].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[3].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(3); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[4].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[4].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(4); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[4].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Flex pt={10} justifyContent={"center"} mb={2} color={"#000"}>
                <Text fontSize={"26px"} fontWeight={500}>Compártenos tu idea y lo hacemos realidad</Text>
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
                            <Flex mb={3} justifyContent={"center"} zIndex={1}>
                                <Input name='name' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Nombre(s)' mr={5} />
                                <Input name='last_name' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Apellido' />
                            </Flex>
                            <Flex mb={3} justifyContent={"center"} zIndex={1}>
                                <Input name='email' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Email' mr={5} />
                                <Input name='phone' type='number' onChange={handleChange} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Teléfono' />
                            </Flex>
                            <Flex mb={10} justifyContent={"center"} zIndex={1}>
                                <Textarea name='message' onChange={handleChange} w={"756px"} height={"180px"} fontSize={"14px"} placeholder='Mensaje' />
                            </Flex>
                            <Flex justifyContent={"center"} zIndex={1}>
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
            {isOpen ?
                <Gallery
                    isOpen={isOpen}
                    onClose={onClose}
                    selectGallery={selectGallery} />
            : null}
            <Footer />
        </>
    );
}
 
export default ProyectosEspeciales;