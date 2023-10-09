import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';

const PrivacyMb = () => {
    
    return ( 
        <>
            <Flex width={"100%"} pl={5}>
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
            <Flex width={"100%"} fontWeight={400} fontSize={"16px"} flexDirection={"column"}>
                <Text mt={5} textAlign={"center"} as={"b"} fontSize={"26px"}>Grupo Enba - Aviso de Privacidad</Text>
                <Text mt={8} lineHeight={1.2} p={"0px 20px"} textAlign={"justify"}>
                    Fecha de última actualización: [05 Septiembre 2023]
                    <br /><br />
                    En Grupo Enba, valoramos y respetamos tu privacidad. Este Aviso de Privacidad describe cómo
                    recopilamos, usamos y protegemos tu información cuando utilizas nuestro sitio web y nuestros
                    servicios. Al acceder o utilizar nuestros servicios, aceptas las prácticas descritas en este aviso.
                    <br /><br />
                    Información que Recopilamos:
                    <br />
                    Recopilamos información personal que proporcionas voluntariamente, como tu nombre, dirección
                    de correo electrónico y dirección de envío.
                    <br /><br />
                    Utilizamos cookies y tecnologías similares para recopilar información sobre tu navegación y
                    actividad en nuestro sitio web.
                    Podemos recopilar información de fuentes públicas y terceros para mejorar nuestros servicios.
                    <br /><br />
                    Uso de la Información:
                    <br />
                    Utilizamos tu información para procesar tus pedidos y entregas.
                    Podemos utilizar tu información para enviarte ofertas y promociones relacionadas con nuestros
                    productos y servicios.
                    <br /><br />
                    No compartimos tu información personal con terceros, excepto cuando sea necesario para
                    procesar tu pedido o cumplir con requisitos legales.
                    <br /><br />
                    Seguridad de la Información:
                    <br />
                    Tomamos medidas de seguridad para proteger tu información personal.
                    Términos y Condiciones
                </Text>
            </Flex>
        </>
    );
}
 
export default PrivacyMb;
