import React, { useEffect, useState, useContext } from 'react';
import { 
    Flex,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Grid,
    Stack,
    Box,
    GridItem
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

import { CardFilterContext } from '../../context';

import logoGif from '../../assets/icons/logo.gif';

const CategoriesDkst = () => {
    const params_url = useParams();
    const [products, setProducts] = useState([]);
    const { state } = useContext(CardFilterContext);
    const [productsDefault, setProductsDefault] = useState([]);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState(params_url.name);
    const  param_category = params_url.category === 'Todas' ? "" : params_url.category;
    const [page, setPage] = useState(0);
    const [filterList, setFilterList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changeFirstValue, setChangeFirstValue] = useState(true);
    const [params, setParams] = useState({
        take: "",
        page: page,
        color: colorSelected,
        category: param_category ? param_category : "",
        name: inputSearch ? inputSearch : "",
        order: state.order
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
            <Grid
                templateColumns='repeat(2, 1fr)'
                gap={4}> 
                <GridItem>
                    <Text fontSize={"16px"} fontWeight={700} lineHeight={1.2}>
                        {params_url.category}
                    </Text>
                    <InputGroup border={"transparent"} mt={8} w={"344px"}>
                        <Input h={"57px"} focusBorderColor="#B9B9B9" fontSize={"12px"} fontWeight={400} bg={"#EFEFEF"} color={"#383838"}
                            placeholder='Buscar productos' border={"1px solid #B9B9B9"} borderRadius={"29px"}
                            _placeholder={{
                                color: "#383838"
                            }} 
                            onChange={(e) => setInputSearch(e.target.value)}
                        />
                        <InputRightElement h={"100%"} mr={2}>
                            <Flex _hover={{ cursor: "pointer" }} w={"35px"} h={"35px"} bg={"#064A73"} borderRadius={"25px"} justifyContent={"center"} alignItems={"center"} 
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = `/categoria/${inputSearch.toUpperCase()}`;
                                }}>
                                <SearchIcon color='#FFF' />
                            </Flex>
                        </InputRightElement>
                    </InputGroup>
                    <Flex mt={8} flexDirection={"column"} w={"344px"}>
                        <Flex p={"15px"} bg={"#EFEFEF"} borderRadius={"5px 5px 0px 0px"} border={"1px solid #B9B9B9"}>
                            <Text fontSize={"14px"} fontWeight={600}>Filtros</Text>
                        </Flex>
                        <Flex flexDirection={"column"} bg={"#EFEFEF"} pb={"15px"} pt={"25px"} borderRadius={"0px 0px 5px 5px"} border={"1px solid #B9B9B9"}>
                            <Flex flexDirection={"column"} pl={"15px"}>
                                <Text fontSize={"14px"} fontWeight={600} mb={5}>Tipo de producto</Text>
                                {filterList && filterList.map((element, idx) => (
                                    <Text key={idx} fontSize={"14px"} fontWeight={400} mb={5} cursor={'pointer'} 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/categoria/${element.category.toUpperCase()}`;
                                        }}>{capitalizeFirstLetter(element.category)}</Text>
                                ))}
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
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex pl={10} pb={10}>
                        <ArticlesPerPage />
                        <OrderBy />
                    </Flex>
                    <Grid templateColumns={products.length > 0 ? "repeat(3, 1fr)" : "repeat(1, 1fr)"}>
                        {products.length > 0 ? products.map((item, idx) => {
                            if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.retail_price ) {
                                return(
                                    <GridItem key={idx}>
                                        <ProductCard product={item} />
                                    </GridItem>
                                )
                            }
                        })
                        : 
                        <Stack direction="row" alignItems="center">
                            <Box textAlign="center" py={6} px={3}>
                                <img src={logoGif} width={"400px"} height={"150px"} alt="Cargando" />
                            </Box>
                        </Stack>
                    }
                    </Grid>
                    {products.length > 0 && !isLoading ? 
                        <Flex mt={10} pl={10}>
                            <ArticlesPerPage />
                            <OrderBy />
                        </Flex>
                    : null}
                </GridItem>
            </Grid>
        </>
    );
}
 
export default CategoriesDkst;
