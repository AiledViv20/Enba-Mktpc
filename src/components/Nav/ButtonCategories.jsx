import React, { useEffect, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text
} from '@chakra-ui/react';
import { FaBorderAll } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useGetSubCategoriesQuery } from '../../hooks/enbaapi';
import { capitalizeFirstLetter } from '../../resource/validate';
import ListSubCategories from './ListSubCategories';

const ButtonCategories = () => {
    const [categories, setCategories] = useState(null);
    const [selectedCategoryMaster, setSelectedCategoryMaster] = useState('');
    
    const {data, isLoading, error} = useGetSubCategoriesQuery();
    useEffect(() => {
        if(data){
            setCategories(data);
        }
    },[data])

    return ( 
        <>
            <Menu>
                <MenuButton 
                    color={"#FFF"} fontWeight={500}
                    fontSize={"14px"} pl={8} border={"transparent"}
                    as={Button} rightIcon={<FaBorderAll />}
                    _hover={{
                        cursor: "pointer"
                    }}>
                    Categorias
                </MenuButton>
                <MenuList zIndex={1} pl={3} maxHeight={"200px"} overflowY={"auto"} width={"600px"}>
                    <Flex width={"100%"} h={"100%"}>
                        <Flex width={"40%"} h={"100%"} flexDirection={"column"}>
                            {categories && categories.map((e, idx) => (
                                <Text 
                                    key={idx}
                                    mb={2} 
                                    _hover={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setSelectedCategoryMaster(e.master_category)}>
                                    {capitalizeFirstLetter(e.master_category)}
                                </Text>
                            ))}
                        </Flex>
                        <Flex width={"60%"} zIndex={1} flexDirection={"column"}>
                            <ListSubCategories 
                                selectedCategoryMaster={selectedCategoryMaster}
                                categories={categories} />
                        </Flex>
                    </Flex>
                </MenuList>
            </Menu>
        </>
    );
}
 
export default ButtonCategories;
