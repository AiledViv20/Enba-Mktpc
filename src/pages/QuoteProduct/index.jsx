import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectKits, selectTotalAmount, setProducts, setKits, setTotalAmount } from '../../hooks/slices/counterSlice';
import { 
    Flex, 
    Box, 
    Text,
    Button,
    IconButton
} from '@chakra-ui/react';
import Footer from '../../components/Footer';
import Step1 from '../../components/ShoppingCart/Steps/Step1';
import Step2 from '../../components/ShoppingCart/Steps/Step2';
import Step3 from '../../components/ShoppingCart/Steps/Step3';
import ThanksForPayment from '../../components/ShoppingCart/Steps/ThanksForPayment';
import ElectronicBill from '../../components/ShoppingCart/Steps/ElectronicBill';
import ListProductCard from '../../components/ShoppingCart/ListProductCard';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { formatterValue } from '../../resource/validate';
import { usePostCalculateOrderMutation, usePostCreateOrderMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';

const QuoteProduct = ({ props }) => {
    const productsStore = useSelector(selectProducts);
    const kitsStore = useSelector(selectKits);
    const totalAmountStore = useSelector(selectTotalAmount);
    const dispatch = useDispatch();
    
    const [createOrder, setCreateOrder] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        postal_code: "",
        external_number: "",
        internal_number: "",
        max_delivery_date: "",
        comments: "",
        pay_method: "",
        pay_details: "",
        discount_code: "4UAEPO55L",
        items: []
    });
    const [sendOrder, setSendOrder] = useState({
        folio: ""
    });
    const [logo, setLogo] = useState();
    const [logoInfo, setLogoInfo] = useState();
    const [isLoadingStep1, setIsLoadingStep1] = useState(false);
    const [isLoadingStep2, setIsLoadingStep2] = useState(false);

    const [postCalculateOrder] = usePostCalculateOrderMutation();
    const [postCreateOrder] = usePostCreateOrderMutation();

    /*
        max_delivery_date: "Fecha máxima de entrega"
    */

    const validateStep1 = () => {
        if (createOrder.name === "" || createOrder.last_name === "" || 
            createOrder.email === "" || createOrder.phone === "" || 
            createOrder.state === "" || createOrder.city === "" ||
            createOrder.postal_code === "" || createOrder.external_number === "" ||
            createOrder.max_delivery_date === "" || createOrder.comments === "") {
            return true;
        }
        return false;
    }

    const [steps, setSteps] = useState({
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        step5: false
    });
    const [num, setNum] = useState(1);
    const [value, setValue] = useState(null);
    const [payPerStore, setPayPerStore] = useState('1');
    const [productsQuote, setProductsQuote] = useState([]);
    const [kitsQuote, setKitsQuote] = useState([]);
    const [itemsCalculate, setItemsCalculate] = useState([]);

    const changeStepQuote = (numStep) => {
        switch (numStep) {
            case 1:
                setSteps({
                    step1: true,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false
                })
                break;
            case 2:
                setSteps({
                    step1: false,
                    step2: true,
                    step3: false,
                    step4: false,
                    step5: false
                })
                break;
            case 3:
                setSteps({
                    step1: false,
                    step2: false,
                    step3: true,
                    step4: false,
                    step5: false
                })
                break;
            case 4:
                setSteps({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: true,
                    step5: false
                })
                break;
            default:
                setSteps({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: true
                })
                break;
        }
        setNum(numStep);
    }

    useEffect(() => {
        setProductsQuote(productsStore);
        if (kitsStore.length > 0) {
            setKits(productsStore);
        }
    }, []);

    const validateSteps = () => {
        if (steps.step2) {
            if (!value || (!value && !payPerStore)) {
                return true;
            }
        }
        return false;
    }

    const nextStep = () => {
        if (num < 2) {
            changeStepQuote(num+1)
        }
        else if (value === '2' && num === 2) {
            changeStepQuote(3)
        } 
        else if (value === '2' && num === 3) {
            changeStepQuote(4)
        }
        else if (value === '2' && num === 4) {
            changeStepQuote(5)
        }
        else if (value !== '2' && num === 2) {
            changeStepQuote(4)
        }  
        else if (value !== '2' && num === 4) {
            changeStepQuote(5)
        }
    }

    useEffect(() => {
        if (productsQuote.length > 0) {
            let newListItems = [];
            productsQuote.forEach(element => {
                newListItems = [
                    ...newListItems, {
                        name: element.name,
                        sku_item: element.sku,
                        code_item: element.code_item,
                        unit_price: element.unit_price,
                        total_price: element.total_price,
                        quantity: element.quantity,
                        image: element.image
                    }
                ]
            })
            setItemsCalculate(newListItems);
        }
    }, [productsQuote]);

    const handleSubmit = () => {
        setIsLoadingStep1(true);
        let calculateOrder = {}
        if (kitsQuote.length > 0) {
            calculateOrder = {
                discount_code: createOrder.discount_code,
                is_kit: true,
                sku_kit: kitsQuote.sku_kit ? kitsQuote.sku_kit : "",
                code_kit: kitsQuote.code_kit ? kitsQuote.code_kit : "",
                total_kits: kitsQuote.length,
                items: itemsCalculate
            }
        } else {
            calculateOrder = {
                discount_code: createOrder.discount_code,
                items: itemsCalculate
            }
        }
        postCalculateOrder(calculateOrder).then(res => {
            toast.success("¡Tus datos fueron eviados correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep1(false);
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep1(false);
        })
    }

    const typePayMethod = (val) => {
        switch (val) {
            case "1":
                return "Card";
            case "2":
                return "Transfer";
            case "3": 
                return "Shop";
        }
    }

    const typePayMethodDetails = (val) => {
        switch (val) {
            case "1":
                return "Oxxo";
            case "2":
                return "Seven Eleven";
        }
    }

    const handleSubmitCreateOrder = () => {
        setIsLoadingStep2(true);
        const infoUser = {
            name: createOrder.name,
            last_name: createOrder.last_name,
            email: createOrder.email,
            phone: createOrder.phone,
            state: createOrder.state,
            city: createOrder.city,
            postal_code: createOrder.postal_code,
            external_number: createOrder.external_number,
            internal_number: createOrder.internal_number
        }
        const formData = new FormData();
        formData.append("user", infoUser);
        formData.append("max_delivery_date", createOrder.max_delivery_date);
        formData.append("files", logo);
        formData.append("comments", createOrder.comments);
        formData.append("pay_method", typePayMethod(value));
        if (value === "3") {
            formData.append("pay_details", typePayMethodDetails(payPerStore));
        }
        formData.append("discount_code", createOrder.discount_code);
        if (kitsQuote.length > 0) {
            formData.append("is_kit", true);
            formData.append("sku_kit", kitsQuote.sku_kit ? kitsQuote.sku_kit : "");
            formData.append("code_kit", kitsQuote.code_kit ? kitsQuote.code_kit : "");
            formData.append("total_kits", kitsQuote.length);
        }
        formData.append("items", itemsCalculate);
        postCreateOrder({body: formData}).then(res => {
            toast.success("¡Tus orden de compra fue creada correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            dispatch(
                setProducts({products: []})
            )
            dispatch(
                setKits({kits: []})
            )
            dispatch(
                setTotalAmount({totalAmount: 0})
            )
            setIsLoadingStep2(false);
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsLoadingStep2(false);
        })
    }

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / Cotizar`}
                    </Text>
                </Flex>
            </Box>
            <Flex w={"100%"} padding={"2rem 5%"} pt={0} mb={10}>
                <Flex w={"50%"} flexDirection={"column"}>
                    <Flex>
                        {steps.step3 ?
                            <Text fontSize={"24px"} fontWeight={700}>Gracias, has realizado tu pedido</Text>
                            : 
                            <Text fontSize={"24px"} fontWeight={700}>Carrito de compra</Text>
                        }
                    </Flex>
                    <Step1 
                        step1={steps.step1}
                        createOrder={createOrder}
                        setCreateOrder={setCreateOrder}
                        setLogo={setLogo}
                        logoInfo={logoInfo}
                        setLogoInfo={setLogoInfo}
                        validateStep1={validateStep1}
                        isLoadingStep1={isLoadingStep1}
                        handleSubmit={handleSubmit} />
                    <Step2 
                        step2={steps.step2}
                        value={value}
                        setValue={setValue}
                        payPerStore={payPerStore}
                        setPayPerStore={setPayPerStore}
                        isLoadingStep2={isLoadingStep2}
                        handleSubmitCreateOrder={handleSubmitCreateOrder}
                        validateSteps={validateSteps} />
                    <Step3 
                        step3={steps.step3}
                        nextStep={nextStep}
                        sendOrder={sendOrder} />
                    <ThanksForPayment 
                        step4={steps.step4} 
                        nextStep={nextStep} />
                    <ElectronicBill 
                        step5={steps.step5}
                        sendOrder={sendOrder} />
                </Flex>
                <Flex w={"50%"} pl={20} >
                    <Flex w={"100%"} height={"fit-content"} bg={"#F8F8F8"} border={"1px solid #E2E2E2"} borderRadius={"8px"} p={10} flexDirection={"column"}>
                        <Flex mb={8}>
                            <Text fontSize={"20px"} as={"b"}>Mi orden</Text>
                        </Flex>
                        {productsStore.length > 1 ?
                            <Flex maxHeight={"200px"} overflowY={"auto"}>
                                <ListProductCard data={productsStore}/>
                            </Flex> : 
                            <ListProductCard data={productsStore}/>
                        }
                        <Flex mt={10} w={"100%"} border={"1px solid"} borderColor={"transparent"} borderBottomColor={"#E2E2E2"} pb={3}>
                            <Flex w={"50%"}>
                                <Text fontSize={"20px"} fontWeight={600}>Subtotal</Text>
                            </Flex>
                            <Flex w={"50%"} justifyContent={"end"}>
                                <Text fontSize={"20px"} fontWeight={600}>{formatterValue(totalAmountStore)}</Text>
                            </Flex>
                        </Flex>
                        <Flex mt={5} w={"100%"} border={"1px solid"} borderColor={"transparent"} borderBottomColor={"#E2E2E2"} pb={3}>
                            <Flex w={"50%"}>
                                <Text fontSize={"16px"} fontWeight={400} color={"#828282"}>{"IVA (16%)"}</Text>
                            </Flex>
                            <Flex w={"50%"} justifyContent={"end"}>
                                <Text fontSize={"16px"} fontWeight={500}>$1.45</Text>
                            </Flex>
                        </Flex>
                        <Flex mt={5} w={"100%"} pb={3}>
                            <Flex w={"50%"}>
                                <Text fontSize={"20px"} fontWeight={600}>Subtotal</Text>
                            </Flex>
                            <Flex w={"50%"} justifyContent={"end"}>
                                <Text fontSize={"20px"} fontWeight={600}>{formatterValue(totalAmountStore)}</Text>
                            </Flex>
                        </Flex>
                        <Flex mt={5} flexDirection={"column"} zIndex={1} display={num === 1 || num === 2 ? "flex" : "none"}>
                            <Button mb={5} _hover={{ bg: "#063D5F"}} 
                                fontWeight={600} fontSize={"18px"} 
                                height={"48px"}
                                onClick={() => nextStep()}
                                isDisabled={validateSteps()}>
                                Continuar
                            </Button>
                            <Button borderColor={"accent.500"} 
                                fontWeight={600} fontSize={"18px"} 
                                height={"48px"} variant={"outline"}
                                onClick={() => window.location.href = '/categoria/Todas'}>
                                Agregar artículos
                            </Button>
                        </Flex>
                        <Flex mt={5} zIndex={1} display={num === 1 || num === 2 ? "flex" : "none"}>
                            <IconButton
                                borderColor={"accent.500"} 
                                aria-label='Back' variant={"outline"}
                                icon={<ArrowBackIcon />}
                                onClick={() => changeStepQuote(num === 1 ? 1 : num-1)}
                                isDisabled={num <= 1 ? true : false}/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Footer />
        </>
    );
}
 
export default QuoteProduct;