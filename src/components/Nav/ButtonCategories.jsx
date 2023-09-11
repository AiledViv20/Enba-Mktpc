import React from 'react';
import { useEffect, useState } from 'react';
import {
  Select,
  InputLeftElement,
  Icon,
  InputGroup
} from '@chakra-ui/react';
import { FaBorderAll } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useGetCategoriesQuery } from '../../hooks/enbaapi';
import { capitalizeFirstLetter } from '../../resource/validate';

const ButtonCategories = () => {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const {data, isLoading, error} = useGetCategoriesQuery();
  useEffect(() => {
      if(data){
          setCategories(data);
      }
      
  },[data])

  return ( 
    <>
        <InputGroup 
            w={"154px"} h={"38px"} bg={"accent.500"}
            borderRadius={"5px"}
            _hover={{
                bg: "#063D5F",
                cursor: "pointer"
            }}>
            <Select 
                fontSize={"14px"}
                placeholder='Categorias' 
                value={selectedCategory}
                pl={8}
                border={"transparent"}
                focusBorderColor="transparent"
                color={"#FFF"} fontWeight={500}
                onChange={e => setSelectedCategory(e.target.value)}
                _hover={{
                    cursor: "pointer"
                }}
                icon={<ChevronDownIcon />}>
                        {
                            categories && (
                                categories.map((e, idx) => {
                                    return (
                                        <option key={idx} value={e.category} style={{ color: '#000' }}>{capitalizeFirstLetter(e.category)}</option>
                                    )  
                                })
                            )
                        }
            </Select>
            <InputLeftElement pointerEvents="none" children={<Icon as={FaBorderAll} />} color={"#FFF"} />
        </InputGroup>
    </>
  );
}
 
export default ButtonCategories;