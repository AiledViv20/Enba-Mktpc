import React from 'react';
import {
    Box,
    Flex,
    Image,
    Text,
    Container,
} from "@chakra-ui/react";

const CategoryCard = ({ category }) => {
    return ( 
        <Container key={category.id} margin="0" gap="0" padding="0">
            <Box
                w="294px"
                h="338px"
                m="2"
                bg={"#F6F6F6"}
                border={"1px solid #A4A4A4"}
                borderRadius={"20px"}
                overflow="hidden"
                aria-label={category.title}
            >
                <Flex h={"100%"} flexDirection={"column"} justifyContent={"center"}>
                    <Flex justifyContent={"center"} pt={5}>
                        <Image width={"120px"} height={"120px"} src={category.url} alt={category.title} />
                    </Flex>
                    <Flex direction="column" px="4" pt="10" pb="1">
                        <Box textAlign={"center"}>
                            <Text fontSize="20px" fontWeight={500} color="#424242" lineHeight={"10px"}>
                                {category.title}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
}
 
export default CategoryCard;