import React, { useState, useEffect } from 'react';
import { 
    Flex, 
    Box, 
    Image
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Miniature from '../ProductSelect/Miniature';
import Description from './Description';
import DescriptionKit from './DescriptionKit';
import Characteristics from '../ProductSelect/Characteristics';
import { useGetKitQuery } from '../../hooks/enbaapi';

const InfoKit = ({ props }) => {
    const params_url = useParams();
    const [images, setImages] = useState(null);
    const [colors, setColors] = useState([]);
    const [idx, setIdx] = useState(0);
    const [img, setImg] = useState(null);
    const [product, setProduct] = useState(null);
    const params = {
        sku: params_url.product
    }
    const { data: kit, isKitLoading, kitError } = useGetKitQuery({ name: params.sku});

    console.log(kit)
    useEffect(() => {
        if(kit){
            setProduct(kit);
            setImg(kit?.products[0]?.images?.product_images[0] || kit?.products[0]?.images?.vector_images[0]);
            const images_ = [];
            const colors_ = [];
            if(kit?.products[0]?.images?.product_images[0])
                images_.push(kit?.products[0]?.images?.product_images[0]);
            if(kit?.products[0]?.images?.vector_images[0])
                images_.push(kit?.products[0]?.images?.vector_images[0]);
                kit.products[0].items.map((item)=>{
                    images_.push(...item.images.images_item)
                    colors_.push({sku: item.sku, color: item.color})
                })
            setColors(colors_);
            setImages(images_);
        }
    },[kit])

    useEffect(() => {
        if(images){
            setImg(images[idx]);
        }
    },[idx])

    return ( 
        <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} pb={20} position="relative">
            {
                product && (
                    <Flex p={10} justifyContent={"space-between"}>
                        <Miniature images={images} setImg={setImg} setIdx={setIdx} idx={idx}/>
                        <Flex pl={10}>
                            <Image src={img} width={"442"} height={"442"} alt='image product'/>
                        </Flex>
                        <Description data={product.products[0]} colors={colors}/>
                    </Flex>
                )
            }
            {
                product && (
                    <DescriptionKit data={product.products[0]}/>
                )
            }
            {
                product && (
                    <Characteristics 
                        kit={true} data={product.products[0]} />
                )
            }
        </Box>
    );
}
 
export default InfoKit;
