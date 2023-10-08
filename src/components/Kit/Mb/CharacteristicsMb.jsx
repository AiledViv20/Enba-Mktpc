import React, { useEffect, useState } from 'react';
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
import { selectKitsList, setKitsList } from '../../../hooks/slices/counterSlice';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { formatterValue, capitalizeFirstLetter } from '../../../resource/validate';

import { toast } from 'react-toastify';

const Characteristics = ({ kit = false, data, colorsProduct, previewImage }) => {
    const kitsListStore = useSelector(selectKitsList);
    const dispatch = useDispatch();

    const [selectTab, setSelectTab] = useState({
        tab1: true,
        tab2: false,
        tab3: false,
        tab4: false
    });
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [total, setTotal] = useState("");
    const [selectedColor, setSelectedColor] = useState('');
    const [values, setValues] = useState({
        amount: null,
        unitPrice: null
    });

    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const validateData = () => {
        if (selectedColor !== "" && values.amount > 0 && values.unitPrice > 0) {
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = () => {
        const filterItem = data.items?.filter(element => element.color === selectedColor.toUpperCase());
        const newTotal = parseFloat(total).toFixed(2);
        const productSelect = {
            sku: filterItem[0]?.sku,
            code_item: filterItem[0]?.code,
            unit_price: parseFloat(values.unitPrice),
            total_price: parseFloat(newTotal),
            quantity: parseInt(values.amount),
            name: data.name,
            category: data.category,
            color: selectedColor,
            image: previewImage,
            productsPreview: filterItem
        }
        dispatch(
            setKitsList({kitsList: [
                ...kitsListStore, productSelect
            ]})
        );
        toast.success("¡Se ha agregado correctamente el nuevo producto al kit!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    useEffect(() => {
        if (values.amount > 0 && values.unitPrice > 0) {
            let sumTotalProduct = parseFloat(values.amount * values.unitPrice);
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

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} flexDirection={"column"} mb={10} width={"100%"}>
            <Flex flexDirection={"column"} display={kit ? "none" : "flex"}>
                <Text as={"b"} mb={4}>DESCRIPCIÓN Y CARACTERÍSTICAS</Text>
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
                                        fontSize={"14px"} mr={5}
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
                                    <Input 
                                        mt={3}
                                        name='amount' type='number' 
                                        onChange={handleChange} value={values.amount} fontSize={"14px"} 
                                        width={"100%"} height={"56px"} placeholder='Cantidad' />
                                    <Input 
                                        mt={3}
                                        name='unitPrice' type='number' 
                                        onChange={handleChange} value={values.unitPrice} fontSize={"14px"} 
                                        width={"100%"} height={"56px"} placeholder='Precio unitario'/>
                                </Flex>
                                <Flex mt={6} display={isSwitchOn ? "flex" : "none"} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"}>
                                        <Text fontWeight={400}><Text as={"b"}>Tipo de impresión:</Text>{" "}Serigrafia</Text>
                                    </Flex>
                                </Flex>
                                <Flex mt={5} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"} textAlign={"end"} width={"100%"}>
                                        <Text fontWeight={400}><Text as={"b"}>Total:</Text>{" "}{formatterValue(total)}</Text>
                                        <Flex mt={5} flexDirection={"column"}>
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
                                <Text mt={5}><Text as={"b"} mr={5}>Peso neto</Text>{data.package.net_weight} {data.package.weight_unit}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Peso bruto</Text>{data.package.gross_weight} {data.package.weight_unit}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Alto</Text>{data.package.height}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Largo</Text>{data.package.length}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Ancho</Text>{data.package.width}</Text>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
}
 
export default Characteristics;