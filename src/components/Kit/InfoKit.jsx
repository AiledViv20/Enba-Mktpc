import React, { useState, useEffect } from 'react';
import { 
    Flex
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Miniature from './Miniature';
import Description from './Description';
import DescriptionKit from './DescriptionKit';
import { useGetKitQuery } from '../../hooks/enbaapi';
import KitIncludes from './KitIncludes';
import AddProductsKit from './AddProductsKit';

import Gallery from './Gallery';

const InfoKit = () => {
    const params_url = useParams();
    const [idx, setIdx] = useState(0);
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

    return (
        <>
            {
                product && (
                    <Flex p={10} justifyContent={"space-between"}>
                        <Miniature images={showKitIncludes} setIdx={setIdx} idx={idx}/>
                        <Flex pl={10} width={"442px"} height={"442px"}>
                            <Gallery 
                                showKitIncludes={showKitIncludes} />
                        </Flex>
                        <Description 
                            kit={kit}
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
    );
}
 
export default InfoKit;
