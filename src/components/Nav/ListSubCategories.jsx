import React, { useEffect, useState } from 'react';
import {
    Text
} from '@chakra-ui/react';

import { capitalizeFirstLetter } from '../../resource/validate';

const ListSubCategories = ({ selectedCategoryMaster, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (selectedCategoryMaster) {
            const filterCategories = categories.filter((element) => element.master_category === selectedCategoryMaster);
            setSelectedCategory(filterCategories[0]);
        }
    }, [selectedCategoryMaster]);

    useEffect(() => {
        setSelectedCategory({
            master_category: "PORTAGAFETES",
            items: [{ category: "PORTAGAFETES" }]
        })
    }, []);

    return ( 
        <>
            {selectedCategory ? selectedCategory.items.map((element, idx) => (
                <Text 
                    onClick={() => window.location.href = `/categoria/${element.category}`} 
                    mb={2} key={idx}
                    _hover={{
                        cursor: "pointer"
                    }}>{capitalizeFirstLetter(element.category)}</Text>
            )) : null}
        </>
    );
}
 
export default ListSubCategories;