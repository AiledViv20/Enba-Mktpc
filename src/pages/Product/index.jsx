import React, { useEffect, useState } from 'react';
import { 
    Flex, 
    Box, 
    Text,
    Image
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import RecommendedProducts from '../../components/RecommendedProducts';
import Footer from '../../components/Footer';
import Miniature from '../../components/ProductSelect/Miniature';
import Description from '../../components/ProductSelect/Description';
import imgT from '../../assets/images/productsT/img-select.png';
import { useParams } from 'react-router-dom';
import { useGetProductQuery, useGetSearchQuery } from '../../hooks/enbaapi';

import { productsTemplate } from '../../resource';
import Characteristics from '../../components/ProductSelect/Characteristics';

const Product = ({ props }) => {
    const params_url = useParams();
    const [urlCategory, setUrlCategory] = useState(window.location.pathname);
    const [images, setImages] = useState(null);
    const [colors, setColors] = useState([]);
    const [idx, setIdx] = useState(0);
    const [img, setImg] = useState(null);
    const [product, setProduct] = useState(null);
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
    const {data: dataRecommended, isLoading: isLoadingRecommended, error: errorRecommended} = useGetSearchQuery(paaramsRecommended);
    
    useEffect(() => {
        if(dataRecommended){
            let products_ = dataRecommended.filter((item)=>item.product_sku !== params_url.product)
            setProductRecommended(products_);
        }
    },[dataRecommended])

    useEffect(() => {
        if(data){
            setProduct(data);
            setParamsRecommended({
                    take: 12,
                    page: 0,
                    color: "",
                    category: data.category,
                    name: "",
                    order: 'DESC'
            })
            setImg(data?.images?.product_images[0] || data?.images?.vector_images[0]);
            const images_ = [];
            const colors_ = [];
            if(data?.images?.product_images[0])
                images_.push(data?.images?.product_images[0]);
            if(data?.images?.vector_images[0])
                images_.push(data?.images?.vector_images[0]);
            data.items.map((item)=>{
                images_.push(...item.images.images_item)
                colors_.push({sku: item.sku, color: item.color})
            })
            setColors(colors_);
            setImages(images_);
        }
    },[data])


    useEffect(() => {
        if(images){
            setImg(images[idx]);
        }
    },[idx])

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} pb={20} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / ${params_url.product}`}
                    </Text>
                </Flex>
                {
                    product && (
                        <Flex p={10} justifyContent={"space-between"}>
                            <Miniature images={images} setImg={setImg} setIdx={setIdx} idx={idx}/>
                            <Flex pl={10}>
                                <Image src={img} width={"442"} height={"442"} alt='image product'/>
                            </Flex>
                            <Description data={product} colors={colors}/>
                        </Flex>
                    )
                }
                {
                    product && (
                        <Characteristics data={product}/>
                    )
                }
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