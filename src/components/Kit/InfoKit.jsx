import React, { useState, useEffect } from 'react';
import { 
    Flex, 
    Stack, 
    Skeleton
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Miniature from './Miniature';
import Description from './Description';
import DescriptionKit from './DescriptionKit';
import { useGetKitQuery } from '../../hooks/enbaapi';
import KitIncludes from './KitIncludes';
import AddProductsKit from './AddProductsKit';

import ZoomImage from '../ProductSelect/ZoomImage';

const InfoKit = () => {
    const params_url = useParams();
    const [idx, setIdx] = useState(0);
    const [img, setImg] = useState('');
    const [product, setProduct] = useState(null);
    const params = {
        sku: params_url.product
    }
    const { data: kit, isKitLoading, kitError } = useGetKitQuery({ name: params.sku});
    const [price, setPrice] = useState(0);
    const [showKitIncludes, setShowKitIncludes] = useState([]);
    const [showAddOthersKits, setShowAddOthersKits] = useState([]);

    useEffect(() => {
        if(kit){
            setProduct(kit);
            let filterKitIncludesNotNull = kit.products.filter(item => item !== null);
            let kitIncludesNull = kit.products;
            const filterOthersKitsNotNull = kit.replacements.filter(item => item !== null);
            let newfilterKitIncludesNotNull = [];
            if (filterKitIncludesNotNull.length <= 3 && filterOthersKitsNotNull.length === 4) {
                kitIncludesNull.forEach((element, idx) => {
                    if (element !== null) {
                        newfilterKitIncludesNotNull.push(element);
                    } else {
                        newfilterKitIncludesNotNull.push(filterOthersKitsNotNull[idx]);
                    }
                });
                setShowKitIncludes(newfilterKitIncludesNotNull);
            } else {
                setShowKitIncludes(filterKitIncludesNotNull);
            }
            setShowAddOthersKits(filterOthersKitsNotNull);
        }
    }, [kit]);

    useEffect(() => {
        if (showAddOthersKits.length > 0) {
            let sumKitprProduct1 = 0;
            let sumDiscountKitprProduct1 = 0;
            let sumTotalKit1 = 0;
            showAddOthersKits.forEach((item) => {
                sumTotalKit1 = parseFloat(item?.items[0]?.wholesale_price) + sumTotalKit1
            })
            let discountKit1 = sumTotalKit1 * 0.05;
            sumTotalKit1 = sumTotalKit1 - discountKit1;
            let filterDataOthersKits = [];
            showAddOthersKits.forEach((item) => {
                if (item.items.length > 0) {
                    sumKitprProduct1 = parseFloat(item.items.length > 0 ? item.items[0].wholesale_price : 0);
                    sumDiscountKitprProduct1 = sumKitprProduct1 * 0.05;
                    sumKitprProduct1 = sumKitprProduct1 - sumDiscountKitprProduct1;
                    filterDataOthersKits.push({
                        ...item,
                        sku: item.sku ? item.sku : "",
                        code_item: item.code ? item.code : "",
                        unit_price: parseFloat(item.items.length > 0 ? item.items[0].wholesale_price : 0),
                        total_price: sumKitprProduct1,
                        quantity: 1,
                        name: item.name,
                        category: item.category,
                        color: "All Kit",
                        image: item.images?.product_images[0]
                    });
                    sumKitprProduct1 = 0;
                    sumDiscountKitprProduct1 = 0;
                }
            })
            setShowAddOthersKits(filterDataOthersKits);
        }
    }, [showAddOthersKits]);

    useEffect(() => {
        if (showKitIncludes.length > 0) {
            let sumKitprProduct = 0;
            let sumDiscountKitprProduct = 0;
            let sumTotalKit = 0;
            showKitIncludes.forEach((item) => {
                sumTotalKit = parseFloat(item?.items[0]?.wholesale_price) + sumTotalKit
            })
            let discountKit = sumTotalKit * 0.05;
            sumTotalKit = sumTotalKit - discountKit;
            setPrice(sumTotalKit.toFixed(2));
            let filterDataIncludesKits = [];
            showKitIncludes.forEach((item) => {
                if (item.items.length > 0) {
                    sumKitprProduct = parseFloat(item.items.length > 0 ? item.items[0].wholesale_price : 0);
                    sumDiscountKitprProduct = sumKitprProduct * 0.05;
                    sumKitprProduct = sumKitprProduct - sumDiscountKitprProduct;
                    filterDataIncludesKits.push({
                        ...item,
                        sku: item.sku ? item.sku : "",
                        code_item: item.code ? item.code : "",
                        unit_price: parseFloat(item.items.length > 0 ? item.items[0].wholesale_price : 0),
                        total_price: sumKitprProduct,
                        quantity: 1,
                        name: item.name,
                        category: item.category,
                        color: "All Kit",
                        image: item.images?.product_images[0]
                    }); 
                    sumKitprProduct = 0;
                    sumDiscountKitprProduct = 0;
                }
            })
            setShowKitIncludes(filterDataIncludesKits);
        }
    }, [showKitIncludes]);

    return (
        <>
            {
                (isKitLoading || !product) ? (
                    <Stack p={10} justifyContent={"space-between"}>
                        <Flex gap={2}>
                            <Skeleton height={"500px"} width={"10%"} />
                            <Skeleton height={"500px"} width={"55%"} />
                            <Skeleton height={"500px"} width={"35%"} />
                        </Flex>
                        <Skeleton height={"300px"} width={"100%"} />
                        <Skeleton height={"300px"} width={"100%"} />
                    </Stack>
                ):(
                    <>
                        {
                            product && (
                                <Flex p={10} justifyContent={"space-between"}>
                                    <Miniature images={showKitIncludes} setImg={setImg} setIdx={setIdx} idx={idx}/>
                                    <Flex pl={10} width={"442px"} height={"442px"}>
                                        <ZoomImage src={img} alt={'image product'} />
                                    </Flex>
                                    <Description 
                                        kit={kit}
                                        price={price}
                                        showKitIncludes={showKitIncludes}
                                        setShowKitIncludes={setShowKitIncludes} />
                                </Flex>
                            )
                        }
                        {
                            product && (
                                <DescriptionKit 
                                    showKitIncludes={showKitIncludes} />
                            )
                        }
                        {
                            showKitIncludes.length > 0 && (
                                <KitIncludes 
                                    titleSection={"Tu kit incluye:"}
                                    showKitIncludes={showKitIncludes}
                                    setShowKitIncludes={setShowKitIncludes}
                                    kit={kit} />
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
                    </>
                )
            }
        </>
    );
}
 
export default InfoKit;
