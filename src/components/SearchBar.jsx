import React, { useState } from 'react';
import { 
    Flex,
    Select,
    Input,
    IconButton
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    return ( 
        <Flex zIndex={1} width={"560px"} height={"54px"} bg={"#FFF"} borderRadius={"0px 10px 10px 10px"}>
            <Flex width={"30%"} bg={"#EFEFEF"} margin={"10px 0px"} ml={"12px"} borderRadius={"10px 0px 0px 10px"}>
                <Select 
                    fontSize={"12px"}
                    placeholder='Todas las categorias' 
                    value={selectedCategory}
                    border={"transparent"}
                    focusBorderColor="transparent"
                    onChange={e => setSelectedCategory(e.target.value)}
                    icon={<ChevronDownIcon />}>
                    <option value='bebidas'>Bebidas</option>
                    <option value='hogar-herramientas'>Hogar y herramientas</option>
                    <option value='oficina-tecnologia'>Oficina y tecnología</option>
                    <option value='textiles'>Textiles</option>
                    <option value='tiempo-libre'>Tiempo libre</option>
                    <option value='marcas'>Marcas</option>
                </Select>
            </Flex>
            <Flex width={"1%"} bg={"#EFEFEF"} margin={"10px 0px"}>
                <Flex margin={"5px 0px"} border={"1px solid #838383"}></Flex>
            </Flex>
            <Flex width={"59%"} bg={"#EFEFEF"} margin={"10px 0px"} mr={"12px"} borderRadius={"0px 10px 10px 0px"}>
                <Input focusBorderColor="transparent" fontSize={"12px"} border={"transparent"} width={"100%"} height={"100%"} 
                    placeholder='Buscar productos'
                    _placeholder={{
                        color: "#AFAFAF"
                    }} />
            </Flex>
            <Flex alignItems={"center"}>
                <IconButton borderRadius={"full"} size='xs' 
                    _hover={{
                        bg: "#063D5F"
                    }}
                    aria-label='Search category' icon={<SearchIcon />} />
            </Flex>
        </Flex>
    );
}
 
export default SearchBar;