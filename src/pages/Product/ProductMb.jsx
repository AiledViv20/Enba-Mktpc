import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Spinner
} from '@chakra-ui/react';
import { colors_dict } from '../../resource';

import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../hooks/enbaapi';

import MiniatureMb from '../../components/ProductSelect/Mb/MiniatureMb';
import DescriptionMb from '../../components/ProductSelect/Mb/DescriptionMb';
import CharacteristicsMb from '../../components/ProductSelect/Mb/CharacteristicsMb';
import imgDefault from '../../assets/images/productsT/none-product-white.png';

const ProductMb = () => {
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
            //setImg(data?.images?.product_images[0] || data?.images?.vector_images[0]);
            const images_ = [];
            const colors_ = [];
            if(data?.images?.product_images[0])
                images_.push(data?.images?.product_images[0]);
            if(data?.images?.vector_images[0])
                images_.push(data?.images?.vector_images[0]);
            data.items.map((item)=>{
                images_.push(...item?.images?.images_item ? (Object.keys(item?.images?.images_item).length > 0 ? item?.images?.images_item : []) : [])
                colors_.push({sku: item.sku, color: item.color})
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
            const imgUrl = filterProductColors[0].images?.images_item[0] ;
            setImg(imgUrl);
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
            {
                (isLoading || !product) ? (
                    <Flex width={"100%"} justifyContent={"center"}>
                        <Spinner size='xl' color='#064A73'/>
                    </Flex>
                ):
                (
                    <Flex flexDirection={"column"} width={"100%"}>
                        {
                            product && (
                                <Flex mt={5} justifyContent={"center"} flexDirection={"column"}>
                                    <MiniatureMb data={product} images={images} setImg={setImg} setIdx={setIdx} idx={idx}/>
                                    <DescriptionMb 
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
                                <CharacteristicsMb 
                                    data={product} 
                                    colorsProduct={colorsProduct}
                                    previewImage={img} />
                            )
                        }
                    </Flex>
                )
            }
        </>
    );
}

export default ProductMb;
