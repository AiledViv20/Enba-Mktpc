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
    GridItem,
    Button,
    Container
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { colors_complement, colors } from '../../resource';
import { categoriesList } from '../../resource/save';
import { capitalizeFirstLetter } from '../../resource/validate';
import ProductCard from '../../components/ProductCard';
import OrderBy from '../../components/filters/OrderBy';
import { useGetSearchQuery } from '../../hooks/enbaapi';
import { useParams } from 'react-router-dom';

import { CardFilterContext } from '../../context';

import logoGif from '../../assets/icons/logo.gif';
import iconNotFound from '../../assets/icons/iconNotFound.svg';

import './styled.css';

const CategoriesDkst = () => {
    const params_url = useParams();
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [products, setProducts] = useState([]);
    const { state } = useContext(CardFilterContext);
    const [productsDefault, setProductsDefault] = useState([]);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState(params_url.name);
    const  param_category = params_url.category === 'Todas' ? "" : params_url.category;
    const [filterList, setFilterList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changeFirstValue, setChangeFirstValue] = useState(true);
    const [params, setParams] = useState({
        take: 250,
        page: 0,
        color: colorSelected,
        category: param_category ? param_category : "",
        name: inputSearch ? inputSearch : "",
        order: state.order
    });
    const {data, isLoading, error} = useGetSearchQuery(params);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
        setLoading(true);
        if (products.length > 0) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentProductsTemp = products.slice(startIndex, endIndex);
            setCurrentProducts(currentProductsTemp);
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [currentPage]);

    useEffect(() => {
        if (data && changeFirstValue) {
            setProducts(data);
            setProductsDefault(data);
            setChangeFirstValue(false);
        }
    },[data]);

    useEffect(() => {
        if (productsDefault.length > 0) {
            let filterProducts = productsDefault.filter((element) => element.stock !== "0");
            setProducts(filterProducts);
            if (products.length > 0) {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentProductsTemp = products.slice(startIndex, endIndex);
                const totalPagesTemp = Math.ceil(products.length / itemsPerPage);
                setCurrentProducts(currentProductsTemp);
                //setTotalPages(totalPagesTemp);
                setTotalPages(Array.from({ length: totalPagesTemp }, (_, i) => (i + 1)))
                setTimeout(() => {
                    setLoading(false);
                }, 8000);
            }
        }
    }, [productsDefault]);

    useEffect(() => {
        if (products.length > 0) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentProductsTemp = products.slice(startIndex, endIndex);
            const totalPagesTemp = Math.ceil(products.length / itemsPerPage);
            setCurrentProducts(currentProductsTemp);
            //setTotalPages(totalPagesTemp);
            setTotalPages(Array.from({ length: totalPagesTemp }, (_, i) => (i + 1)))
            setTimeout(() => {
                setLoading(false);
            }, 8000);
        }
    }, [products]);

    useEffect(() => {
        if (productsDefault.length > 0) {
            setLoading(true);
            if (colorSelected !== "") {
                let filterProductsByColor = productsDefault.filter((element) => {
                    if (element.color.includes(colorSelected)) {
                        return element;
                    }
                });
                filterProductsByColor = filterProductsByColor.filter((element) => element.stock !== "0");
                if (filterProductsByColor.length > 0) {
                    setProducts(filterProductsByColor);
                } else {
                    setCurrentProducts([]);
                }
            }
            setLoading(false);
        }
    },[colorSelected, state]);

    return ( 
        <>
            <Grid
                templateColumns={currentProducts.length <= 2 ? 'repeat(5, 1fr)' : "repeat(5, 1fr)"}
                gap={4}> 
                <GridItem colSpan={2}>
                    <Text fontSize={"16px"} fontWeight={700} lineHeight={1.2}>
                        {params_url.category ? params_url.category : capitalizeFirstLetter(inputSearch)}
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
                                    window.location.href = `/categoria/code/${inputSearch.toUpperCase()}`;
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
                                            window.location.href = `/categoria/search/${element.category.toUpperCase()}`;
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
                <GridItem colSpan={3}>
                    <Flex pb={10}>
                        <OrderBy />
                        <Flex w={"100%"} justifyContent={"end"}>
                            {totalPages.length > 0 ? (
                                <ul className="pagination">
                                    <li key={'back'}>
                                        <Button 
                                            onClick={() => handlePageChange(currentPage -1)}
                                            isDisabled={currentPage === 1 ? true: false}
                                            
                                        >
                                                 {'<'} 
                                        </Button>
                                    </li>
                                    {/*Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i} className={i + 1 === currentPage ? "active" : ""}>
                                            <button onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                        </li>
                                    ))*/}
                                    {
                                        totalPages.slice((currentPage >= totalPages.length - 1 ? currentPage - 2 : currentPage - 1 ), currentPage + 2).map((item, idx) => {
                                            return (
                                                <li key={idx} className={item === currentPage ? "active" : ""}>
                                                    <button onClick={() => handlePageChange(item)}>{item}</button>
                                                </li>
                                            )
                                        })
                                    }
                                    <li key={'next'}>
                                        <Button 
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            isDisabled={currentPage === totalPages.length}
                                        > 
                                            {'>'} 
                                        </Button>
                                    </li>
                                </ul>
                            ) : null}
                        </Flex>
                    </Flex>
                    <Grid templateColumns={currentProducts.length > 0 ? "repeat(3, 1fr)" : "repeat(1, 1fr)"}>
                        {currentProducts.length > 0 ? currentProducts.map((item, idx) => {
                            if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.retail_price ) {
                                return(
                                    <GridItem key={idx}>
                                        <ProductCard product={item} />
                                    </GridItem>
                                )
                            }
                        })
                            : null
                        }
                        {loading && currentProducts.length === 0 ?
                            <Stack direction="row" alignItems="center">
                                <Box textAlign="center" py={6} px={3}>
                                    <img src={logoGif} width={"400px"} height={"150px"} alt="Cargando" />
                                </Box>
                            </Stack>
                            : null
                        }
                        {!loading && currentProducts.length === 0 ? 
                            <Flex w={"840px"} flexDirection={"column"}>
                                    <Flex justifyContent={"center"} mb={5}>
                                    <img src={iconNotFound} width={"102px"} height={"100px"} alt='icon'/>
                                </Flex>
                                <Flex flexDirection={"column"} textAlign={"center"}>
                                    <Text lineHeight={1.2} fontSize={"25px"}>
                                        <Text as={"b"}>¡Lo sentimos!</Text><br />
                                        No encontramos lo que estas buscando, intenta de nuevo
                                    </Text>
                                </Flex>
                            </Flex> : null
                        }
                    </Grid>
                    {currentProducts.length > 0 && !isLoading ? 
                        <Flex mt={10}>
                            <OrderBy />
                        </Flex>
                    : null}
                </GridItem>
            </Grid>
        </>
    );
}
 
export default CategoriesDkst;
