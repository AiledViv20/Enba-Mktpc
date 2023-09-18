import React, { useEffect, useState } from 'react';
import { 
    Flex, 
    Box, 
    Text,
} from '@chakra-ui/react';
import RecommendedProducts from '../../components/RecommendedProducts';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import { useGetSearchQuery } from '../../hooks/enbaapi';
import InfoKit from '../../components/Kit/InfoKit';
import AddProductsKit from '../../components/Kit/AddProductsKit';
import KitIncludes from '../../components/Kit/KitIncludes';

const Kit = ({ props }) => {
    const params_url = useParams();
    const [productRecommended, setProductRecommended] = useState(null);
    const [paaramsRecommended, setParamsRecommended] = useState({
        take: 12,
        page: 0,
        color: "",
        category: "",
        name: "",
        order: 'DESC'
    });
    const {data: dataRecommended, isLoading: isLoadingRecommended, error: errorRecommended} = useGetSearchQuery(paaramsRecommended);
    
    useEffect(() => {
        if(dataRecommended){
            let products_ = dataRecommended.filter((item)=>item.product_sku !== params_url.product)
            setProductRecommended(products_);
        }
    },[dataRecommended])

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 5%"} pb={0} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / ${params_url.product}`}
                    </Text>
                </Flex>
            </Box>
            <InfoKit />
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
 
export default Kit;
