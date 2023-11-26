import React, { useState } from 'react';
import { 
    Flex,
    Text,
    IconButton,
    Input,
} from '@chakra-ui/react';
import { formatterValue } from '../../resource/validate';
import { MinusIcon } from '@chakra-ui/icons';
import { FaPlus } from "react-icons/fa";

import { useParams } from 'react-router-dom';
import ButtonOpenModalKit from './ButtonOpenModalKit';

const Description = ({ kit, price, showKitIncludes, setShowKitIncludes }) => {
    const params_url = useParams();

    const [values, setValues] = useState({
        num: 0
    });
    const changeNumProducts = (nums) => {
        setValues({
            ...values,
            num: nums < 0 ? 0 : nums
        }) 
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: parseInt(e.target.value)
        });
    }

    const validateData = () => {
        if (values.num !== 0) {
            return false;
        }
        return true;
    }

    return ( 
        <Flex flexDirection={"column"}>
            <Flex>
                <Text fontSize={"26px"} fontWeight={600} color={"accent.500"}>{params_url.product ? params_url.product : ""}</Text>
            </Flex>
            <Flex mt={10} fontSize={"14px"} fontWeight={400} color={"#424242"}>
                <Text mr={10}><Text as={"b"}>SKU:</Text>{" "}{kit.sku}</Text>
                <Text><Text as={"b"}>Categoría:</Text>{" "}{kit.category.toUpperCase()}</Text>
            </Flex>
            <Flex mt={5} flexDirection={"column"}>
                <Flex mt={2} mb={1}>
                    <Text fontSize={"12px"} fontWeight={400} color={"#383838"}>Desde</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <Text mr={5} fontSize={"36px"} fontWeight={700} color={"#383838"}>{formatterValue(price)}</Text>
                </Flex>
            </Flex>
            <Flex mt={10}>
                <Flex>
                    <ButtonOpenModalKit 
                        kit={kit}
                        price={price}
                        validateData={validateData}
                        showKitIncludes={showKitIncludes}
                        setShowKitIncludes={setShowKitIncludes}
                        values={values} />
                </Flex>
                <Flex ml={10} alignItems={"center"}>
                    <IconButton
                        w={"37px"} h={"37px"}
                        bg={"#D0D0D2"}
                        onClick={() => changeNumProducts(values.num - 1)}
                        boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                        color={"#383838"}
                        fontSize={"16px"}
                        icon={<MinusIcon />}/>
                    <Input 
                        name='num' type='number' m={"0px 1rem"}
                        onChange={handleChange} value={values.num} fontWeight={500} fontSize={"16px"} 
                        width={"80px"} height={"40px"} />
                    <IconButton
                        w={"37px"} h={"37px"}
                        bg='#31508C'
                        onClick={() => changeNumProducts(values.num + 1)}
                        boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                        color={"#FFF"}
                        fontSize={"16px"}
                        _hover={{
                            bg: '#24437E'
                        }}
                        icon={<FaPlus />}/>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default Description;