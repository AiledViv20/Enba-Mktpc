import React, { useState } from 'react';
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

import { productsTemplate } from '../../resource';
import Characteristics from '../../components/ProductSelect/Characteristics';

const Product = ({ props }) => {
    const [urlCategory, setUrlCategory] = useState(window.location.pathname);
    const [images, setImages] = useState(null);
    const [idx, setIdx] = useState(0);
    const [img, setImg] = useState(null);
    const [product, setProduct] = useState(null);
    const params = {
        sku: params_url.product
    }
    const {data, isLoading, error} = useGetProductQuery(params);

    useEffect(() => {
        if(data){
            //console.log(data);
            setProduct(data);
            setImg(data?.images?.product_images[0] || data?.images?.vector_images[0]);
            const images_ = [];
            if(data?.images?.product_images[0])
                images_.push(data?.images?.product_images[0]);
            if(data?.images?.vector_images[0])
                images_.push(data?.images?.vector_images[0]);
            data.items.map((item)=>{
                images_.push(...item.images.images_item)
            })
            console.log(images_)
            setImages(images_);
        }
    },[data])


    useEffect(() => {
        setImg(images[idx]);
    },[idx])



    const toTextTransform = (txt) => {
        let listUrl = txt.split("/");
        return listUrl[2];
    }

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} pb={20} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / ${toTextTransform(urlCategory)}`}
                    </Text>
                </Flex>
                {
                    product && (
                        <Flex p={10}>
                            <Miniature images={images} setImg={setImg} setIdx={setIdx} idx={idx}/>
                            <Flex pl={10}>
                                <Image src={img} width={"442"} height={"442"} alt='image product'/>
                            </Flex>
                            <Description data={product}/>
                        </Flex>
                    )
                }
                {
                    product && (
                        <Characteristics data={product}/>
                    )
                }
            </Box>
            <RecommendedProducts 
                titleSection={"Productos relacionados"}
                productsTemplate={productsTemplate} />
            <Footer />
        </>
    );
}
 
export default Product;