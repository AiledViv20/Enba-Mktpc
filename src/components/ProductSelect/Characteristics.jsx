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
    Select,
    Radio, 
    RadioGroup,
    Stack
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
    const [sumPrint, setSumPrint] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [radioBtnValue, setRadioBtnValue] = useState('1')
    const [values, setValues] = useState({
        amount: null,
        unitPrice: null
    });

    useEffect(() => {
        if (data) {
            let unitRetailPrice = data.items[0]?.retail_price ? data.items[0]?.retail_price : 0;
            setValues({
                ...values,
                unitPrice: parseFloat(unitRetailPrice).toFixed(2)
            });
        }
    }, []);

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
        if (isSwitchOn) {
            if (values.amount >= 50) {
                if (filterTypePrint(data.printing.printing_technique) === "") {
                    if (radioBtnValue === "1") {
                        if (values.amount >= 50 && values.amount <= 99) {
                            setSumPrint(25);
                        } else if (values.amount >= 100) {
                            setSumPrint(15);
                        }
                    } else {
                        if (values.amount >= 50 && values.amount <= 99) {
                            setSumPrint(8);
                        } else if (values.amount >= 100 && values.amount <= 149) {
                            setSumPrint(5);
                        } else if (values.amount >= 150) {
                            setSumPrint(3);
                        }
                    }
                } else {
                    const listStrTemp = data.printing.printing_technique.split(" ");
                    if (listStrTemp.includes('Láser')) {
                        if (values.amount >= 50 && values.amount <= 99) {
                            setSumPrint(25);
                        } else if (values.amount >= 100) {
                            setSumPrint(15);
                        }
                    } else if (listStrTemp.includes('Serigrafía')) {
                        if (values.amount >= 50 && values.amount <= 99) {
                            setSumPrint(8);
                        } else if (values.amount >= 100 && values.amount <= 149) {
                            setSumPrint(5);
                        } else if (values.amount >= 150) {
                            setSumPrint(3);
                        }
                    }
                }
                const filterItem = data.items?.filter(element => element.color === selectedColor.toUpperCase());
                const product = {
                    sku: filterItem[0].sku,
                    code_item: filterItem[0].code,
                    unit_price: parseFloat(filterItem[0].retail_price),
                    total_price: total.toFixed(2) + sumPrint,
                    quantity: values.amount,
                    name: data.name,
                    category: data.category,
                    color: selectedColor.toUpperCase(),
                    image: previewImage,
                    productsPreview: filterItem
                }
                console.log(product);
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
            } else {
                toast.error("¡Para productos con personalización, el mínimo de compra debe ser de 50 piezas!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } else {
            const filterItem = data.items?.filter(element => element.color === selectedColor.toUpperCase());
            const product = {
                sku: filterItem[0].sku,
                code_item: filterItem[0].code,
                unit_price: parseFloat(filterItem[0].retail_price),
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
    }

    useEffect(() => {
        if (values.amount > 0 && values.unitPrice > 0) {
            var temp2 = 0;
            if (isSwitchOn) {
                console.log("cambio de valor a on");
                if (values.amount >= 50) {
                    if (filterTypePrint(data.printing.printing_technique) === "") {
                        if (radioBtnValue === "1") {
                            if (values.amount >= 50 && values.amount <= 99) {
                                setSumPrint(25);
                                temp2 = 25;
                            } else if (values.amount >= 100) {
                                setSumPrint(15);
                                temp2 = 15;
                            }
                        } else {
                            if (values.amount >= 50 && values.amount <= 99) {
                                setSumPrint(8);
                                temp2 = 8;
                            } else if (values.amount >= 100 && values.amount <= 149) {
                                setSumPrint(5);
                                temp2 = 5;
                            } else if (values.amount >= 150) {
                                setSumPrint(3);
                                temp2 = 3;
                            }
                        }
                    } else {
                        const listStrTemp = data.printing.printing_technique.split(" ");
                        if (listStrTemp.includes('Láser')) {
                            if (values.amount >= 50 && values.amount <= 99) {
                                setSumPrint(25);
                                temp2 = 25;
                            } else if (values.amount >= 100) {
                                setSumPrint(15);
                                temp2 = 15;
                            }
                        } else if (listStrTemp.includes('Serigrafía')) {
                            if (values.amount >= 50 && values.amount <= 99) {
                                setSumPrint(8);
                                temp2 = 8;
                            } else if (values.amount >= 100 && values.amount <= 149) {
                                setSumPrint(5);
                                temp2 = 5;
                            } else if (values.amount >= 150) {
                                setSumPrint(3);
                                temp2 = 3;
                            }
                        }
                    }
                    let sumTotalProduct = values.amount * values.unitPrice + temp2;
                    setTotal(sumTotalProduct);
                } else {
                    toast.error("¡Para productos con personalización, el mínimo de compra debe ser de 50 piezas!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            } else {
                let sumTotalProduct = values.amount * values.unitPrice;
                setTotal(sumTotalProduct);
            }
        }
    }, [values, isSwitchOn, radioBtnValue]);

    const filterTypePrint = (str) => {
        const listStr = str.split("/");
        const listStrMap = listStr.map((element) => {
            return element.replace(/\s/g, '');
        })
        if (listStrMap.includes('Láser') && listStrMap.includes('Serigrafía')) {
            return "";
        }
        return listStr[0];
    }

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex flexDirection={"column"}>
                <Text as={"b"} mb={4}>Descripción y características</Text>
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
                                    <Input name='unitPrice' type='number' onChange={handleChange} value={values.unitPrice} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Precio unitario' ml={5} disabled/>
                                </Flex>
                                <Flex mt={6} display={isSwitchOn ? "flex" : "none"} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"}>
                                        <Text fontWeight={400}><Text as={"b"}>Tipo de impresión:</Text>
                                            {" "}{filterTypePrint(data.printing.printing_technique)}
                                        </Text>
                                        {filterTypePrint(data.printing.printing_technique) === "" ?
                                            <RadioGroup mt={5} onChange={setRadioBtnValue} value={radioBtnValue}>
                                                <Stack direction='column'>
                                                    <Radio value='1'>Láser</Radio>
                                                    <Radio value='2'>Serigrafía</Radio>
                                                </Stack>
                                            </RadioGroup>
                                        : null}
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