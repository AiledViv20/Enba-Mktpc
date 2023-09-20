import React from 'react';
import { 
    Flex, 
    Stack, 
    Text, 
    Link, 
    useMediaQuery, 
    useTheme, 
    Image
} from '@chakra-ui/react';
import iconEmail from '../assets/icons/footer/email.svg';
import logo from '../assets/icons/logo.svg';
import iconLk from '../assets/icons/footer/icon-lk.svg';
import iconIg from '../assets/icons/footer/icon-ig.svg';

const Footer = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return ( 
        <Flex flexDirection={"column"} borderTop={"1px solid #E3E3E3"}>
            <Flex color={"#424242"} padding={"3rem"} pt={"1.5rem"}>
                <Flex width={isGreaterThanMd ? "33%" : "100% !important"} justifyContent={isGreaterThanMd ? "start" : "center"} height={"fit-content"}>
                    <Stack direction='column'>
                        <Flex mr={"1rem"} alignItems={"center"}>
                            <Image src={iconEmail} width={"25px"} height={"25px"} alt='correo'/>
                            <Link zIndex={1} pl={2} textDecoration={"revert"} display={"flex"} flexDirection={"column"} alignItems={"center"} href='mailto:marketplace@enba.mx' isExternal>
                                <Text>marketplace@enba.mx</Text>
                            </Link>
                        </Flex>
                        <Flex>
                            <Text fontSize={"14px"} fontWeight={500}>
                                Av. Libertad 1211, Col. Centro,<br />
                                Guadalajara, Jalisco, CP 44100, MX
                            </Text>
                        </Flex>
                    </Stack>
                </Flex>
                <Flex width={"33%"} flexDirection={"column"} alignItems={"center"}>
                    <Image src={logo} width={"150px"} height={"64px"} alt='logo' />
                </Flex>
                <Flex display={isGreaterThanMd ? "flex" : "none"} width={"33%"} height={"fit-content"} justifyContent={"end"} flexDirection={"column"}>
                    <Stack justifyContent={"end"} direction='row'>
                        <Link zIndex={1} href='https://www.linkedin.com/company/grupo-enba/about/' isExternal>
                            <img style={{ marginRight: "0.5rem" }} src={iconLk} width='40px' height='40px' alt='Linkedin'/>
                        </Link>
                        <Link zIndex={1} href='https://www.instagram.com/grupoenbamx/?igshid=MzRlODBiNWFlZA%3D%3D' isExternal>
                            <img style={{ marginRight: "0.5rem" }} src={iconIg} width='40px' height='40px' alt='Instagram'/>
                        </Link>
                    </Stack>
                </Flex>
            </Flex>
            <Flex bg={"#EBEBEB"} w={"100%"} h={"56px"} p={"0px 3rem"}>
                <Flex w={"50%"} alignItems={"center"}>
                    <Text>&#xa9;ENBA 2023 Todos los Derechos Reservados.</Text>
                </Flex>
                <Flex w={"50%"} justifyContent={"end"} alignItems={"center"}>
                    <Text fontWeight={500} fontSize={"14px"} zIndex={1}>
                        <Link textDecoration={"revert"} href='/terminos-condiciones'>TÉRMINOS Y CONDICIONES</Link>
                        {" "}|{" "}
                        <Link textDecoration={"revert"} href='/aviso-privacidad'>AVISO DE PRIVACIDAD</Link>
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default Footer;