import React from 'react';
import {
    Grid,
    GridItem,
    Flex,
    Text
} from '@chakra-ui/react';

import { capitalizeFirstLetter } from '../../resource/validate';

const ListSubCategoriesMaster = ({ selectedCategoryMaster }) => {

    const ListSubCategories = (props) => {
        const categoriesList = props.categoriesList;
        return(
            <Grid templateColumns='repeat(1, 1fr)' pl={2}>
                {categoriesList ? categoriesList.map((item, idx) => (
                    <GridItem key={idx} w='100%'>
                        <Text 
                            lineHeight={1.2} fontSize={"13px"} 
                            fontWeight={400} mt={2}
                            onClick={() => window.location.href = `/categoria/${item.category}`}
                            _hover={{
                                cursor: "pointer",
                                color: "#064A73"
                            }}>{capitalizeFirstLetter(item.category)}</Text>
                    </GridItem>
                )) : null}
            </Grid>
        )
    }
    
    return ( 
        <>
            <Grid templateColumns='repeat(3, 2fr)' gap={5}>
                {selectedCategoryMaster ? selectedCategoryMaster.master_category.map((element, idx) => (
                    <GridItem w='100%'>
                        <Flex flexDirection={"column"}>
                            <Text 
                                mb={2} key={idx}
                                fontWeight={600}
                                fontSize={"14px"}
                                onClick={() => {
                                    window.location.href = `/categoria/${element.master_category}`
                                }}
                                _hover={{
                                    cursor: "pointer"
                                }}>
                                {capitalizeFirstLetter(element.master_category)}
                            </Text>
                            <ListSubCategories categoriesList={element.categories}/>
                        </Flex>
                    </GridItem>
                )) : null}
            </Grid>
        </>
    );
}
 
export default ListSubCategoriesMaster;
