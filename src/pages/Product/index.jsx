import React, { useEffect, useState } from 'react';
import { 
    Box,
    useTheme,
    useMediaQuery,
    Flex
} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import { useGetProductQuery, useGetSearchRecomendationsQuery } from '../../hooks/enbaapi';

import RecommendedProducts from '../../components/RecommendedProducts';
import Footer from '../../components/Footer';

import ProductDkst from './ProductDkst';
import ProductMb from './ProductMb';

const Product = ({ props }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const params_url = useParams();
    const [productRecommended, setProductRecommended] = useState(null);
    const params = {
        sku: params_url.product
    }
    const {data, isLoading, error} = useGetProductQuery(params);
    const [paaramsRecommended, setParamsRecommended] = useState({
        take: 12,
        page: 0,
        color: "",
        category: "",
        name: "",
        order: 'DESC'
    });
    const {data: dataRecommended, isLoading: isLoadingRecommended, error: errorRecommended} = useGetSearchRecomendationsQuery(paaramsRecommended);
    
    useEffect(() => {
        if(dataRecommended){
            let products_ = dataRecommended.filter((item)=>item.product_sku !== params_url.product)
            setProductRecommended(products_);
        }
    },[dataRecommended])

    useEffect(() => {
        if(data){
            setParamsRecommended({
                    take: 12,
                    page: 0,
                    color: "",
                    category: data.category,
                    name: "",
                    order: 'DESC'
            })
        }
    },[data])

    return ( 
        <>
            <Box flexDirection={"column"} display={isGreaterThanMd ? "flex" : "none"} color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} pb={20} position="relative">
                <ProductDkst />
            </Box>
            <Box display={isGreaterThanMd ? "none" : "flex"} color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} pb={20} position="relative">
                <ProductMb/>
            </Box>
            {
                productRecommended && (
                    <RecommendedProducts 
                        titleSection={"Productos relacionados"}
                        data={productRecommended} 
                    />       
                )
            }
            <Footer />
        </>
    );
}
 
export default Product;