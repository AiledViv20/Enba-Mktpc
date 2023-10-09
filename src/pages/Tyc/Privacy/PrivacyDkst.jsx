import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';

const PrivacyDkst = () => {
    
    return ( 
        <>
            <Flex width={"30%"} pt={10} flexDirection={"column"} pl={5}>
                <Flex borderLeft={"3px solid #17669D"} pl={5} mb={5}>
                    <Text 
                        fontSize={"16px"} fontWeight={700} 
                        onClick={() => window.location.href = "/aviso-privacidad"}
                        _hover={{
                            cursor: "pointer"
                        }}
                        color={"#005895"}>Grupo Enba - Aviso de Privacidad</Text>
                </Flex>
                <Flex borderLeft={"3px solid #FFF"} pl={5}>
                    <Text 
                        fontSize={"16px"} fontWeight={700} 
                        onClick={() => window.location.href = "/terminos-condiciones"}
                        _hover={{
                            cursor: "pointer"
                        }}
                        color={"#005895"}>Grupo Enba - Términos y Condiciones</Text>
                </Flex>
            </Flex>
            <Flex width={"70%"} fontWeight={400} fontSize={"18px"} flexDirection={"column"}>
                <Text as={"b"} fontSize={"32px"}>Grupo Enba - Aviso de Privacidad</Text>
                <Text mt={5} lineHeight={1.2}>
                    Fecha de última actualización: [05 Septiembre 2023]
                    <br /><br />
                    En Grupo Enba, valoramos y respetamos tu privacidad. Este Aviso de Privacidad describe cómo
                    <br />
                    recopilamos, usamos y protegemos tu información cuando utilizas nuestro sitio web y nuestros
                    <br />
                    servicios. Al acceder o utilizar nuestros servicios, aceptas las prácticas descritas en este aviso.
                    <br /><br />
                    Información que Recopilamos:
                    <br />
                    Recopilamos información personal que proporcionas voluntariamente, como tu nombre, dirección
                    <br />
                    de correo electrónico y dirección de envío.
                    <br /><br />
                    Utilizamos cookies y tecnologías similares para recopilar información sobre tu navegación y
                    <br />
                    actividad en nuestro sitio web.
                    <br />
                    Podemos recopilar información de fuentes públicas y terceros para mejorar nuestros servicios.
                    <br /><br />
                    Uso de la Información:
                    <br />
                    Utilizamos tu información para procesar tus pedidos y entregas.
                    <br />
                    Podemos utilizar tu información para enviarte ofertas y promociones relacionadas con nuestros
                    <br />
                    productos y servicios.
                    <br /><br />
                    No compartimos tu información personal con terceros, excepto cuando sea necesario para
                    <br />
                    procesar tu pedido o cumplir con requisitos legales.
                    <br /><br />
                    Seguridad de la Información:
                    <br />
                    Tomamos medidas de seguridad para proteger tu información personal.
                    <br />
                    Términos y Condiciones
                </Text>
            </Flex>
        </>
    );
}
 
export default PrivacyDkst;
