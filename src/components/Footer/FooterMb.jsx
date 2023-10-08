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
import iconEmail from '../../assets/icons/footer/email.svg';
import logo from '../../assets/icons/logo.svg';
import iconLk from '../../assets/icons/footer/icon-lk.svg';
import iconIg from '../../assets/icons/footer/icon-ig.svg';

const FooterMb = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return (
        <Flex display={isGreaterThanMd ? "none" : "flex"} flexDirection={"column"} borderTop={"1px solid #E3E3E3"}>
            <Flex justifyContent={"center"} mt={5}>
                <Link mr={2} zIndex={1} href='https://www.linkedin.com/company/grupo-enba/about/' isExternal>
                    <img style={{ marginRight: "0.5rem" }} src={iconLk} width='40px' height='40px' alt='Linkedin'/>
                </Link>
                <Link ml={2} zIndex={1} href='https://www.instagram.com/grupoenbamx/?igshid=MzRlODBiNWFlZA%3D%3D' isExternal>
                    <img style={{ marginRight: "0.5rem" }} src={iconIg} width='40px' height='40px' alt='Instagram'/>
                </Link>
            </Flex>
            <Flex justifyContent={"center"} mt={5}>
                <Image src={logo} width={"150px"} height={"64px"} alt='logo' />
            </Flex>
            <Flex justifyContent={"center"} mt={5}>
                <Flex mr={"1rem"} alignItems={"center"}>
                    <Image src={iconEmail} width={"25px"} height={"25px"} alt='correo'/>
                    <Link zIndex={1} pl={2} textDecoration={"revert"} display={"flex"} flexDirection={"column"} alignItems={"center"} href='mailto:marketplace@enba.mx' isExternal>
                        <Text>marketplace@enba.mx</Text>
                    </Link>
                </Flex>
            </Flex>
            <Flex justifyContent={"center"} mt={5}>
                <Text fontSize={"14px"} fontWeight={500}>
                    Av. Libertad 1211, Col. Centro,<br />
                    Guadalajara, Jalisco, CP 44100, MX
                </Text>
            </Flex>
            <Flex justifyContent={"center"} mt={10} p={"1rem 0px"} bg={"#EBEBEB"} flexDirection={"column"}>
                <Flex justifyContent={"center"} mt={5}>
                    <Text fontSize={"14px"}>&#xa9;ENBA 2023 Todos los Derechos Reservados.</Text>
                </Flex>
                <Flex justifyContent={"center"} mt={3}>
                    <Text fontWeight={500} fontSize={"12px"} zIndex={1}>
                        <Link textDecoration={"revert"} href='/terminos-condiciones'>TÉRMINOS Y CONDICIONES</Link>
                        {" "}|{" "}
                        <Link textDecoration={"revert"} href='/aviso-privacidad'>AVISO DE PRIVACIDAD</Link>
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default FooterMb;