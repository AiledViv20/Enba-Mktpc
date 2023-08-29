import React, { useState } from 'react';
import { 
    Flex, 
    Box, 
    Text,
    Image
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import RecommendedProducts from '../../components/RecommendedProducts';
import Footer from '../../components/Footer';
import Miniature from '../../components/ProductSelect/Miniature';
import Description from '../../components/ProductSelect/Description';
import imgT from '../../assets/images/productsT/img-select.png';

import { productsTemplate } from '../../resource';
import Characteristics from '../../components/ProductSelect/Characteristics';

const Product = ({ props }) => {
    const [urlCategory, setUrlCategory] = useState(window.location.pathname);

    const toTextTransform = (txt) => {
        let listUrl = txt.split("/");
        return listUrl[2];
    }

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} pb={20} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / ${toTextTransform(urlCategory)}`}
                    </Text>
                </Flex>
                <Flex p={10}>
                    <Miniature />
                    <Flex pl={10}>
                        <Image src={imgT} width={"442"} height={"442"} alt='image product'/>
                    </Flex>
                    <Description />
                </Flex>
                <Characteristics />
            </Box>
            <RecommendedProducts 
                titleSection={"Productos relacionados"}
                productsTemplate={productsTemplate} />
            <Footer />
        </>
    );
}
 
export default Product;