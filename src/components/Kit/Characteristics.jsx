import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectKitsList, setKitsList } from '../../hooks/slices/counterSlice';
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
    Button,
    Select
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { formatterValue, capitalizeFirstLetter } from '../../resource/validate';

import { toast } from 'react-toastify';

const Characteristics = ({ kit = false, data, colorsProduct, previewImage }) => {
    const kitsListStore = useSelector(selectKitsList);
    const dispatch = useDispatch();

    const [total, setTotal] = useState("");
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
            productsPreview: filterItem,
            printing: { type: "ninguno", price:  0 }
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

    const filterTypePrint = (str) => {
        const listStr = str.split(" ");
        return listStr[0];
    }

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex flexDirection={"column"} display={kit ? "none" : "flex"}>
                <Text as={"b"} mb={4}>Descripción y características</Text>
                <Text lineHeight={1.2}>
                    {data.description}
                </Text>
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
                                    <Input 
                                        name='amount' type='number' 
                                        onChange={handleChange} value={values.amount} fontSize={"14px"} 
                                        width={"366px"} height={"56px"} placeholder='Cantidad' />
                                    <Input 
                                        name='unitPrice' type='number' 
                                        onChange={handleChange} value={values.unitPrice} fontSize={"14px"} 
                                        width={"366px"} height={"56px"} placeholder='Precio unitario' ml={5} disabled/>
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