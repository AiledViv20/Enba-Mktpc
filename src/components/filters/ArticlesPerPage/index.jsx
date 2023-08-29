import React from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Text
} from '@chakra-ui/react';
import { FaBorderAll } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ArticlesPerPage = () => {

    return ( 
        <>
            <Popover placement='bottom-start'>
                <PopoverTrigger>
                    <Flex flexDirection={"column"}>
                        <Text fontSize={"14px"} fontWeight={600} mb={2}>Artículos por página</Text>
                        <Button border={"1px solid #CACACA"} color={"#424242"} bg={"#FFF"} fontSize={"14px"} fontWeight={400} 
                            leftIcon={<FaBorderAll />} rightIcon={<ChevronDownIcon />}
                            _hover={{
                                bg: "#FFF"
                            }}>
                            Ver: 50
                        </Button>
                    </Flex>
                </PopoverTrigger>
                <PopoverContent w={"8.5rem"}>
                    <PopoverBody p={"12px 0px"}>
                        <Flex flexDirection={"column"} fontSize={"16px"} fontWeight={400} color={"#000"}>
                            <Flex borderBottom={"1px solid #AFAFAF"} pl={5} pb={3}>
                                <Text>25</Text>
                            </Flex>
                            <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                                <Text>50</Text>
                            </Flex>
                            <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                                <Text>75</Text>
                            </Flex>
                            <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                                <Text>100</Text>
                            </Flex>
                            <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                                <Text>150</Text>
                            </Flex>
                            <Flex borderBottom={"1px solid #AFAFAF"} pt={3} pl={5} pb={3}>
                                <Text>200</Text>
                            </Flex>
                            <Flex pt={3} pl={5}>
                                <Text>250</Text>
                            </Flex>
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
}
 
export default ArticlesPerPage;