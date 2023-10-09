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
    Stack,
    Heading
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

const PopularCategoriesDkst = () => {
    const params_url = useParams();
    const [products, setProducts] = useState([]);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState(params_url.product_name);
    const  param_category = params_url.category === 'Todas' ? "" : params_url.category;
    const [order, setOrder] = useState('ASC');
    const [artPerPage, setArtPerPage] = useState(25);
    const [page, setPage] = useState(0);
    const [filterList, setFilterList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        take: artPerPage,
        page: page,
        color: colorSelected,
        category: param_category,
        name: inputSearch,
        order: order
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
        if(data){
            setProducts(data);
        }
    },[data]);

    useEffect(() => {
        if(products.length > 0){
            const filterProducts = products.filter((element) => element.stock !== "0");
            setProducts(filterProducts);
        }
    },[products]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setParams({
                take: artPerPage,
                page: page,
                color: colorSelected,
                category: params_url.category === 'Todas' ? "" : params_url.category,
                name: inputSearch,
                order: order
            });
            setLoading(false);
        }, 1500);
    },[colorSelected, order, artPerPage]);

    return ( 
        <>
            <Flex width={"25%"} flexDirection={"column"}>
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
                                window.location.href = `/categoria/${inputSearch.toUpperCase()}`;
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
                    </Flex>
                </Flex>
            </Flex>
            <Flex width={"75%"} flexDirection={"column"}>
                <Flex pl={10} pb={10}>
                    <ArticlesPerPage setArtPerPage={setArtPerPage} />
                    <OrderBy setOrder={setOrder}/>
                </Flex>
                <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}} alignSelf={"center"}>
                    {products && !loading ? products.map((item, idx) => {
                        if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.retail_price ) {
                            return(
                                <Flex key={idx} zIndex={1}>
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
                    <Flex mt={10} pl={10}>
                        <ArticlesPerPage setArtPerPage={setArtPerPage} />
                        <OrderBy setOrder={setOrder} />
                    </Flex>
                : null}
            </Flex>
        </>
    );
}
 
export default PopularCategoriesDkst;