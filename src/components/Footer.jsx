import React from 'react';
import { Flex, Stack, Text, Link, useMediaQuery, useTheme } from '@chakra-ui/react';
import "../styles/footer.css";

const Footer = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    const icons = [
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/soare/icons/tya.svg' },
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/soare/icons/grupo-guia.svg' },
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/icon-fb.svg' },
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/icon-ig.svg' },
        { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/icon-wpp.svg' }
    ];

    return ( 
        <Flex margin={"3rem"} flexDirection={"column"} mt={20}>
            {!isGreaterThanMd ? 
                <Flex className='footer-iconos' width={"100% !important"} height={"fit-content"} justifyContent={"center"} flexDirection={"column"}>
                    <Stack justifyContent={"center"} direction='row'>
                        <Link href='https://www.facebook.com/CentroZapopan' isExternal>
                            <img style={{ marginRight: "0.5rem" }} src={icons[2].imageUrl} width='35' height='35' alt='Facebook'/>
                        </Link>
                        <Link href='https://www.instagram.com/centrozapopan/' isExternal>
                            <img style={{ marginRight: "0.5rem" }} src={icons[3].imageUrl} width='35' height='35' alt='Instagram'/>
                        </Link>
                        <Link href='https://share.hsforms.com/1Xr6gncJ4QQuj2jLkZPYNNg3j49k' isExternal>
                            <img src={icons[4].imageUrl} width='35' height='35' alt='Instagram'/>
                        </Link>
                    </Stack>
                </Flex> : null
            }
            <Flex mt={10}>
                <Flex className='footer-logos' width={isGreaterThanMd ? "33%" : "100% !important"} justifyContent={isGreaterThanMd ? "start" : "center"} height={"fit-content"}>
                    <Stack direction='row'>
                        <Flex style={{ marginRight: "1rem" }} flexDirection={"column"}>
                            <Link display={"flex"} flexDirection={"column"} alignItems={"center"} href='https://www.tya.com.mx/' isExternal>
                                <Text fontSize='xs' marginBottom={"0.5rem"}>Una creación de:</Text>
                                <img src={icons[0].imageUrl} width='74' height='35' alt='TYA'/>
                            </Link>
                        </Flex>
                        <Flex style={{ marginRight: "1rem" }} flexDirection={"column"}>
                            <Link display={"flex"} flexDirection={"column"} alignItems={"center"} isExternal>
                                <Text fontSize='xs' marginBottom={"1rem"}>Comercializado por:</Text>
                                <img src={icons[1].imageUrl} width='140' height='39' alt='Logo Guía'/>
                            </Link>
                        </Flex>
                    </Stack>
                </Flex>
                <Flex className='footer-copyright-top' width={"33%"} flexDirection={"column"}>
                    <Text fontSize='md'>
                        Copyright &#169; 2023 &#169; All Rights Reserved - Powered by Grupo Guía Aviso de privacidad
                    </Text>
                </Flex>
                <Flex display={isGreaterThanMd ? "flex" : "none"} className='footer-iconos' width={"33%"} height={"fit-content"} justifyContent={"end"} flexDirection={"column"}>
                    <Stack justifyContent={"end"} direction='row'>
                        <Link href='https://www.facebook.com/CentroZapopan' isExternal>
                            <img style={{ marginRight: "0.5rem" }} src={icons[2].imageUrl} width='35' height='35' alt='Facebook'/>
                        </Link>
                        <Link href='https://www.instagram.com/centrozapopan/' isExternal>
                            <img style={{ marginRight: "0.5rem" }} src={icons[3].imageUrl} width='35' height='35' alt='Instagram'/>
                        </Link>
                        <Link href='https://share.hsforms.com/1Xr6gncJ4QQuj2jLkZPYNNg3j49k' isExternal>
                            <img src={icons[4].imageUrl} width='35' height='35' alt='Instagram'/>
                        </Link>
                    </Stack>
                </Flex>
            </Flex>
            <Flex className='footer-copyright-bottom' justifyContent={"center"} marginTop={"2rem"} flexDirection={"column"}>
                <Flex textAlign={"center"} justifyContent={"center"}>
                    <Text fontSize='md' width={"80%"}>
                        Copyright &#169; 2022 &#169; All Rights Reserved - Powered by Grupo Guía Aviso de privacidad
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default Footer;