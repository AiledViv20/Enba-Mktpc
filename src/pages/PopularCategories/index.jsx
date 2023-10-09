import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Box,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Grid,
    Spinner
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { colors_complement, colors } from '../../resource';
import ProductCard from '../../components/ProductCard';
import ArticlesPerPage from '../../components/filters/ArticlesPerPage';
import OrderBy from '../../components/filters/OrderBy';
import Footer from '../../components/Footer';

import ConfettiGenerator from "confetti-js";

import banner from '../../assets/images/banner/categoriaspop/img1.png';

import { useGetSearchQuery } from '../../hooks/enbaapi';
import { useParams } from 'react-router-dom';

const PopularCategories = ({ props }) => {
    const [stopAnimation, setStopAnimation] = useState(false);

    const params_url = useParams();
    const [products, setProducts] = useState(null);
    const [colorSelected, setColorSelected] = useState("");
    const [inputSearch, setInputSearch] = useState(params_url.product_name);
    const  param_category = params_url.category === 'Todas' ? "" : params_url.category;
    const [order, setOrder] = useState('ASC');
    const [artPerPage, setArtPerPage] = useState(25);
    const [page, setPage] = useState(0);
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
        if(data){
            setProducts(data);
        }
    },[data]);

    useEffect(() => {
        if(products){
            const filterProducts = products.filter((element) => element.stock !== "0");
            setProducts(filterProducts);
        }
    },[products]);

    useEffect(() => {
        setParams({
            take: artPerPage,
            page: page,
            color: colorSelected,
            category: params_url.category === 'Todas' ? "" : params_url.category,
            name: inputSearch,
            order: order
        })
    },[colorSelected, order, artPerPage])

    useEffect(() => {
        const confettiSettings = {target:"confetti-holder",max:"80",size:"1",animate:true,props:["circle","square","triangle","line"],colors:[[255,0,0],[93,255,0],[255,240,0],[225,225,225]],clock:"25",rotate:true,width:"1920",height:"931",start_from_edge:false,respawn:true};
    
        // Verifica si el elemento canvas existe
        const canvasElement = document.getElementById(confettiSettings.target);
        if (!canvasElement) {
          console.error(`El elemento canvas con el ID "${confettiSettings.target}" no existe.`);
          return;
        }
    
        // Crea una instancia de confetti-js solo si el elemento canvas existe
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(() => {
            setStopAnimation(true);
        }, 16000);
    }, []);

    return ( 
        <>
            <Flex width={"100%"} flexDirection={"column"} position={"relative"}>
                <Flex pt={10} color={"#424242"} fontWeight={400} flexDirection={"column"} padding={"2rem 5%"}>
                    <Text mb={10} fontSize={"16px"}>Home / Categoría popular</Text>
                </Flex>
                <Box w="full" mx="auto" maxW="3x1" {...props} padding={"0px 5%"} pb={20} position="relative">
                    <Flex
                        w="100%"
                        h="354px"
                        backgroundImage={`url(${banner})`}
                        backgroundSize="cover"
                        backgroundPosition="center center"
                        backgroundRepeat="no-repeat"
                        backgroundColor="gray.100"
                        position="relative"
                        p="0"
                        borderRadius="20px">
                        <Flex borderRadius="20px" height='100%' w='100%' backgroundColor={"#0000002e"}></Flex>
                        <Flex
                            height="100vh"
                            width={"100%"}
                            top={"40"}
                            justifyContent={"center"}
                            position="absolute">
                            <Flex flexDirection="column" alignItems={"center"} color={"#FFF"}>
                                <Text textAlign={"center"} fontWeight={700} fontSize={'39px'}>
                                    Fiestas patrias
                                </Text>
                            </Flex>
                        </Flex>
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
                                {products && !isLoading ? products.map((item, idx) => {
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
                </Flex>
                </Box>
            </Flex>
            <Footer />
        </>
    );
}
 
export default PopularCategories;