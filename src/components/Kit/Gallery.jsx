import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Grid, 
    GridItem,
    useDisclosure
} from '@chakra-ui/react';
import ModalOpenZoom from './ModalOpenZoom';

const Gallery = ({ showKitIncludes }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(0);
    const [selectImg, setSelectImg] = useState("");
    const [productsIncludes, setProductsIncludes] = useState([]);
    const [status, setStatus] = useState('loading');//loading, loaded

    useEffect(() => {
        setProductsIncludes(showKitIncludes.slice(page * 4, (page + 1) * 4));
        setStatus('loaded');
    }, [showKitIncludes.length]);

    return (
        <>
            <Grid templateColumns='repeat(2, 2fr)' gap={6}>
                {productsIncludes && productsIncludes.map((item, idx) => {
                    return (
                        <GridItem key={idx}>
                            <Flex justifyContent={"center"} _hover={{ cursor: "pointer" }}>
                                <img 
                                    src={item ? item?.items[0]?.images?.images_item[0] : ""} 
                                    width='218px' height='218px' 
                                    alt='img'
                                    onClick={() => {
                                        onOpen();
                                        setSelectImg(item ? item?.items[0]?.images?.images_item[0] : "")}}/>
                            </Flex>
                        </GridItem>
                    )
                })}
            </Grid>
            <ModalOpenZoom 
                isOpen={isOpen}
                onClose={onClose}
                selectImg={selectImg}
            />
        </>
    );
}
 
export default Gallery;