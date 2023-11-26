import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectKits, setKits } from '../../../hooks/slices/counterSlice';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Flex,
    Select,
    Spinner,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../../../resource/validate';

import { toast } from 'react-toastify';

const ModalSelectColor = ({ isOpen, onClose, kit, price, showKitIncludes, setShowKitIncludes, values }) => {
    const { breakpoints } = useTheme();

    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const kitsStore = useSelector(selectKits);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [colors1, setColors1] = useState([]);
    const [colors2, setColors2] = useState([]);
    const [colors3, setColors3] = useState([]);
    const [colors4, setColors4] = useState([]);
    const [valuesTypeColor, setValuesTypeColor] = useState({
        colorp1: "",
        colorp2: "",
        colorp3: "",
        colorp4: ""
    });

    const validateValues = () => {
        if (valuesTypeColor.colorp1 !== "" && valuesTypeColor.colorp2 !== "" && valuesTypeColor.colorp3 !== "" && valuesTypeColor.colorp4 !== "") {
            return false;
        }
        return true;
    }

    const handleChangeSelected = (e) => {
        setValuesTypeColor({
            ...valuesTypeColor,
            [e.target.name]: e.target.value
        })
    }

    const addKitShoppingCart = (newListOptionsColorKit) => {
        setLoading(true);
        if (newListOptionsColorKit.length > 0) {
            let sumTotalKitFinal = 0;
            newListOptionsColorKit.forEach((item) => {
                sumTotalKitFinal = parseFloat(item?.items[0]?.wholesale_price) + sumTotalKitFinal
            })
            let discountKit = sumTotalKitFinal * 0.05;
            sumTotalKitFinal = sumTotalKitFinal  - discountKit;
            let sumTotal = price * values.num;
            const kitAdd = {
                discount_code: "",
                is_kit: true,
                sku_kit: kit?.sku,
                code_kit: kit?.code,
                name_kit: kit?.name,
                sub_sum_total_kit: sumTotalKitFinal.toFixed(2),
                sum_total_kit: sumTotal,
                total_kits: values.num,
                items: newListOptionsColorKit
            }
            const counterKits = [...kitsStore, 
                kitAdd
            ];
            dispatch(
                setKits({kits: counterKits})
            );
            toast.success("¡Se han agregado exitosamente los productos al kit!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setTimeout(() => {
                setLoading(false);
                onClose();
            }, 2000);
        } else {
            toast.error("¡Oops! Algo salió mal, vuelve a interntarlo nuevamente", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const filterCodeSelectColor = (itemKit, color) => {
        let codeFilterData = "";
        let filterData = showKitIncludes[itemKit].items.filter(itemx => itemx.color === color);
        if (filterData.length > 0) {
            codeFilterData = filterData[0].code
        }
        return codeFilterData;
    }

    const filterSkuSelectColor = (itemKit, color) => {
        let skuFilterData = "";
        let filterData = showKitIncludes[itemKit].items.filter(itemx => itemx.color === color);
        if (filterData.length > 0) {
            skuFilterData = filterData[0].sku
        }
        return skuFilterData;
    }

    const filterObjShoppingCart = () => {
        const listColors = [valuesTypeColor.colorp1, valuesTypeColor.colorp2, valuesTypeColor.colorp3, valuesTypeColor.colorp4];
        const selectsOptionsColorKit = showKitIncludes.map((item, idx) => {
            return {
                ...item,
                color: listColors[idx],
                sku: filterSkuSelectColor(idx, listColors[idx]),
                code_item: filterCodeSelectColor(idx, listColors[idx]),
                code: filterCodeSelectColor(idx, listColors[idx])
            }
        })
        if (selectsOptionsColorKit.length > 0) {
            setShowKitIncludes(selectsOptionsColorKit);
            addKitShoppingCart(selectsOptionsColorKit);
        } 
    }

    const renderOptionColors = (product) => {
        const colors_ = [];
        product.items.forEach((elmnt) => {
            colors_.push({sku: elmnt.sku, color: elmnt.color})
        })
        return colors_;
    }

    useEffect(() => {
        const select1 = renderOptionColors(showKitIncludes[0]);
        setColors1(select1);
        const select2 = renderOptionColors(showKitIncludes[1]);
        setColors2(select2);
        const select3 = renderOptionColors(showKitIncludes[2]);
        setColors3(select3);
        const select4 = renderOptionColors(showKitIncludes[3]);
        setColors4(select4);
    }, [showKitIncludes]);

    return ( 
        <Modal isOpen={isOpen} onClose={onClose} size={isGreaterThanMd ? '2xl' : "xs"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={isGreaterThanMd ? "start" : "center"}>Agregar al carrito</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <Text lineHeight={1.2} textAlign={isGreaterThanMd ? "start" : "center"}>Selecciona un color para agregar al carrito de compra</Text>
                    </Flex>
                    <Flex mt={10}  w={"100%"} flexDirection={isGreaterThanMd ? "row" : "column"}>
                        <Flex w={isGreaterThanMd? "40%" : "100%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[0]?.name)}</Text>
                        </Flex>
                        <Flex w={isGreaterThanMd ? "60%" : "100%"} mt={isGreaterThanMd ? 0 : 3}>
                            <Select name='colorp1' onChange={handleChangeSelected} placeholder='Color'>
                                {colors1 && colors1.map((clr, idx) => (
                                    <option key={idx} value={clr.color}>{capitalizeFirstLetter(clr.color)}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} w={"100%"} flexDirection={isGreaterThanMd ? "row" : "column"}>
                        <Flex w={isGreaterThanMd? "40%" : "100%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[1]?.name)}</Text>
                        </Flex>
                        <Flex w={isGreaterThanMd ? "60%" : "100%"} mt={isGreaterThanMd ? 0 : 3}>
                            <Select name='colorp2' onChange={handleChangeSelected} placeholder='Color'>
                                {colors2 && colors2.map((clr2, idx2) => (
                                    <option key={idx2} value={clr2.color}>{capitalizeFirstLetter(clr2.color)}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} w={"100%"} flexDirection={isGreaterThanMd ? "row" : "column"}>
                        <Flex w={isGreaterThanMd? "40%" : "100%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[2]?.name)}</Text>
                        </Flex>
                        <Flex w={isGreaterThanMd ? "60%" : "100%"} mt={isGreaterThanMd ? 0 : 3}>
                            <Select name='colorp3' onChange={handleChangeSelected} placeholder='Color'>
                                {colors3 && colors3.map((clr3, idx3) => (
                                    <option key={idx3} value={clr3.color}>{capitalizeFirstLetter(clr3.color)}</option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                    <Flex mt={5} mb={10} w={"100%"} flexDirection={isGreaterThanMd ? "row" : "column"}>
                        <Flex w={isGreaterThanMd? "40%" : "100%"}>
                            <Text>{capitalizeFirstLetter(showKitIncludes[3]?.name)}</Text>
                        </Flex>
                        <Flex w={isGreaterThanMd ? "60%" : "100%"} flexDirection={"column"} mt={isGreaterThanMd ? 0 : 3}>
                            <Flex>
                                <Select name='colorp4' onChange={handleChangeSelected} placeholder='Color'>
                                    {colors4 && colors4.map((clr4, idx4) => (
                                        <option key={idx4} value={clr4.color}>{capitalizeFirstLetter(clr4.color)}</option>
                                    ))}
                                </Select>
                            </Flex>
                            <Flex w={"100%"} justifyContent={"center"}>
                                <Button 
                                    _hover={{
                                        bg: "#063D5F"
                                    }}
                                    mt={8}
                                    w={isGreaterThanMd ? "176px" : "100%"} 
                                    fontSize={"14px"} 
                                    fontWeight={500}
                                    onClick={() => filterObjShoppingCart()}
                                    isDisabled={validateValues()}>
                                    {loading ?
                                        <Spinner /> : "Agregar al carrito"
                                    }
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
 
export default ModalSelectColor;