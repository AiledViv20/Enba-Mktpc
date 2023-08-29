import React, { useState } from 'react';
import { 
    Flex, 
    Box, 
    Text,
    InputGroup,
    Input,
    InputRightElement
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import { SearchIcon } from '@chakra-ui/icons';
import { listSearchCategories, colors } from '../../resource';
import ProductCard from '../../components/ProductCard';
import ArticlesPerPage from '../../components/filters/ArticlesPerPage';
import OrderBy from '../../components/filters/OrderBy';
import Footer from '../../components/Footer';

const Categories = (props) => {
    const [urlCategory, setUrlCategory] = useState(window.location.pathname);

    const toTextTransform = (txt) => {
        let listUrl = txt.split("/");
        return listUrl[2];
    }

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} pb={20} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / ${toTextTransform(urlCategory)}`}
                    </Text>
                </Flex>
                <Flex width={"100%"} mt={10}>
                    <Flex width={"25%"} flexDirection={"column"}>
                        <Text fontSize={"16px"} fontWeight={700} lineHeight={1.2}>
                            ACCESORIOS SMARTPHONE<br />Y TABLETS
                        </Text>
                        <InputGroup border={"transparent"} mt={8}>
                            <Input h={"57px"} focusBorderColor="#B9B9B9" fontSize={"12px"} fontWeight={400} bg={"#EFEFEF"} color={"#383838"}
                                placeholder='Buscar productos' border={"1px solid #B9B9B9"} borderRadius={"29px"}
                                _placeholder={{
                                    color: "#383838"
                                }} />
                            <InputRightElement h={"100%"} mr={2}>
                                <Flex _hover={{ cursor: "pointer" }} w={"35px"} h={"35px"} bg={"#064A73"} borderRadius={"25px"} justifyContent={"center"} alignItems={"center"}>
                                    <SearchIcon color='#FFF' />
                                </Flex>
                            </InputRightElement>
                        </InputGroup>
                        <Flex mt={8} flexDirection={"column"}>
                            <Flex p={"15px"} bg={"#EFEFEF"} borderRadius={"5px 5px 0px 0px"} border={"1px solid #B9B9B9"}>
                                <Text fontSize={"14px"} fontWeight={600}>Filtros</Text>
                            </Flex>
                            <Flex flexDirection={"column"} bg={"#EFEFEF"} pb={"15px"} pt={"25px"} borderRadius={"0px 0px 5px 5px"} border={"1px solid #B9B9B9"}>
                                <Flex flexDirection={"column"} pl={"15px"}>
                                    <Text fontSize={"14px"} fontWeight={600} mb={5}>Tipo de producto</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5}>Accesorios de computo</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5}>Accesorios para smartphone y tablet</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5}>Audifonos</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5}>Carpetas</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5}>Sets para escritorio y organizadores</Text>
                                    <Text fontSize={"14px"} fontWeight={600} mt={2}>Color</Text>
                                </Flex>
                                <Flex
                                    justifyContent="center"
                                    w="100%">
                                    {colors.map((item, index) => (
                                    <Text
                                        key={`color-${index}`}
                                        marginRight={"2px"}
                                        cursor="pointer"
                                        fontSize={"55px"}
                                        color={item.hex}
                                    >
                                        &#9679;
                                    </Text>
                                    ))}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex width={"75%"} flexDirection={"column"}>
                        <Flex pl={10} pb={10}>
                            <ArticlesPerPage />
                            <OrderBy />
                        </Flex>
                        <Flex justifyContent={"center"}>
                            {listSearchCategories ? listSearchCategories.map((item, idx) => {
                                return(
                                    <Flex key={idx}>
                                        <ProductCard product={item} />
                                    </Flex>
                                )
                            })
                            : null}
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Footer />
        </>
    );
}
 
export default Categories;