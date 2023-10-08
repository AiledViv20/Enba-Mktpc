import React from 'react';
import { 
    Flex,
    Text,
    Image,
    useTheme,
    useMediaQuery
} from "@chakra-ui/react";

import "../styles/fondo.css";

const Fondo = ({ space, bg, fontColor, icon, title, img }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    const titleMb = "Desarrollamos productos para ti";

    return (
        <Flex pt={space} flexDirection={isGreaterThanMd ? "row" : "column"} width={"100%"} height={isGreaterThanMd ? "312px" : "520px"} borderRadius={"20px"} bgColor={bg} color={fontColor} mb={10}>
            <Flex flexDirection={"column"} width={isGreaterThanMd ? "50%" : "100%"} justifyContent={"center"} alignItems={"center"}>
                <Text display={"flex"} flexDirection={"column"} alignItems={isGreaterThanMd ? "initial" : "center"} mt={isGreaterThanMd ? 0 : 10} fontSize={isGreaterThanMd ? "32px" : "20px"} fontWeight={700}>
                    <Image mb={5} width={"150px"} height={"64px"} src={icon} alt="logo" />
                    {isGreaterThanMd ? title : titleMb}
                </Text>
                <Text textAlign={"center"} display={isGreaterThanMd ? "none" : "flex"} mt={4} mb={10} fontSize={"19px"} fontWeight={400}>
                    Nos especializamos en innovación y<br />desarrollo de nuevos productos para<br />facilitar tu día a día.
                </Text>
            </Flex>
            <Flex width={isGreaterThanMd ? "50%" : "100%"} justifyContent={"center"} alignItems={"center"}>
                <Image mb={5} width={"auto"} height={"auto"} src={img} alt="producto" />
            </Flex>
        </Flex>
    );
}
 
export default Fondo;