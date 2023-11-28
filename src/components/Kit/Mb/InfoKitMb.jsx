import React, { useState, useEffect } from 'react';
import { 
    Flex,
    Text, 
    Stack, 
    Skeleton
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DescriptionMb from './DescriptionMb';
import DescriptionKitMb from './DescriptionKitMb';
import { useGetKitQuery } from '../../../hooks/enbaapi';
import KitIncludesMb from './KitIncludesMb';
import AddProductsKitMb from './AddProductsKitMb';

import MiniatureMb from './MiniatureMb';

const InfoKitMb = () => {
    const params_url = useParams();
    const [idx, setIdx] = useState(0);
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
                        <Stack>
                            <Skeleton height="200px" w='100%'/>
                            <Skeleton height="200px" w='100%'/>
                            <Skeleton height="200px" w='100%'/>
                        </Stack>
                ):(
                    <>
                        <Flex flexDirection={"column"} width={"100%"}>
                            <Flex>
                                <Text fontSize={"26px"} lineHeight={1.2} fontWeight={600} color={"accent.500"}>{params_url.product ? params_url.product : ""}</Text>
                            </Flex>
                            <Flex mt={10} mb={2} fontSize={"14px"} fontWeight={400} color={"#424242"} flexDirection={"column"}>
                                <Text mr={10}><Text as={"b"}>SKU:</Text>{" "}{kit?.sku}</Text>
                                <Text mt={2} lineHeight={1.2}><Text as={"b"}>Categoría:</Text>{" "}{kit?.category.toUpperCase()}</Text>
                            </Flex>
                            {
                                product && (
                                    <Flex mt={5} justifyContent={"center"} flexDirection={"column"}>
                                        <MiniatureMb images={showKitIncludes} setIdx={setIdx} idx={idx} />
                                        <DescriptionMb 
                                            kit={kit}
                                            price={price}
                                            showKitIncludes={showKitIncludes}
                                            setShowKitIncludes={setShowKitIncludes} />
                                    </Flex>
                                )
                            }
                            {
                                product && (
                                    <DescriptionKitMb 
                                        showKitIncludes={showKitIncludes} />
                                )
                            }
                            {
                                showKitIncludes.length > 0 && (
                                    <KitIncludesMb 
                                        titleSection={"Tu kit incluye:"}
                                        showKitIncludes={showKitIncludes}
                                        setShowKitIncludes={setShowKitIncludes}
                                        kit={kit}/>
                                )
                            }
                            {
                                showAddOthersKits.length > 0 && (
                                    <AddProductsKitMb 
                                        titleSection={"Agrega otros productos a tu kit"}
                                        data={showAddOthersKits}
                                        showKitIncludes={showKitIncludes}
                                        setShowKitIncludes={setShowKitIncludes} />
                                )
                            }
                        </Flex>
                    </>
                )
            }
        </>
    );
}
 
export default InfoKitMb;
