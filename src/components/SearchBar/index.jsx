import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Menu,
    MenuButton,
    MenuList,
    Button,
    Text,
    Input,
    IconButton,
    useTheme,
    useMediaQuery,
    useDisclosure 
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { capitalizeFirstLetter } from '../../resource/validate';
import { categoriesList } from '../../resource/save';
import ListSubCategoriesMaster from './ListSubCategoriesMaster';

const SearchBar = () => {
    const { breakpoints } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    const [categories, setCategories] = useState(null);
    const [selectedCategoryGeneral, setSelectedCategoryGeneral] = useState('');
    const [selectedCategoryMaster, setSelectedCategoryMaster] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [categoryLabel, setCategoryLabel] = useState('Todas las categorías');
    const [keySearch, setKeySearch] = useState('');

    const closeMenu = () => {
        onClose();
    };

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

    useEffect(() => {
        setCategoryLabel(selectedCategory);
    }, [selectedCategory])

    const searchMkt = () => {
        var searchKeyboard = ""
        if (selectedCategory === "Todas" && keySearch !== "") {
            searchKeyboard = `/code/${keySearch}`;
        } else if (selectedCategory !== "Todas" && keySearch === "") {
            searchKeyboard = `/search/${selectedCategory}`;
        } else if (selectedCategory !== "Todas" && keySearch !== "") {
            searchKeyboard = `/${selectedCategory}/${keySearch}`;
        }
        window.location.href = `/categoria${searchKeyboard}`;
    }

    return ( 
        <Flex width={isGreaterThanMd ? "764px" : "310px"} height={"54px"} bg={"#FFF"} borderRadius={"0px 10px 10px 10px"}>
            <Flex width={isGreaterThanMd ? "30%" : "50%"} bg={"#EFEFEF"} margin={"10px 0px"} ml={"12px"} borderRadius={"10px 0px 0px 10px"}>
                <Menu isOpen={isOpen}>
                    {() => (
                        <>
                            <MenuButton 
                                isActive={isOpen}
                                onClick={isOpen ? onClose : onOpen}
                                color={"#000"} fontWeight={500} width={"100%"}
                                fontSize={"12px"} pl={8} border={"transparent"} bg={"transparent"}
                                as={Button} margin={0}
                                _hover={{
                                    cursor: "pointer"
                                }}>
                                {capitalizeFirstLetter(categoryLabel)}
                            </MenuButton>
                                <MenuList maxHeight={"222px"} overflowY={"auto"} width={"800px"} p={0}>
                                <Flex width={"100%"} h={"100%"}>
                                    <Flex width={"30%"} h={"100%"} flexDirection={"column"}>
                                        {categories && categories.map((e, idx) => (
                                            <Flex pt={2} border={"1px solid #AFAFAF"} pl={3} 
                                                borderTopColor={"transparent"}
                                                borderLeftColor={"transparent"}>
                                                <Text 
                                                    key={idx}
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
                                    <Flex width={"70%"} pt={2} pl={3}>
                                        <ListSubCategoriesMaster 
                                            closeMenu={closeMenu}
                                            selectedCategoryMaster={selectedCategoryMaster}
                                            setSelectedCategory={setSelectedCategory} />
                                    </Flex>
                                </Flex>
                            </MenuList>
                        </>
                    )}
                </Menu>
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
                    onClick={() => searchMkt()}
                />
            </Flex>
        </Flex>
    );
}
 
export default SearchBar;
