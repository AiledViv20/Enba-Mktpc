import React from 'react';
import { capitalizeFirstLetter } from '../../resource/validate';
import SearchBarCategoriesResponsive from './SearchBarCategoriesResponsive';

const SearchBarMasterResponsive = ({ categoriesMaster }) => {
    
    return ( 
        <>
            {categoriesMaster && categoriesMaster.map((element, idx1) => {
                return (
                    <>
                        <option key={idx1} value={element.master_category}>{capitalizeFirstLetter(element.master_category)}</option>
                        <SearchBarCategoriesResponsive categoriesSubMaster={element}/>
                    </>
                );
            })}
        </>
    );
}
 
export default SearchBarMasterResponsive;