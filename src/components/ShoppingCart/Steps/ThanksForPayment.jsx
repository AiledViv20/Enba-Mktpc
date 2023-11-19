import React from 'react';
import { 
    Button,
    Flex,
    Text,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';

const ThanksForPayment = ({ step4, nextStep }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return (
        <Flex mt={10} justifyContent={"center"} display={step4 ? "flex" : "none"}>
            <Flex flexDirection={"column"} >
                <Text mb={5} fontSize={"16px"} fontWeight={700}>Te hemos enviado una confirmación por correo</Text>
                {isGreaterThanMd ?
                    <Text mb={10} fontSize={"16px"} fontWeight={400}>
                        Si deseas solicitar factura, da clic en el boton “Solicitar factura”,<br />una vez llenado los datos podrás descargarla 
                    </Text>
                :
                    <Text mb={10} fontSize={"16px"} fontWeight={400}>
                        Si deseas solicitar factura, da clic en el boton “Solicitar factura”, una vez llenado los datos podrás descargarla 
                    </Text>
                }
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Button border={"1px solid #064A73"}
                        width={isGreaterThanMd ? "350px" : "100%"} height={"40px"}
                        fontSize={"18px"} fontWeight={600}
                        onClick={() => nextStep()}>Solicitar factura</Button>
                    <Button mt={5} variant={"outline"} border={"1px solid #064A73"}
                        width={isGreaterThanMd ? "350px" : "100%"} height={"40px"} color={"accent.500"}
                        fontSize={"18px"} fontWeight={600}
                        onClick={() => window.location.href = "/"}>Seguir comprando</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default ThanksForPayment;
