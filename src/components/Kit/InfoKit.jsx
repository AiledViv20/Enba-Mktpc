import React, { useState, useEffect } from 'react';
import { 
    Flex
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Miniature from './Miniature';
import Description from './Description';
import DescriptionKit from './DescriptionKit';
import Characteristics from './Characteristics';
import { colors_dict } from '../../resource';
import { useGetKitQuery } from '../../hooks/enbaapi';
import KitIncludes from './KitIncludes';
import AddProductsKit from './AddProductsKit';

import TablePrice from '../TablePrice';
import Gallery from './Gallery';

const InfoKit = () => {
    const params_url = useParams();
    const [images, setImages] = useState(null);
    const [colors, setColors] = useState([]);
    const [colorsProduct, setColorsProduct] = useState([]);
    const [idx, setIdx] = useState(0);
    const [img, setImg] = useState(null);
    const [product, setProduct] = useState(null);
    const params = {
        sku: params_url.product
    }
    const { data: kit, isKitLoading, kitError } = useGetKitQuery({ name: params.sku});
    const [showKitIncludes, setShowKitIncludes] = useState([]);
    const [showAddOthersKits, setShowAddOthersKits] = useState([]);

    useEffect(() => {
        if(kit){
            setProduct(kit);
            if (kit.products.length <= 3) {
                setShowKitIncludes(kit.replacements);
            } else {
                setShowKitIncludes(kit.products);
            }
            if (kit.replacements) {
                setShowAddOthersKits(kit.replacements);
            }
            setImg(kit?.products[0]?.images?.product_images[0] || kit?.products[0]?.images?.vector_images[0]);
            const images_ = [];
            const colors_ = [];
            if(kit?.products[0]?.images?.product_images[0]) {
                images_.push(kit?.products[0]?.images?.product_images[0]);
            }
            if(kit?.products[0]?.images?.vector_images[0]) {
                images_.push(kit?.products[0]?.images?.vector_images[0]);
                kit.products[0].items.map((item)=>{
                    images_.push(...item.images.images_item)
                    colors_.push({sku: item.sku, color: item.color})
                })
            }
            setColors(colors_);
            setImages(images_);
        }
    },[kit]);

    useEffect(() => {
        if (showAddOthersKits.length > 0) {
            let filterDataOthersKits = [];
            showAddOthersKits.forEach((item) => {
                if (item.items.length > 0) {
                    filterDataOthersKits.push({
                        ...item,
                        sku: item.sku ? item.sku : "",
                        code_item: item.code ? item.code : "",
                        unit_price: parseFloat(item.items.length > 0 ? item.items[0].retail_price : 0),
                        total_price: parseFloat(item.items.length > 0 ? item.items[0].retail_price : 0),
                        quantity: 1,
                        name: item.name,
                        category: item.category,
                        color: "All Kit",
                        image: item.images?.product_images[0]
                    }); 
                }
            })
            setShowAddOthersKits(filterDataOthersKits);
        }
    }, [showAddOthersKits]);

    useEffect(() => {
        if (showKitIncludes.length > 0) {
            let filterDataIncludesKits = [];
            showKitIncludes.forEach((item) => {
                if (item.items.length > 0) {
                    filterDataIncludesKits.push({
                        ...item,
                        sku: item.sku ? item.sku : "",
                        code_item: item.code ? item.code : "",
                        unit_price: parseFloat(item.items.length > 0 ? item.items[0].retail_price : 0),
                        total_price: parseFloat(item.items.length > 0 ? item.items[0].retail_price : 0),
                        quantity: 1,
                        name: item.name,
                        category: item.category,
                        color: "All Kit",
                        image: item.images?.product_images[0]
                    }); 
                }
            })
            setShowKitIncludes(filterDataIncludesKits);
        }
    }, [showKitIncludes]);

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
        setColorsProduct(colors_ar);
    },[colors]);

    useEffect(() => {
        if(images){
            setImg(images[idx]);
        }
    },[idx]);

    return ( 
        <>
            {
                product && (
                    <Flex p={10} justifyContent={"space-between"}>
                        <Miniature images={showKitIncludes} setImg={setImg} setIdx={setIdx} idx={idx}/>
                        <Flex pl={10} width={"442px"} height={"442px"}>
                            <Gallery 
                                showKitIncludes={showKitIncludes} />
                        </Flex>
                        <Description 
                            previewImage={img}
                            images={images}
                            data={product.products[0]} 
                            colors={colors}
                            colorsProduct={colorsProduct}/>
                    </Flex>
                )
            }
            {
                product && (
                    <DescriptionKit 
                        data={product.products[0]}/>
                )
            }
            {
                showKitIncludes.length > 0 && (
                    <KitIncludes 
                        titleSection={"Tu kit incluye:"}
                        showKitIncludes={showKitIncludes}
                        setShowKitIncludes={setShowKitIncludes}
                        kit={kit}/>
                )
            }
            {
                product && (
                    <Flex>
                        <TablePrice
                            pdt={product.products[0]} />
                    </Flex>
                )
            }
            {
                showAddOthersKits.length > 0 && (
                    <AddProductsKit 
                        titleSection={"Agrega otros productos a tu kit"}
                        data={showAddOthersKits}
                        showKitIncludes={showKitIncludes}
                        setShowKitIncludes={setShowKitIncludes} />
                )
            }
            {
                product && (
                    <Characteristics 
                        kit={true} 
                        data={product.products[0]}
                        colorsProduct={colorsProduct}
                        previewImage={img} />
                )
            }
        </>
    );
}
 
export default InfoKit;
