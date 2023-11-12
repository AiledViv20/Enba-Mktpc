import React, { useState } from 'react';
import { 
    Flex,
    Box,
    Text,
    Input,
    Textarea,
    Button,
    useDisclosure,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import Footer from '../../components/Footer';

import img1 from '../../assets/images/banner/proyectosesp/img1.png';
import img2 from '../../assets/images/banner/proyectosesp/img2.png';
import img3 from '../../assets/images/banner/proyectosesp/img3.png';
import img4 from '../../assets/images/banner/proyectosesp/img4.png';
import img5 from '../../assets/images/banner/proyectosesp/img5.png';

import { usePostLeadMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';
import Gallery from '../../components/Gallery';
import ProyectosEspecialesDskt from './ProyectosEspecialesDskt';
import ProyectosEspecialesDsktMb from './ProyectosEspecialesMb';

const ProyectosEspeciales = ({ props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
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

    const slides = [
        {
            key: "hero1",
            imageUrl: img1,
            title: "F1 GP MÉXICO",
            description: `Para este proyecto en Enba, nos enorgullece haber<br />trabajado en colaboración con Mobil para llevar a cabo<br />una campaña promocional en el GP de México.`,
            descriptionMb: `Para este proyecto en Enba, nos enorgullece<br />haber trabajado en colaboración con Mobil<br />para llevar a cabo una campaña promocional<br />en el GP de México.`
        },
        {
            key: "hero2",
            imageUrl: img2,
            title: "SCRIBE",
            description: `Estamos encantados de haber colaborado con la<br />marca Scribe en la creación de una campaña<br />promocional para su evento anual de 60 aniversario.`,
            descriptionMb: `Estamos encantados de haber colaborado<br />con la marca Scribe en la creación de una<br />campaña promocional para su evento<br />anual de 60 aniversario.`
        },
        {
            key: "hero3",
            imageUrl: img3,
            title: "TORNEO DE TENIS ATP ACAPULCO",
            description: `Colaboramos en el Torneo Abierto de Tenis de Acapulco<br />año con año con diferentes patrocinadores como Telcel,<br />Samsung y Oppo.`,
            descriptionMb: `Colaboramos en el Torneo Abierto de<br />Tenis de Acapulco año con año con<br />diferentes patrocinadores como<br />Telcel, Samsung y Oppo.`
        },
        {
            key: "hero4",
            imageUrl: img4,
            title: "RENATOS TELCEL EN NAVIDAD",
            description: `Cada año, en la temporada navideña, tenemos el gusto de<br />colaborar con Telcel en el desarrollo de conceptos y<br />propuestas de diferentes peluches temáticos, mismos que<br />se convierten en regalos especiales que se entregan<br />durante esta época del año.`,
            descriptionMb: `Cada año, en la temporada navideña,<br />tenemos el gusto de colaborar con<br />Telcel en el desarrollo de conceptos y<br />propuestas de diferentes peluches<br />temáticos, mismos que se convierten en<br />regalos especiales que se entregan<br />durante esta época del año.`
        },
        {
            key: "hero5",
            imageUrl: img5,
            title: "Snowball para bayer",
            description: `En una colaboración especial con la farmacéutica Bayer,<br />desarrollamos un proyecto único que consistió en crear<br />"snowballs" incluyendo elementos flotantes de los<br />medicamentos de sus marcas más icónicas.`,
            descriptionMb: `En una colaboración especial con la farmacéutica<br />Bayer, desarrollamos un proyecto único que<br />consistió en crear "snowballs" incluyendo<br />elementos flotantes de los medicamentos de sus<br />marcas más icónicas.`
        }
    ];

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
                <Text fontSize={isGreaterThanMd ? "34px" : "26px"} as={"b"}>Proyectos especiales</Text>
            </Flex>
            <Flex display={isGreaterThanMd ? "flex" : "none"} flexDirection={"column"}>
                <ProyectosEspecialesDskt 
                    onOpen={onOpen}
                    slides={slides}
                    setSelectGallery={setSelectGallery} />
            </Flex>
            <Flex display={isGreaterThanMd ? "none" : "flex"} flexDirection={"column"}>
                <ProyectosEspecialesDsktMb
                    onOpen={onOpen}
                    slides={slides}
                    setSelectGallery={setSelectGallery} />
            </Flex>
            <Flex pt={10} textAlign={isGreaterThanMd ? "start" : "center"} justifyContent={"center"} mb={2} color={"#000"}>
                <Text fontSize={"26px"} fontWeight={500}>Compártenos tu idea y lo hacemos realidad</Text>
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={20} position="relative">
                <Flex w="100%" justifyContent={"center"}>
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
                                <Textarea name='message' onChange={handleChange} w={"756px"} height={"180px"} fontSize={"14px"} placeholder='Mensaje' />
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