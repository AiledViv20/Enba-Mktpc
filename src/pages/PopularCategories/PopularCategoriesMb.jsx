import React, { useEffect, useState, useContext } from 'react';
import { 
    Flex, 
    Box, 
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Grid,
    Spinner,
    Stack,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { colors_complement, colors } from '../../resource';
import { categoriesList } from '../../resource/save';
import { capitalizeFirstLetter } from '../../resource/validate';
import ProductCard from '../../components/ProductCard';
import ArticlesPerPage from '../../components/filters/ArticlesPerPage';
import OrderBy from '../../components/filters/OrderBy';
import { useGetSearchQuery } from '../../hooks/enbaapi';
import { useParams } from 'react-router-dom';

import { WarningTwoIcon } from "@chakra-ui/icons";

import { CardFilterContext } from '../../context';

import iconNotFound from '../../assets/icons/design.svg';

const PopularCategoriesMb = () => {
    const params_url = useParams();
    const [products, setProducts] = useState([]);
    const { state } = useContext(CardFilterContext);
    const [productsDefault, setProductsDefault] = useState([]);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState(params_url.name);
    const  param_category = params_url.category === 'Todas' ? "" : params_url.category;
    const [page, setPage] = useState(0);
    const [filterList, setFilterList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [changeFirstValue, setChangeFirstValue] = useState(true);
    const [params, setParams] = useState({
        take: 25,
        page: 0,
        color: "",
        temporality: "HALLOWEEN",
        name: "",
        order: "ASC"
    });
    const {data, isLoading, error} = useGetSearchQuery(params);

    useEffect(() => {
        if (params_url.category) {
            const urlCategory = params_url.category.split(" ");
            categoriesList.forEach((element) => {
                const filterCategories = element.master_category.filter((e) => e.master_category === urlCategory[0]);
                if (filterCategories.length > 0) {
                    setFilterList(filterCategories[0].categories);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (data && changeFirstValue) {
            setLoading(true);
            setProducts(data);
            setProductsDefault(data);
            setLoading(false);
            setChangeFirstValue(false);
        }
    },[data]);

    useEffect(() => {
        if (productsDefault.length > 0) {
            let filterProducts = productsDefault.filter((element) => element.stock !== "0");
            setProducts(filterProducts);
        }
    }, [productsDefault]);

    useEffect(() => {
        if (productsDefault.length > 0) {
            setLoading(true);
            if (colorSelected !== "") {
                let filterProductsByColor = productsDefault.filter((element) => element.color === colorSelected);
                filterProductsByColor = filterProductsByColor.filter((element) => element.stock !== "0");
                if (filterProductsByColor.length > 0) {
                    if (state.artPerPage !== "" && state.artPerPage !== 1) {
                        filterProductsByColor = filterProductsByColor.slice(0, state.artPerPage);
                    } else  if (state.artPerPage === 1) {
                        setProducts(filterProductsByColor);
                    }
                } else {
                    setProducts(filterProductsByColor);
                }
            } else {
                let filterProductsByOptions = productsDefault.filter((element) => element.stock !== "0");
                if (state.artPerPage !== "" && state.artPerPage !== 1) {
                    filterProductsByOptions = productsDefault.slice(0, state.artPerPage);
                    setProducts(filterProductsByOptions);
                } else if (state.artPerPage === 1) {
                    setProducts(filterProductsByOptions);
                }
            }
            setLoading(false);
        }
    },[colorSelected, state]);

    return ( 
        <>
            <Flex flexDirection={"column"} width={"100%"}>
                <Accordion allowMultiple border={"transparent"} allowToggle zIndex={1}>
                    <AccordionItem>
                        <AccordionButton bg={"#F4F4F4"} mt={5} border={"1px solid #B9B9B9"} borderRadius={"5px"}>
                            <Box as="span" flex='1' textAlign='left'>
                                Filtros
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel zIndex={1} flexDirection={"column"} pb={4} bg={"#F4F4F4"} border={"1px solid #B9B9B9"} borderTopColor={"transparent"} borderRadius={"5px"}>
                            <InputGroup border={"transparent"} mt={2} zIndex={1}>
                                <Input h={"40px"} focusBorderColor="#B9B9B9" fontSize={"12px"} fontWeight={400} bg={"#EFEFEF"} color={"#383838"}
                                    placeholder='Buscar productos' border={"1px solid #B9B9B9"} borderRadius={"29px"}
                                    _placeholder={{
                                        color: "#383838"
                                    }} 
                                    onChange={(e) => setInputSearch(e.target.value)}
                                />
                                <InputRightElement h={"100%"} mr={2}>
                                    <Flex _hover={{ cursor: "pointer" }} w={"25px"} h={"25px"} bg={"#064A73"} borderRadius={"25px"} justifyContent={"center"} alignItems={"center"} 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/categoria/${inputSearch.toUpperCase()}`;
                                        }}>
                                        <SearchIcon w={"15px"} h={"15px"} color='#FFF' />
                                    </Flex>
                                </InputRightElement>
                            </InputGroup>
                            <Flex mt={8} flexDirection={"column"}>
                                <Flex flexDirection={"column"} pl={"15px"}>
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
                                <Flex mt={3} display={colorSelected !== "" ? "flex" : "none"} pl={5} >
                                    <Text fontSize={"14px"} fontWeight={600}>Búsqueda en:</Text>
                                    <Text fontWeight={400} ml={2}>{capitalizeFirstLetter(colorSelected)}</Text>
                                </Flex>
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Flex>
            <Flex flexDirection={"column"}>
                <Flex pt={5} pb={10} zIndex={1}>
                    <ArticlesPerPage />
                    <OrderBy />
                </Flex>
                <Grid templateColumns={"repeat(1, 1fr)"} alignSelf={"center"}>
                    {loading ?
                        <Spinner mt={20} /> : null
                    }
                </Grid>
                <Grid templateColumns={"repeat(1, 1fr)"} alignSelf={"center"}>
                    {products.length > 0 && !loading ? products.map((item, idx) => {
                        if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.retail_price ) {
                            return(
                                <Flex key={idx}>
                                    <ProductCard product={item} />
                                </Flex>
                            )
                        }
                    })
                    : 
                        <Stack direction="row" alignItems="center" w={"100%"} justifyContent={"center"}>
                            <Box textAlign="center" py={6} px={3}>
                                <img src={iconNotFound} width={"658px"} height={"374px"} alt='icon'/>
                                <Heading as="h2" size="lg" mt={6} mb={2} color={"accent.500"}>
                                    Página no encontrada
                                </Heading>
                                <Text fontSize="sm" color={"gray.500"}>
                                    No hemos podido encontrar la pagina que buscas
                                </Text>
                            </Box>
                        </Stack>
                    }
                </Grid>
            </Flex>
        </>
    );
}
 
export default PopularCategoriesMb;