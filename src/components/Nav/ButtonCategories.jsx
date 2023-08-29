import React from 'react';
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

const ButtonCategories = () => {
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
        <PopoverContent>
          <PopoverBody p={"12px 0px"}>
            <Flex flexDirection={"column"} fontSize={"16px"} fontWeight={400} color={"#000"}>
              <Flex borderBottom={"1px solid #AFAFAF"} pl={5} pb={3}>
                <Link href='/categorias/bebidas'>Bebidas</Link>
              </Flex>
              <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                <Link href='/categorias/bienestar'>Bienestar</Link>
              </Flex>
              <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                <Link href='/categorias/hogar-herramientas'>Hogar y herramientas</Link>
              </Flex>
              <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                <Link href='/categorias/oficina-tecnologia'>Oficina y tecnología</Link>
              </Flex>
              <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                <Link href='/categorias/textiles'>Textiles</Link>
              </Flex>
              <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                <Link href='/categorias/tiempo-libre'>Tiempo libre</Link>
              </Flex>
              <Flex pt={3} pl={5}>
                <Link href='/categorias/marcas'>Marcas</Link>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
 
export default ButtonCategories;