import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
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
import { formatterValue, capitalizeFirstLetter } from '../../../resource/validate';
import { selectProducts, 
    setProducts, 
    selectTotalAmount, 
    setTotalAmount 
} from '../../../hooks/slices/counterSlice';
import './styled.scss';

const CharacteristicsMb = ({ data, colorsProduct, previewImage }) => {
    const [selectTab, setSelectTab] = useState({
        tab1: true,
        tab2: false,
        tab3: false,
        tab4: false
    });
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

    useEffect(() => {
        if (values.amount > 0 && values.unitPrice > 0) {
            let sumTotalProduct = values.amount * values.unitPrice;
            setTotal(sumTotalProduct);
        }
    }, [values]);

    const handleChangeTab = (num) => {
        switch (num) {
            case 1:
                setSelectTab({
                    tab1: true,
                    tab2: false,
                    tab3: false,
                    tab4: false
                });
                break;
            case 2:
                setSelectTab({
                    tab1: false,
                    tab2: true,
                    tab3: false,
                    tab4: false
                });
                break;
            case 3:
                setSelectTab({
                    tab1: false,
                    tab2: false,
                    tab3: true,
                    tab4: false
                });
                break;
            default:
                setSelectTab({
                    tab1: false,
                    tab2: false,
                    tab3: false,
                    tab4: true
                });
                break;
        }
    }

    const filterTypePrint = (str) => {
        const listStr = str.split(" ");
        return listStr[0];
    }

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} width={"100%"}>
            <Flex flexDirection={"column"}>
                <Text as={"b"} mb={4}>Descripción y características</Text>
                <Text lineHeight={1.2}>
                    {data.description}
                </Text>
            </Flex>
            <Flex mt={10}>
                <Tabs position="relative" variant="unstyled" width={"100%"}>
                    <TabList flexDirection={"column"}>
                        <Tab border={"2px solid"} borderColor={"transparent"} borderBottomColor={selectTab.tab1 ? "accent.500" : "transparent"} fontWeight={500} fontSize={"14px"} onClick={() => handleChangeTab(1)}>Cotizar</Tab>
                        <Tab border={"2px solid"} borderColor={"transparent"} borderBottomColor={selectTab.tab2 ? "accent.500" : "transparent"} fontWeight={500} fontSize={"14px"} onClick={() => handleChangeTab(2)}>Información básica</Tab>
                        <Tab border={"2px solid"} borderColor={"transparent"} borderBottomColor={selectTab.tab3 ? "accent.500" : "transparent"} fontWeight={500} fontSize={"14px"} onClick={() => handleChangeTab(3)}>Impresión</Tab>
                        <Tab border={"2px solid"} borderColor={"transparent"} borderBottomColor={selectTab.tab4 ? "accent.500" : "transparent"} fontWeight={500} fontSize={"14px"} onClick={() => handleChangeTab(4)}>Empaque</Tab>
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
                                <Flex mt={5} justifyContent={"center"} flexDirection={"column"}>
                                    <Select 
                                        mt={5} fontSize={"14px"}
                                        width={"100%"} height={"56px"}
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
                                    <Input mt={3} name='amount' type='number' onChange={handleChange} value={values.amount} fontSize={"14px"} width={"100%"} height={"56px"} placeholder='Cantidad' />
                                    <Input mt={3} name='unitPrice' type='number' onChange={handleChange} value={values.unitPrice} fontSize={"14px"} width={"100%"} height={"56px"} placeholder='Precio unitario' disabled/>
                                </Flex>
                                <Flex mt={6} display={isSwitchOn ? "flex" : "none"} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"}>
                                        <Text fontWeight={400}><Text as={"b"}>Tipo de impresión:</Text>{" "}{filterTypePrint(data.printing.printing_technique)}</Text>
                                    </Flex>
                                </Flex>
                                <Flex mt={5} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"} width={"100%"} textAlign={"end"}>
                                        <Text fontWeight={400}><Text as={"b"}>Total:</Text>{" "}{formatterValue(total)}</Text>
                                        <Flex mt={5} flexDirection={"column"} alignItems={"center"}>
                                            <Button 
                                                w={"100%"} fontSize={"14px"} 
                                                fontWeight={500} color={"#000"} 
                                                borderColor={"accent.500"} variant='outline'
                                                isDisabled={validateData()}>Imprimir cotización</Button>
                                            <Button 
                                                mt={5}
                                                w={"100%"} 
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
 
export default CharacteristicsMb;