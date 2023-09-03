import React, { useEffect, useState } from 'react';
import { 
    Flex, 
    Box, 
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Grid,
    Spinner,
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import { SearchIcon } from '@chakra-ui/icons';
import { colors_complement, colors } from '../../resource';
import ProductCard from '../../components/ProductCard';
import ArticlesPerPage from '../../components/filters/ArticlesPerPage';
import OrderBy from '../../components/filters/OrderBy';
import Footer from '../../components/Footer';
import { useGetSearchQuery } from '../../hooks/enbaapi';
import { useParams } from 'react-router-dom';

const Categories = (props) => {
    const [products, setProducts] = useState(null);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState("");
    const [order, setOrder] = useState('ASC');
    const [artPerPage, setArtPerPage] = useState(25);
    const params_url = useParams();
    const [page, setPage] = useState(0);
    const [params, setParams] = useState({
        take: artPerPage,
        page: page,
        color: colorSelected,
        category: params_url.category,
        name: inputSearch,
        order: order
    });
    const {data, isLoading, error} = useGetSearchQuery(params);

    useEffect(() => {
        if(data){
            setProducts(data);
        }
    },[data])

    useEffect(() => {
        setParams({
            take: artPerPage,
            page: page,
            color: colorSelected,
            category: params_url.category,
            name: inputSearch,
            order: order
        })
    },[colorSelected, order, artPerPage])

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={20} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / ${params_url.category}`}
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
                                }} 
                                onChange={(e) => setInputSearch(e.target.value)}
                            />
                            <InputRightElement h={"100%"} mr={2}>
                                <Flex _hover={{ cursor: "pointer" }} w={"35px"} h={"35px"} bg={"#064A73"} borderRadius={"25px"} justifyContent={"center"} alignItems={"center"} onClick={(e) => {e.preventDefault(); setParams({ ...params, "name": inputSearch })}}>
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
                                    <Text fontSize={"14px"} fontWeight={400} mb={5} cursor={'pointer'} onClick={(e) => {e.preventDefault(); setParams({ ...params, "category": "Computo".toUpperCase() })}}>
                                        Accesorios de computo
                                    </Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5} cursor={'pointer'} onClick={(e) => {e.preventDefault(); setParams({ ...params, "category": "Accesorios smartphone y tablet".toUpperCase() })}}>Accesorios para smartphone y tablet</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5} cursor={'pointer'} onClick={(e) => {e.preventDefault(); setParams({ ...params, "category": "Audífonos".toUpperCase() })}}>Audífonos</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5} cursor={'pointer'} onClick={(e) => {e.preventDefault(); setParams({ ...params, "category": "Carpetas".toUpperCase() })}}>Carpetas</Text>
                                    <Text fontSize={"14px"} fontWeight={400} mb={5} cursor={'pointer'} onClick={(e) => {e.preventDefault(); setParams({ ...params, "category": "Escritorio".toUpperCase() })}}>Sets para escritorio y organizadores</Text>
                                    <Text fontSize={"14px"} fontWeight={600} mt={2} cursor={'pointer'}>Color</Text>
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
                                        onClick={() => {
                                            setColorSelected(item.color);
                                        }}
                                    >
                                        &#9679;
                                    </Text>
                                    ))}
                                </Flex>
                                <Flex
                                    justifyContent="center"
                                    w="100%">
                                    {colors_complement.map((item, index) => (
                                    <Text
                                        key={`color-${index}`}
                                        marginRight={"2px"}
                                        cursor="pointer"
                                        fontSize={"55px"}
                                        color={item.hex}
                                        onClick={() => {
                                            setColorSelected(item.color);
                                        }}
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
                            <ArticlesPerPage setArtPerPage={setArtPerPage} artPerPage={artPerPage}/>
                            <OrderBy setOrder={setOrder}/>
                        </Flex>
                        <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}} gap={10} alignSelf={"center"}>
                            {products && !isLoading ? products.map((item, idx) => {
                                if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.retail_price ) {
                                    return(
                                        <Flex key={idx}>
                                            <ProductCard product={item} />
                                        </Flex>
                                    )
                                }
                            })
                            : 
                            <Spinner mt={20}/>
                            }
                        </Grid>
                        {products && !isLoading ? 
                            <Flex pl={10}>
                                <ArticlesPerPage />
                                <OrderBy />
                            </Flex>
                        : null}
                    </Flex>
                </Flex>
            </Box>
            <Footer />
        </>
    );
}
 
export default Categories;