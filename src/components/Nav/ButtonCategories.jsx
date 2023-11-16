import React, { useEffect, useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    Button,
    Flex,
    Text,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import { FaBorderAll } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { capitalizeFirstLetter } from '../../resource/validate';
import { categoriesList } from '../../resource/save';
import ListSubCategoriesMaster from './ListSubCategoriesMaster';

const ButtonCategories = () => {
    const [categories, setCategories] = useState(null);
    const [selectedCategoryGeneral, setSelectedCategoryGeneral] = useState('');
    const [selectedCategoryMaster, setSelectedCategoryMaster] = useState(null);
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    
    useEffect(() => {
        if(categoriesList){
            setCategories(categoriesList);
        }
    },[categoriesList]);

    useEffect(() => {
        setSelectedCategoryGeneral('TEXTILES');
    }, []);

    useEffect(() => {
        if (categories) {
            const filterCategories = categories.filter((element) => element.general_category === selectedCategoryGeneral);
            setSelectedCategoryMaster(filterCategories[0]);
        }
    }, [selectedCategoryGeneral]);

    return ( 
        <>
            <Menu>
                <MenuButton 
                    color={"#FFF"} fontWeight={500} width={isGreaterThanMd ? '164px' : '-webkit-fill-available'}
                    fontSize={"14px"} pl={8} border={"transparent"}
                    as={Button} rightIcon={<ChevronDownIcon />} leftIcon={<FaBorderAll />}
                    _hover={{
                        cursor: "pointer"
                    }}>
                    Categorías
                </MenuButton>
                <MenuList zIndex={1} maxHeight={"222px"} overflowY={"auto"} width={"900px"} p={0}>
                    <Flex width={"100%"} h={"100%"}>
                        <Flex width={"30%"} h={"100%"} flexDirection={"column"}>
                            {categories && categories.map((e, idx) => (
                                <Flex key={idx} pt={2} border={"1px solid #AFAFAF"} pl={3} 
                                    borderTopColor={"transparent"}
                                    borderLeftColor={"transparent"}>
                                    <Text 
                                        mb={2} 
                                        fontSize={"14px"}
                                        _hover={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => setSelectedCategoryGeneral(e.general_category)}>
                                        {capitalizeFirstLetter(e.general_category)}
                                    </Text>
                                </Flex>
                            ))}
                        </Flex>
                        <Flex width={"70%"} zIndex={1} pt={2} pl={3}>
                            <ListSubCategoriesMaster 
                                selectedCategoryMaster={selectedCategoryMaster} />
                        </Flex>
                    </Flex>
                </MenuList>
            </Menu>
        </>
    );
}
 
export default ButtonCategories;
