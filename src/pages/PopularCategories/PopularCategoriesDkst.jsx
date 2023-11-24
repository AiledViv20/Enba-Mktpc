import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Grid,
    Box,
    Stack,
    Button
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { colors_complement, colors } from '../../resource';
import { capitalizeFirstLetter } from '../../resource/validate';
import ProductCard from '../../components/ProductCard';
import OrderBy from './OrderBy';
import { useGetSearchTemporalityMMutation } from '../../hooks/enbaapi';
import { useParams } from 'react-router-dom';

import logoGif from '../../assets/icons/logo.gif';
import iconNotFound from '../../assets/icons/iconNotFound.svg';

import './styled.css';

const PopularCategoriesDkst = () => {
    const params_url = useParams();
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState([]);
    const [productsDefault, setProductsDefault] = useState([]);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState(params_url.name);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState('ASC');
    const [changeFirstValue, setChangeFirstValue] = useState(true);
    const [params, setParams] = useState({
        take: 250,
        page: 0,
        color: "",
        temporality: "NAVIDAD",
        name: "",
        order: order
    });
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [getSearchTemporality] = useGetSearchTemporalityMMutation();

    useEffect(() => {
        setParams({
            take: 250,
            page: 0,
            color: colorSelected,
            temporality: "NAVIDAD",
            name: "",
            order: order
        })
    },[colorSelected]);

    useEffect(() => {
        setIsLoading(true)
        setData(null)
        getSearchTemporality(params)
        .unwrap()
        .then((data) => {
            setData(data);
            setChangeFirstValue(true)
            setIsLoading(false)
        })
    },[params])

    useEffect(() => {
        setLoading(true);
        if (products.length > 0) {
            let sortedData = [];
            if (order === "ASC") {
                sortedData = [...products].sort((a, b) => parseFloat(a.wholesale_price) - parseFloat(b.wholesale_price));
            } else {
                sortedData = [...products].sort((a, b) => parseFloat(b.wholesale_price) - parseFloat(a.wholesale_price));
            }
            setProducts(sortedData);
            setLoading(false);
        }
    }, [order]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
            setLoading(true);
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
            setLoading(true);
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

    return ( 
        <>
            <Flex width={"30%"} flexDirection={"column"}>
                <InputGroup border={"transparent"} mt={8}>
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
                <Flex mt={8} flexDirection={"column"}>
                    <Flex p={"15px"} bg={"#EFEFEF"} borderRadius={"5px 5px 0px 0px"} border={"1px solid #B9B9B9"}>
                        <Text fontSize={"14px"} fontWeight={600}>Filtros</Text>
                    </Flex>
                    <Flex flexDirection={"column"} bg={"#EFEFEF"} pb={"15px"} pt={"25px"} borderRadius={"0px 0px 5px 5px"} border={"1px solid #B9B9B9"}>
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
                                zIndex={1}
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
                                zIndex={1}
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
            </Flex>
            <Flex width={"70%"} flexDirection={"column"}>
                <Flex pb={10}>
                    <OrderBy
                        order={order}
                        setOrder={setOrder} />
                    <Flex zIndex={1} w={"100%"} justifyContent={"end"}>
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
                                    totalPages.slice(((currentPage >= totalPages.length - 1) && (currentPage !== 1) ? currentPage - 2 : currentPage - 1 ), currentPage + 2).map((item, idx) => {
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
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(2, 1fr)", '2xl': "repeat(3, 1fr)"}} gap={6} justifyItems={"center"} zIndex={1} alignSelf={"center"}>
                    {currentProducts.length > 0 && !loading ? currentProducts.map((item, idx) => {
                        if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.wholesale_price ) {
                            return(
                                <Flex key={idx}>
                                    <ProductCard product={item} />
                                </Flex>
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
                        <OrderBy
                            order={order}
                            setOrder={setOrder} />
                    </Flex>
                : null}
            </Flex>
        </>
    );
}
 
export default PopularCategoriesDkst;