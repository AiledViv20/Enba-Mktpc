import React, { useState, useEffect } from 'react';
import { 
    Flex,
    Text,
    Image,
    IconButton
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";
import { capitalizeFirstLetter, formatterValue } from '../../resource/validate';

const KitsMb = ({ kits, kit, setSubTotalSum, setSumTotalOrder }) => {
    const [values, setValues] = useState({
        num: kit.total_kits
    });

    const changeNumProducts = (nums) => {
        setValues({
            ...values,
            num: nums < 0 ? 0 : nums
        }) 
    }

    return ( 
        <Flex w='100%' h={"100%"} flexDirection={"column"} pt={2} pb={5} borderTop={"1px solid #E2E2E2"}>
            <Flex pl={10}>
                <Text fontSize='md' fontWeight={500}>{capitalizeFirstLetter(kit ? kit.name_kit : '')}</Text>
            </Flex>
            <Flex height={"100%"} alignItems={"end"}>
                <Flex w={"40%"} pl={10} flexDirection={"column"}>
                    <Text pt={3} color={"#212121"} fontSize={"xs"}>Num: {kit ? kit.total_kits : 0}</Text>
                </Flex>
                <Flex w={"60%"} flexDirection={"column"} justifyContent={"end"} alignItems={"end"}>
                    <Flex>
                        <Text pt={3} color={"#212121"} fontWeight={500} fontSize={"md"}>{formatterValue(kit ? kit.sum_total_kit : 0)}</Text>
                    </Flex>
                    <Flex pt={3}>
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg={"#D0D0D2"}
                            onClick={() => changeNumProducts(values.num - 1)}
                            boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                            color={"#383838"}
                            fontSize={"12px"}
                            icon={<MinusIcon />}
                            isDisabled/>
                        <Text ml={2} mr={2} mb={2} color={"#828282"} fontSize={"16px"} fontWeight={400}>{values.num}</Text>
                        <IconButton
                            w={"10px"} h={"28px"}
                            bg='#31508C'
                            onClick={() => changeNumProducts(values.num + 1)}
                            boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                            color={"#FFF"}
                            fontSize={"12px"}
                            _hover={{
                                bg: '#24437E'
                            }}
                            icon={<FaPlus />}
                            isDisabled/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default KitsMb;