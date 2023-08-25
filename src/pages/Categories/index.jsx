import React from 'react';
import { Flex, useMediaQuery, useTheme } from '@chakra-ui/react';
import Nav from '../../components/Nav';

const Categories = () => {

    return ( 
        <>
            <Flex display={"block"} boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}>
                <Nav />
            </Flex>
        </>
    );
}
 
export default Categories;