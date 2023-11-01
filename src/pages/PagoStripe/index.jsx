import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import Footer from '../../components/Footer';

import animationData from '../../assets/svgs/icon-check.json';
import iconCheck from '../../assets/svgs/icon-check.svg';
import { 
    Flex,
    Text 
} from '@chakra-ui/react';

const PagoStripe = () => {

    useEffect(() => {
        // Configura la animación
        const container = document.getElementById('animation-container'); // Reemplaza con un elemento div en tu JSX
        const animation = lottie.loadAnimation({
          container,
          renderer: 'svg', // Puedes cambiarlo a 'canvas' si prefieres
          loop: true, // Opciones adicionales según tus necesidades
          autoplay: true,
          animationData,
        });
    
        return () => {
          // Detiene la animación al desmontar el componente (opcional)
          animation.stop();
        };
    }, []);

    return ( 
        <>
            <Flex display={"none"} flexDirection={"column"} height={"90vh"} w={"100%"}>
                <Flex w={"100%"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                    <div id="animation-container" style={{ width: '140px', height: '200px' }}></div>
                    <Text as={"b"} fontSize={"25px"}>
                        Gracias has realizado tu pedido
                    </Text>
                    <Text fontSize={"25px"}>
                        Te hemos enviado una confirmación por correo electrónico
                    </Text>
                </Flex>
                <Flex w={"100%"} height={"100%"} justifyContent={"end"} alignItems={"end"}>
                    <Footer />
                </Flex>
            </Flex>
            <Flex flexDirection={"column"} height={"90vh"} w={"100%"} pt={20}>
                <Flex w={"100%"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                    <img src={iconCheck} width={"140px"} height={"200px"} alt='icon' />
                    <Text as={"b"} fontSize={"25px"} mt={5}>
                        Gracias has realizado tu pedido
                    </Text>
                    <Text fontSize={"25px"} mt={2}>
                        Te hemos enviado una confirmación por correo electrónico
                    </Text>
                </Flex>
                <Flex w={"100%"} height={"100%"} justifyContent={"end"} alignItems={"end"}>
                    <Footer />
                </Flex>
            </Flex>
        </>
    );
}
 
export default PagoStripe;