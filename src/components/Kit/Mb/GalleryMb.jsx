import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Grid, 
    GridItem
} from '@chakra-ui/react';

const GalleryMb = ({ showKitIncludes, setImg, setIdx, idx }) => {
    const [page, setPage] = useState(0);
    const [productsIncludes, setProductsIncludes] = useState([]);
    const [status, setStatus] = useState('loading');//loading, loaded

    useEffect(() => {
        setProductsIncludes(showKitIncludes.slice(page * 4, (page + 1) * 4));
        setStatus('loaded');
    }, []);
    
    return (
        <>
            <Grid templateColumns='repeat(2, 2fr)' gap={6}>
                {productsIncludes && productsIncludes.length > 0 ? productsIncludes.map((item, idx) => {
                    return (
                        <GridItem key={idx}>
                            <Flex justifyContent={"center"}>
                                <img src={item ? item?.items[0]?.images?.images_item[0] : ""} width='120px' height='120px' alt='img'/>
                            </Flex>
                        </GridItem>
                    )
                }) : null}
            </Grid>
        </>
    );
}
 
export default GalleryMb;