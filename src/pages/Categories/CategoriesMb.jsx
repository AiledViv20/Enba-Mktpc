import React, { useEffect, useState, useContext } from 'react';
import { 
    Flex, 
    Box, 
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Grid,
    Stack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button
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

const CategoriesMb = () => {
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
            <Flex flexDirection={"column"}>
                <Text fontSize={"14px"} fontWeight={700} lineHeight={1.2}>
                    {params_url.category ? params_url.category : capitalizeFirstLetter(inputSearch)}
                </Text>
                <Accordion allowMultiple border={"transparent"}>
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
                                            window.location.href = `/categoria/code/${inputSearch.toUpperCase()}`;
                                        }}>
                                        <SearchIcon w={"15px"} h={"15px"} color='#FFF' />
                                    </Flex>
                                </InputRightElement>
                            </InputGroup>
                            <Flex mt={8} flexDirection={"column"}>
                                <Flex flexDirection={"column"} pl={"15px"}>
                                    <Text fontSize={"14px"} fontWeight={600} mb={5}>Tipo de producto</Text>
                                    {filterList && filterList.map((element, idx) => (
                                        <Text key={idx} fontSize={"14px"} fontWeight={400} mb={5} cursor={'pointer'} 
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            window.location.href = `/categoria/search/${element.category.toUpperCase()}`;
                                        }}>{capitalizeFirstLetter(element.category)}
                                        </Text>
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
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Flex>
            <Flex flexDirection={"column"}>
                <Flex pt={5} pb={10} zIndex={1} flexDirection={"column"}>
                    <OrderBy
                        setLoading={setLoading}
                        currentProducts={currentProducts}
                        setCurrentProducts={setCurrentProducts} />
                    <Flex w={"100%"} justifyContent={"center"}>
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
                <Grid templateColumns={"repeat(1, 1fr)"} alignSelf={"center"}>
                    {currentProducts.length > 0 ? currentProducts.map((item, idx) => {
                        if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.wholesale_price ) {
                            return(
                                <Flex key={idx}>
                                    <ProductCard product={item} color={colorSelected} search={inputSearch} isFromSearch={true}/>
                                </Flex>
                            )
                        }
                    })
                        : null
                    }
                    {loading && currentProducts.length === 0 ?
                        <Stack direction="row" alignItems="center">
                            <Box textAlign="center" py={6} px={3}>
                                <img src={logoGif} width={"100%"} height={"150px"} alt="Cargando" />
                            </Box>
                        </Stack>
                        : null
                    }
                    {!loading && currentProducts.length === 0 ? 
                        <Flex w={"100%"} flexDirection={"column"}>
                            <Flex justifyContent={"center"} mb={5}>
                                <img src={iconNotFound} width={"80px"} height={"80px"} alt='icon'/>
                            </Flex>
                            <Flex flexDirection={"column"} textAlign={"center"}>
                                <Text lineHeight={1.2} fontSize={"16px"}>
                                    <Text as={"b"}>¡Lo sentimos!</Text><br />
                                    No encontramos lo que estas buscando,<br />intenta de nuevo
                                </Text>
                            </Flex>
                        </Flex> : null
                    }
                </Grid>
            </Flex>
        </>
    );
}
 
export default CategoriesMb;
