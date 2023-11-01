import React from 'react';
import { capitalizeFirstLetter } from '../../resource/validate';

const SearchBarCategoriesResponsive = ({ categoriesSubMaster }) => {
    console.log(categoriesSubMaster);
    return ( 
        <>
            {categoriesSubMaster.categories && categoriesSubMaster.categories.map((elmt, idx2) => {
                return (
                    <>
                        <option key={idx2} value={elmt.category}>{capitalizeFirstLetter(elmt.category)}</option>
                    </>
                );
            })}
        </>
    );
}
 
export default SearchBarCategoriesResponsive;