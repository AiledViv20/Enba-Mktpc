import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Grid, 
    GridItem
} from '@chakra-ui/react';

const GalleryMb = ({ showKitIncludes }) => {
    const [page, setPage] = useState(0);
    const [productsIncludes, setProductsIncludes] = useState([]);
    const [status, setStatus] = useState('loading');//loading, loaded

    useEffect(() => {
        if (showKitIncludes) {
            setProductsIncludes(showKitIncludes.slice(page * 4, (page + 1) * 4));
            setStatus('loaded');
        }
    },[showKitIncludes]);
    
    return (
        <>
            <Grid templateColumns='repeat(2, 2fr)' gap={6}>
                {productsIncludes && productsIncludes.length > 0 ? productsIncludes.map((item, idx) => {
                    return (
                        <GridItem key={idx}>
                            <Flex justifyContent={"center"}>
                                <img src={item.image ? item.image : ""} width='120px' height='120px' alt='img'/>
                            </Flex>
                        </GridItem>
                    )
                }) : null}
            </Grid>
        </>
    );
}
 
export default GalleryMb;