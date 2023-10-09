import React from 'react';
import { 
    Flex,
    Text
} from '@chakra-ui/react';

const TermsDkst = () => {
    return ( 
        <>
            <Flex width={"30%"} pt={10} flexDirection={"column"} pl={5}>
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
            <Flex width={"70%"} fontWeight={400} fontSize={"18px"} flexDirection={"column"}>
                <Text as={"b"} fontSize={"32px"}>Grupo Enba - Términos y Condiciones</Text>
                <Text mt={5} lineHeight={1.2}>
                    Fecha de última actualización: [05 Septiembre 2023]
                    <br /><br />
                    Al usar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones:
                    <br /><br />
                    Pedidos y Pagos:
                    <br /><br />
                    Los pedidos están sujetos a disponibilidad y aprobación.
                    <br /><br />
                    Debes proporcionar información precisa y actualizada para completar una transacción.
                    <br />
                    Los precios están sujetos a cambios sin previo aviso.
                    <br /><br />
                    Envíos y Devoluciones:
                    <br />
                    Los tiempos de envío pueden variar según la ubicación y la disponibilidad de productos.
                    <br />
                    Política de Devoluciones (Solo para Productos Defectuosos o Errores de Fabricación):
                    <br />
                    Producto Defectuoso o Error de Fabricación:
                    <br /><br />
                    - Si recibes un producto que presenta defectos o errores en la impresión de tu logo, contáctanos
                    <br />
                    de inmediato.
                    <br />
                    Plazo de Devolución:
                    <br />
                    - Tienes un plazo de 30 días a partir de la fecha de entrega para notificarnos sobre cualquier problema de este tipo.
                    <br />
                    Proceso de Devolución:
                    <br />
                    - Comunícate con nuestro servicio de atención al cliente para informarnos sobre el problema y
                    <br />
                    obtener instrucciones específicas para la devolución.
                    <br />
                    Reembolso o Reemplazo:
                    <br />
                    - Una vez que hayamos evaluado el producto y confirmado el defecto o error de fabricación,
                    <br />
                    procederemos a emitir un reembolso o enviar un reemplazo, según tu preferencia y la
                    <br />
                    disponibilidad del producto.
                    <br /><br />
                    Esta política de devoluciones se aplica exclusivamente a productos con defectos o errores de
                    <br />
                    fabricación en la impresión del logo del cliente. Todos los demás productos personalizados se
                    <br />
                    consideran ventas finales. Te recomendamos que revises cuidadosamente la muestra de tu 
                    <br />
                    producto antes de confirmar el pedido.
                    <br /><br />
                    Si tienes alguna pregunta o necesitas más detalles sobre nuestra política de devoluciones, no
                    <br />
                    dudes en contactar a nuestro servicio de atención al cliente. Estamos aquí para asegurarnos de
                    <br />
                    que estés satisfecho con los productos que recibes de Grupo Enba.
                    <br /><br />
                    Derechos de Propiedad Intelectual:
                    <br />
                    Todos los derechos de propiedad intelectual en nuestro sitio web y contenido son propiedad de
                    <br />
                    Grupo Enba.
                    <br /><br />
                    No está permitido copiar o reproducir nuestro contenido sin autorización.
                    <br /><br />
                    Privacidad:
                    <br />
                    Tu privacidad es importante para nosotros. Consulta nuestro Aviso de Privacidad para obtener
                    <br />
                    información sobre cómo manejamos tus datos personales.
                    <br /><br />
                    Recuerda que estos son solo ejemplos genéricos y es importante adaptarlos a las leyes locales y a
                    <br />
                    las políticas específicas de tu negocio.
                </Text>
            </Flex>
        </>
    );
}
 
export default TermsDkst;
