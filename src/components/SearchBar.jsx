import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Select,
    Input,
    IconButton,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useGetCategoriesQuery } from '../hooks/enbaapi';
import { capitalizeFirstLetter } from '../resource/validate';

const SearchBar = () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [keySearch, setKeySearch] = useState('');
    const [categories, setCategories] = useState(null);
    const {data, isLoading, error} = useGetCategoriesQuery();
    useEffect(() => {
        if(data){
            setCategories(data);
        }
        
    },[data])
    return ( 
        <Flex zIndex={1} width={isGreaterThanMd ? "764px" : "310px"} height={"54px"} bg={"#FFF"} borderRadius={"0px 10px 10px 10px"}>
            <Flex width={isGreaterThanMd ? "30%" : "50%"} bg={"#EFEFEF"} margin={"10px 0px"} ml={"12px"} borderRadius={"10px 0px 0px 10px"}>
                <Select 
                    fontSize={"12px"}
                    placeholder={isGreaterThanMd ? 'Todas las categorías' : 'Categorías'}
                    value={selectedCategory}
                    border={"transparent"}
                    focusBorderColor="transparent"
                    onChange={e => setSelectedCategory(e.target.value)}
                    icon={<ChevronDownIcon />}>
                        {
                            categories && (
                                categories.map((e, idx) => {
                                    return (
                                        <option key={idx} value={e.category}>{capitalizeFirstLetter(e.category)}</option>
                                    )  
                                })
                            )
                        }
                </Select>
            </Flex>
            <Flex width={"1%"} bg={"#EFEFEF"} margin={"10px 0px"}>
                <Flex margin={"5px 0px"} border={"1px solid #838383"}></Flex>
            </Flex>
            <Flex width={isGreaterThanMd ? "59%" : "50%"} bg={"#EFEFEF"} margin={"10px 0px"} mr={"12px"} borderRadius={"0px 10px 10px 0px"}>
                <Input focusBorderColor="transparent" fontSize={"12px"} border={"transparent"} width={"100%"} height={"100%"} 
                    placeholder='Buscar productos'
                    _placeholder={{
                        color: "#AFAFAF"
                    }} 
                    value={keySearch}
                    onChange={e => setKeySearch(e.target.value)}
                />
            </Flex>
            <Flex alignItems={"center"}>
                <IconButton borderRadius={"full"} size='xs' 
                    _hover={{
                        bg: "#063D5F"
                    }}
                    aria-label='Search category' icon={<SearchIcon />} 
                    onClick={(e) => {
                        window.location.href = `/categoria${selectedCategory === "Todas" ? "" :  `/${selectedCategory}`}/${keySearch === "" && selectedCategory === "Todas"  ? "Todas" : keySearch}`
                    }}
                />
            </Flex>
        </Flex>
    );
}
 
export default SearchBar;