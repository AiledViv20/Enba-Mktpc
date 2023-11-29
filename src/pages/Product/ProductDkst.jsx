import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Text,
    Stack,
    Skeleton
} from '@chakra-ui/react';
import { colors_dict } from '../../resource';
import Miniature from '../../components/ProductSelect/Miniature';
import Description from '../../components/ProductSelect/Description';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../hooks/enbaapi';

import ZoomImage from '../../components/ProductSelect/ZoomImage';

import Characteristics from '../../components/ProductSelect/Characteristics';
import imgDefault from '../../assets/images/productsT/none-product.png';

const ProductDkst = () => {
    const params_url = useParams();
    const [images, setImages] = useState(null);
    const [colors, setColors] = useState([]);
    const [colorsProduct, setColorsProduct] = useState([]);
    const [changeFirst, setChangeFirst] = useState(true);
    const [idx, setIdx] = useState(0);
    const [img, setImg] = useState('');
    const [product, setProduct] = useState(null);
    const params = {
        sku: params_url.product
    }
    const {data, isLoading, error} = useGetProductQuery(params);

    useEffect(() => {
        if(data){
            setProduct(data);
            const images_ = [];
            const colors_ = [];
            if(data?.images?.product_images[0])
                images_.push(data?.images?.product_images[0]);
            if(data?.images?.vector_images[0])
                images_.push(data?.images?.vector_images[0]);
            data.items.map((item)=>{
                images_.push(...item?.images?.images_item ? (Object.keys(item?.images?.images_item).length > 0 ? item?.images?.images_item : []) : [])
                colors_.push({sku: item?.sku, color: item?.color})
            })
            setColors(colors_);
            setImages(images_);
        }
    },[data])

    useEffect(() => {
        const colors_ar = []
        colors.map((item)=>{
            let color_ = ''
            colors_dict.filter((color)=>{
                if(item.color.includes(color.color)){
                    color_ = [{
                        sku: item.sku,
                        color: item.color,
                        hex: color.hex
                    }]
                }
            })
            if(!color_[0]){
                color_ = [{
                        sku: item.sku,
                        color: item.color,
                        hex: '#444444'
                }]
            }
            colors_ar.push(color_[0])
        });
        if (colors_ar.length > 0 && changeFirst) {
            const imgPreviewColor = colors_ar.slice(0, 1);
            const filterProductColors = product?.items.filter(item => item.color === imgPreviewColor[0].color);
            const imgUrl = filterProductColors[0].images?.images_item[0];
            setImg(imgUrl)
            setChangeFirst(false);
        }
        setColorsProduct(colors_ar);
    },[colors]);

    useEffect(() => {
        if (!img){
            if(images?.length > 0){
                setImg(images[0]);
                setIdx(0);
            }else{
                setImg(imgDefault);
                setIdx(0);
            }
            
        }
    },[img])

    return ( 
        <>
            <Flex>
                <Text fontSize={"16px"} fontWeight={400} display={"flex"}>
                    <Text _hover={{ cursor: "pointer" }} onClick={() => window.location.href = "/"} mr={2}>{"Inicio /"}</Text>{`${params_url.product}`}
                </Text>
            </Flex>
            {
                (isLoading || !product) ? (
                    <Stack p={10} justifyContent={"space-between"}>
                        <Flex gap={2}>
                            <Skeleton height={"500px"} width={"10%"} />
                            <Skeleton height={"500px"} width={"55%"} />
                            <Skeleton height={"500px"} width={"35%"} />
                        </Flex>
                        <Skeleton height={"300px"} width={"100%"} />
                        <Skeleton height={"300px"} width={"100%"} />
                    </Stack>
                ) : (
                    <>
                    {
                        product && (
                            <Flex p={10} justifyContent={"space-between"}>
                                <Miniature images={images} setImg={setImg} setIdx={setIdx} idx={idx}/>
                                <Flex pl={10} width={"442px"} height={"442px"}>
                                    <ZoomImage src={img} alt={'image product'} />
                                </Flex>
                                <Description
                                    previewImage={img}
                                    setImg={setImg}
                                    images={images} 
                                    data={product} 
                                    colors={colors}
                                    colorsProduct={colorsProduct} />
                            </Flex>
                        )
                    }
                    {
                        product && (
                            <Characteristics 
                                data={product} 
                                colorsProduct={colorsProduct}
                                previewImage={img} />
                        )
                    }

                    </>
                )
            }
        </>
    );
}
 
export default ProductDkst;