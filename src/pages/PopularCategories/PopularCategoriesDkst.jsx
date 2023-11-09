import React, { useEffect, useState, useContext } from 'react';
import { 
    Flex,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Grid,
    Box,
    Stack
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { colors_complement, colors } from '../../resource';
import { categoriesList } from '../../resource/save';
import { capitalizeFirstLetter } from '../../resource/validate';
import ProductCard from '../../components/ProductCard';
import OrderBy from '../../components/filters/OrderBy';
import { useGetSearchTemporalityQuery } from '../../hooks/enbaapi';
import { useParams } from 'react-router-dom';

import { CardFilterContext } from '../../context';

import logoGif from '../../assets/icons/logo.gif';
import iconNotFound from '../../assets/icons/iconNotFound.svg';

const PopularCategoriesDkst = () => {
    const params_url = useParams();
    const [products, setProducts] = useState([]);
    const { state } = useContext(CardFilterContext);
    const [productsDefault, setProductsDefault] = useState([]);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState(params_url.name);
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
    const {data, isLoading, error} = useGetSearchTemporalityQuery(params);

    useEffect(() => {
        if (data && changeFirstValue) {
            setProducts(data);
            setProductsDefault(data);
            setChangeFirstValue(false);
            setTimeout(() => {
                setLoading(false);
            }, 8000);
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
                let filterProductsByColor = productsDefault.filter((element) => {
                    if (element.color.includes(colorSelected)) {
                        return element;
                    }
                });
                filterProductsByColor = filterProductsByColor.filter((element) => element.stock !== "0");
                setProducts(filterProductsByColor);
            }
            setLoading(false);
        }
    },[colorSelected, state]);

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
            <Flex width={"75%"} flexDirection={"column"}>
                <Flex pb={10}>
                    <OrderBy />
                </Flex>
                <Grid templateColumns={products.length > 0 ? "repeat(3, 1fr)" : "repeat(1, 1fr)"} alignSelf={"center"}>
                    {products.length > 0 && !loading ? products.map((item, idx) => {
                        if((item?.items?.length > 0 && (item?.images?.product_images?.length > 0 || item?.images?.vector_images?.length > 0)) || item?.retail_price ) {
                            return(
                                <Flex key={idx}>
                                    <ProductCard product={item} />
                                </Flex>
                            )
                        }
                    })
                        : null
                    }
                    {loading && products.length === 0 ?
                        <Stack direction="row" alignItems="center">
                            <Box textAlign="center" py={6} px={3}>
                                <img src={logoGif} width={"400px"} height={"150px"} alt="Cargando" />
                            </Box>
                        </Stack>
                        : null
                    }
                    {!loading && products.length === 0 ? 
                        <Flex w={"840px"} flexDirection={"column"}>
                                <Flex justifyContent={"center"} mb={5}>
                                <img src={iconNotFound} width={"102px"} height={"100px"} alt='icon'/>
                            </Flex>
                            <Flex flexDirection={"column"} textAlign={"center"}>
                                <Text lineHeight={1.2} fontSize={"25px"}>
                                    <Text as={"b"}>¡Lo sentimos!</Text><br />
                                    No encontramos lo que estas buscando, Intenta de nuevo
                                </Text>
                            </Flex>
                        </Flex> : null
                    }
                </Grid>
                {products.length > 0 && !isLoading ? 
                    <Flex mt={10}>
                        <OrderBy />
                    </Flex>
                : null}
            </Flex>
        </>
    );
}
 
export default PopularCategoriesDkst;