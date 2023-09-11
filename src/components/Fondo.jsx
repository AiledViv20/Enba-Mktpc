import React from 'react';
import { 
    Flex,
    Text,
    Image
} from "@chakra-ui/react";

import "../styles/fondo.css";

const Fondo = ({ bg, fontColor, icon, title, txt1, img }) => {

    return (
        <Flex width={"100%"} height={"312px"} borderRadius={"20px"} bgColor={bg} color={fontColor} mb={10}>
            <Flex flexDirection={"column"} width={"50%"} justifyContent={"center"} alignItems={"center"}>
                <Text fontSize={"32px"} fontWeight={700}>
                    <Image mb={5} width={"150px"} height={"64px"} src={icon} alt="logo" />
                    {title}
                </Text>
                <Text mt={2} fontSize={"19px"} fontWeight={400}>
                    {txt1 ? txt1 : null}
                </Text>
            </Flex>
            <Flex width={"50%"} justifyContent={"center"} alignItems={"center"}>
                <Image mb={5} width={"60%"} height={"80%"} src={img} alt="producto" />
            </Flex>
        </Flex>
    );
}
 
export default Fondo;