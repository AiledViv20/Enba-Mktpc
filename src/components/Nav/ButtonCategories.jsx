import React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Link, 
  Flex
} from '@chakra-ui/react';
import { FaBorderAll } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useGetCategoriesQuery } from '../../hooks/enbaapi';

const ButtonCategories = () => {
  const [categories, setCategories] = useState(null);
  const {data, isLoading, error} = useGetCategoriesQuery();
  useEffect(() => {
      if(data){
          setCategories(data);
      }
      
  },[data])

  return ( 
    <>
      <Popover placement='bottom-start'>
        <PopoverTrigger>
          <Button fontSize={"14px"} fontWeight={500} zIndex={1} 
            leftIcon={<FaBorderAll />} rightIcon={<ChevronDownIcon />}
            _hover={{
              bg: "#063D5F"
            }}>
            Categorias
          </Button>
        </PopoverTrigger>
        <PopoverContent maxHeight={"400px"} overflow={"auto"}>
          <PopoverBody p={"12px 0px"}>
            <Flex flexDirection={"column"} fontSize={"16px"} fontWeight={400} color={"#000"}>
              {
                categories && (
                    categories.map((e, idx) => {
                        return (
                            <Flex key={idx} borderBottom={"1px solid #AFAFAF"} pl={5} pb={3}>
                              <Link href={`/categoria/${e.category}`}>{e.category.toUpperCase()}</Link>
                            </Flex>
                        )
                    })
                )
              }
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
 
export default ButtonCategories;