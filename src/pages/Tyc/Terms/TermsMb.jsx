import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';

const TermsMb = () => {
    return ( 
        <>
            <Flex width={"1o0%"} pl={5}>
                <Flex borderLeft={"3px solid #FFF"} pl={5} mb={5}>
                    <Text 
                        fontSize={"16px"} fontWeight={700} 
                        onClick={() => window.location.href = "/aviso-privacidad"}
                        _hover={{
                            cursor: "pointer"
                        }}
                        color={"#005895"}>Grupo Enba - Aviso de Privacidad</Text>
                </Flex>
                <Flex borderLeft={"3px solid #17669D"} pl={5}>
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
                <Text mt={5} textAlign={"center"} as={"b"} fontSize={"26px"}>Grupo Enba - Términos y Condiciones</Text>
                <Text mt={8} lineHeight={1.2} p={"0px 20px"} textAlign={"justify"}>
                    Fecha de última actualización: [05 Septiembre 2023]
                    <br /><br />
                    Al usar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones:
                    <br /><br />
                    Pedidos y Pagos:
                    <br />
                    Los pedidos están sujetos a disponibilidad y aprobación.
                    <br /><br />
                    Debes proporcionar información precisa y actualizada para completar una transacción.
                    Los precios están sujetos a cambios sin previo aviso.
                    <br /><br />
                    Envíos y Devoluciones:
                    <br />
                    Los tiempos de envío pueden variar según la ubicación y la disponibilidad de productos.
                    <br />
                    Política de Devoluciones (Solo para Productos Defectuosos o Errores de Fabricación):
                    <br /><br />
                    Producto Defectuoso o Error de Fabricación:
                    <br />
                    - Si recibes un producto que presenta defectos o errores en la impresión de tu logo, contáctanos
                    de inmediato.
                    <br /><br />
                    Plazo de Devolución:
                    <br />
                    - Tienes un plazo de 30 días a partir de la fecha de entrega para notificarnos sobre cualquier problema de este tipo.
                    <br /><br />
                    Proceso de Devolución:
                    <br />
                    - Comunícate con nuestro servicio de atención al cliente para informarnos sobre el problema y
                    obtener instrucciones específicas para la devolución.
                    <br /><br />
                    Reembolso o Reemplazo:
                    <br />
                    - Una vez que hayamos evaluado el producto y confirmado el defecto o error de fabricación,
                    procederemos a emitir un reembolso o enviar un reemplazo, según tu preferencia y la
                    disponibilidad del producto.
                    <br /><br />
                    Esta política de devoluciones se aplica exclusivamente a productos con defectos o errores de
                    fabricación en la impresión del logo del cliente. Todos los demás productos personalizados se
                    consideran ventas finales. Te recomendamos que revises cuidadosamente la muestra de tu 
                    producto antes de confirmar el pedido.
                    <br /><br />
                    Si tienes alguna pregunta o necesitas más detalles sobre nuestra política de devoluciones, no
                    dudes en contactar a nuestro servicio de atención al cliente. Estamos aquí para asegurarnos de
                    que estés satisfecho con los productos que recibes de Grupo Enba.
                    <br /><br />
                    Derechos de Propiedad Intelectual:
                    <br />
                    Todos los derechos de propiedad intelectual en nuestro sitio web y contenido son propiedad de
                    Grupo Enba.
                    <br /><br />
                    No está permitido copiar o reproducir nuestro contenido sin autorización.
                    <br /><br />
                    Privacidad:
                    <br />
                    Tu privacidad es importante para nosotros. Consulta nuestro Aviso de Privacidad para obtener
                    información sobre cómo manejamos tus datos personales.
                    <br /><br />
                    Recuerda que estos son solo ejemplos genéricos y es importante adaptarlos a las leyes locales y a
                    las políticas específicas de tu negocio.
                </Text>
            </Flex>
        </>
    );
}
 
export default TermsMb;
