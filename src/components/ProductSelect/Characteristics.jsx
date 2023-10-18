import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setProducts, selectTotalAmount, setTotalAmount } from '../../hooks/slices/counterSlice';
import { 
    Flex,
    Text,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    TabIndicator,
    Input,
    Switch,
    Button,
    Select
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { formatterValue, capitalizeFirstLetter } from '../../resource/validate';

import TablePrice from '../TablePrice';

import { toast } from 'react-toastify';

const Characteristics = ({ data, colorsProduct, previewImage }) => {
    const productsStore = useSelector(selectProducts);
    const totalAmountStore = useSelector(selectTotalAmount);
    const dispatch = useDispatch();

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [total, setTotal] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [values, setValues] = useState({
        amount: null,
        unitPrice: null
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const validateData = () => {
        if (selectedColor !== "" && values.amount > 0 && values.unitPrice > 0) {
            return false;
        }
        return true;
    }
    
    const handleSubmit = () => {
        const filterItem = data.items?.filter(element => element.color === selectedColor.toUpperCase());
        const product = {
            sku: filterItem[0].sku,
            code_item: filterItem[0].code,
            unit_price: parseFloat(filterItem[0].price),
            total_price: total.toFixed(2),
            quantity: values.amount,
            name: data.name,
            category: data.category,
            color: selectedColor.toUpperCase(),
            image: previewImage,
            productsPreview: filterItem
        }
        dispatch(
            setProducts({products: [
                ...productsStore, product
            ]})
        );
        dispatch(
            setTotalAmount({totalAmount: totalAmountStore + total})
        );
        toast.success("¡Se ha agregado correctamente el nuevo producto!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    useEffect(() => {
        if (values.amount > 0 && values.unitPrice > 0) {
            let sumTotalProduct = values.amount * values.unitPrice;
            setTotal(sumTotalProduct);
        }
    }, [values]);

    const filterTypePrint = (str) => {
        const listStr = str.split(" ");
        let newStr = '';
        if (listStr.length === 3) {
            newStr = `${listStr[0]} y ${listStr[2]}`
        } else {
            newStr = listStr[0];
        }
        return newStr;
    }

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex flexDirection={"column"}>
                <Text as={"b"} mb={4}>DESCRIPCIÓN Y CARACTERÍSTICAS</Text>
                <Text lineHeight={1.2}>
                    {data.description}
                </Text>
            </Flex>
            <Flex mt={10}>
                <TablePrice pdt={data}/>
            </Flex>
            <Flex mt={10}>
                <Tabs position="relative" variant="unstyled" width={"100%"}>
                    <TabList>
                        <Tab fontWeight={500}>Cotizar</Tab>
                        <Tab fontWeight={500}>Información básica</Tab>
                        <Tab fontWeight={500}>Impresión</Tab>
                        <Tab fontWeight={500}>Empaque</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="accent.500"
                        borderRadius="5px"
                        />
                    <TabPanels>
                        <TabPanel>
                            <Flex width={"100%"} flexDirection={"column"}>
                                <Flex width={"100%"} alignItems={"center"} justifyContent={"end"}>
                                    <Text fontWeight={400}>Agregar impresión</Text>
                                    <Switch ml={3} size='lg' isChecked={isSwitchOn} onChange={handleSwitchChange}/>
                                </Flex>
                                <Flex mt={5} justifyContent={"end"}>
                                    <Select 
                                        fontSize={"14px"} mr={5}
                                        width={"366px"} height={"56px"}
                                        placeholder='Seleccionar color' 
                                        value={capitalizeFirstLetter(selectedColor)}
                                        onChange={e => setSelectedColor(e.target.value)}
                                        icon={<ChevronDownIcon />}>
                                            {
                                                colorsProduct && (
                                                    colorsProduct.map((e, idx) => {
                                                        return (
                                                            <option key={idx} value={capitalizeFirstLetter(e.color)}>{capitalizeFirstLetter(e.color)}</option>
                                                        )
                                                    })
                                                )
                                            }
                                    </Select>
                                    <Input name='amount' type='number' onChange={handleChange} value={values.amount} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Cantidad' />
                                    <Input name='unitPrice' type='number' onChange={handleChange} value={values.unitPrice} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Precio unitario' ml={5}/>
                                </Flex>
                                <Flex mt={6} display={isSwitchOn ? "flex" : "none"} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"}>
                                        <Text fontWeight={400}><Text as={"b"}>Tipo de impresión:</Text>{" "}{filterTypePrint(data.printing.printing_technique)}</Text>
                                    </Flex>
                                </Flex>
                                <Flex mt={5} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"} textAlign={"end"}>
                                        <Text fontWeight={400}><Text as={"b"}>Total:</Text>{" "}{formatterValue(total)}</Text>
                                        <Flex mt={5}>
                                            <Button 
                                                w={"208px"} fontSize={"14px"} 
                                                fontWeight={500} color={"#000"} 
                                                borderColor={"accent.500"} variant='outline'
                                                isDisabled={validateData()}>Imprimir cotización</Button>
                                            <Button 
                                                ml={5} w={"208px"} 
                                                fontSize={"14px"} 
                                                fontWeight={500}
                                                _hover={{
                                                    bg: "#063D5F"
                                                }}
                                                onClick={() => handleSubmit()}
                                                isDisabled={validateData()}>Agregar al carrito</Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={"column"}>
                                <Text mt={5}><Text as={"b"} mr={5}>Material</Text>{data.material}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Medida</Text>{data.measurements}</Text>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={"column"}>
                                <Text mt={5}><Text as={"b"} mr={5}>Aréa de impresión</Text>{data.printing.printing_area}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Técnica de impresión</Text>{data.printing.printing_technique}</Text>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={"column"}>
                                <Text mt={5}><Text as={"b"} mr={5}>Peso neto</Text>{data.package.net_weight} {data.package.weight_unit.toLowerCase()}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Peso bruto</Text>{data.package.gross_weight} {data.package.weight_unit.toLowerCase()}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Alto</Text>{data.package.height} cm<sup>3</sup></Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Largo</Text>{data.package.length} cm<sup>3</sup></Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Ancho</Text>{data.package.width} cm<sup>3</sup></Text>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
}
 
export default Characteristics;