import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectKits, setProducts, setKits, setTotalAmount } from '../../hooks/slices/counterSlice';
import { 
    Flex,
    Text,
    Button,
    IconButton,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import Step1 from '../../components/ShoppingCart/Steps/Step1';
import Step2 from '../../components/ShoppingCart/Steps/Step2';
import Step3 from '../../components/ShoppingCart/Steps/Step3';
import ThanksForPayment from '../../components/ShoppingCart/Steps/ThanksForPayment';
import ElectronicBill from '../../components/ShoppingCart/Steps/ElectronicBill';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { usePostCalculateOrderMutation, usePostCreateOrderMutation } from '../../hooks/enbaapi';

import { toast } from 'react-toastify';

const QuoteProductMb = () => {
    const productsStore = useSelector(selectProducts);
    const kitsStore = useSelector(selectKits);
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
        address: "",
        max_delivery_date: "",
        comments: "",
        pay_method: "",
        pay_details: "",
        discount_code: "",
        items: []
    });
    const [errorCreateOrder, setErrorCreateOrder] = useState({
        name: false,
        last_name: false,
        email: false,
        phone: false,
        state: false,
        city: false,
        postal_code: false,
        external_number: false,
        address: false,
        max_delivery_date: false,
        comments: false
    });
    const [sendOrder, setSendOrder] = useState({
        folio: "",
        discount: ""
    });
    const [logo, setLogo] = useState();
    const [logoInfo, setLogoInfo] = useState();
    const [isLoadingStep1, setIsLoadingStep1] = useState(false);
    const [isLoadingStep2, setIsLoadingStep2] = useState(false);
    const [subTotalSum, setSubTotalSum] = useState(0);
    const [sumTotalOrder, setSumTotalOrder] = useState(0);
    const [priceSend, setPriceSend] = useState(0);
    const [priceIva, setPriceIva] = useState(0);

    const [postCalculateOrder] = usePostCalculateOrderMutation();
    const [postCreateOrder] = usePostCreateOrderMutation();

    /*
        max_delivery_date: "Fecha máxima de entrega"
    */

    const validateStep1 = () => {
        if (createOrder.name === "" || createOrder.last_name === "" || 
            createOrder.email === "" || createOrder.phone === "" || 
            createOrder.state === "" || createOrder.city === "" ||
            createOrder.postal_code === "" || createOrder.address === "" || createOrder.external_number === "" ||
            createOrder.max_delivery_date === "" || createOrder.comments === "") {
            toast.error("¡Es necesario llenar todos los campos antes de continuar!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false;
        }
        return true;
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
    const [itemsKitsCalculate, setItemsKitsCalculate] = useState([]);

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

    const calculateSend = () => {
        if (subTotalSum <= 3000) {
            return 199;
        } else if (subTotalSum >= 3000 && subTotalSum <= 10000) {
            return 99;
        } else if (subTotalSum > 10000) {
            return 0;
        }
    }

    useEffect(() => {
        setProductsQuote(productsStore);
        setKitsQuote(kitsStore);
        if (productsStore.length > 0 || kitsStore.length > 0) {
            let sumP = 0;
            let sumK = 0;
            let sums = 0;
            let sumsIv = 0;
            let sumsSp = 0;
            if (productsStore.length > 0) {
                productsStore.forEach((elementP) => {
                    sumP = elementP.total_price + sumP;
                });
            }
            if (kitsStore.length > 0) {
                kitsStore.forEach((elementK) => {
                    sumK = elementK.sum_discount_kit + sumK;
                });
            }
            sums = sumP + sumK;
            sumsIv = sums * 0.16;
            sumsSp = calculateSend();
            setSubTotalSum(sums);
            setSumTotalOrder(sums + sumsIv + sumsSp);
            dispatch(
                setTotalAmount({totalAmount: subTotalSum})
            )
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
        if (productsQuote && productsQuote.length > 0) {
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
                        image: element.image,
                        printing: element.printing
                    }
                ]
            })
            setItemsCalculate(newListItems);
        }
    }, [productsQuote]);

    const filterItemKit = (elementKit) => {
        let newListElmKits = [];
        if (elementKit) {
            elementKit.items.forEach(xsKit => {
                newListElmKits = [
                    ...newListElmKits, {
                        name: xsKit.name,
                        sku_item: xsKit.sku,
                        code_item: xsKit.code_item,
                        unit_price: xsKit.unit_price,
                        total_price: xsKit.total_price,
                        quantity: 1,
                        image: xsKit.image,
                        printing: xsKit.printing
                    }
                ]
            })
        }
        return newListElmKits;
    }

    useEffect(() => {
        if (kitsQuote && kitsQuote.length > 0) {
            let newListItemsKits = [];
            kitsQuote.forEach(element => {
                newListItemsKits = [
                    ...newListItemsKits, {
                        sku_kit: element.sku_kit,
                        code_kit: element.code_kit,
                        total_kits: element.total_kits,
                        printing:{
                            type: "",
                            price: 0
                        },
                        items: filterItemKit(element)
                    }
                ]
            })
            setItemsKitsCalculate(newListItemsKits);
        }
    }, [kitsQuote]);

    const validationStep1Inputs = () => {
        setErrorCreateOrder({
            name: createOrder.name !== "" ? false : true,
            last_name: createOrder.last_name !== "" ? false : true,
            email: createOrder.email !== "" ? false : true,
            phone: createOrder.phone !== "" ? false : true,
            state: createOrder.state !== "" ? false : true,
            city: createOrder.city !== "" ? false : true,
            postal_code: createOrder.postal_code !== "" ? false : true,
            external_number: createOrder.external_number !== "" ? false : true,
            address: createOrder.address !== "" ? false : true,
            max_delivery_date: createOrder.max_delivery_date !== "" ? false : true,
            comments: createOrder.comments !== "" ? false : true
        });
    }

    const handleSubmit = () => {
        validationStep1Inputs();
        if (validateStep1()) {
            setIsLoadingStep1(true);
            let calculateOrder = {}
            if (kitsStore.length > 0) {
                calculateOrder = {
                    discount_code: createOrder.discount_code !== "" ? createOrder.discount_code : null,
                    items: itemsCalculate,
                    kits: itemsKitsCalculate,
                    printing: productsQuote[0].printing
                }
            } else {
                calculateOrder = {
                    discount_code: createOrder.discount_code !== "" ? createOrder.discount_code : null,
                    items: itemsCalculate,
                    printing: productsQuote[0].printing
                }
            }
            postCalculateOrder(calculateOrder).then(res => {
                if (res.data) {
                    toast.success("¡Tus datos fueron eviados correctamente!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    nextStep();
                } else {
                    toast.error("¡Algo salió mal!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                setIsLoadingStep1(false);
            }).catch(err => {
                console.log(err);
                toast.error("¡Algo salió mal!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setIsLoadingStep1(false);
            })
        }   
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
        const formData = new FormData();
        formData.append("user", JSON.stringify({
            name: createOrder.name,
            last_name: createOrder.last_name,
            email: createOrder.email,
            phone: createOrder.phone,
            state: createOrder.state,
            city: createOrder.city,
            postal_code: createOrder.postal_code,
            external_number: createOrder.external_number,
            internal_number: createOrder.internal_number
        }));
        formData.append("max_delivery_date", createOrder.max_delivery_date);
        formData.append("files", logo);
        formData.append("comments", createOrder.comments);
        formData.append("pay_method", typePayMethod(value));
        formData.append("pay_details", value === "3" ? typePayMethodDetails(payPerStore) : null);
        formData.append("discount_code", createOrder.discount_code !== "" ? createOrder.discount_code : null);
        formData.append("kits", JSON.stringify(itemsKitsCalculate));
        formData.append("printing", JSON.stringify(productsQuote[0].printing));
        formData.append("items", JSON.stringify(itemsCalculate));
        postCreateOrder(formData).then(res => {
            if (res.data) {
                toast.success("¡Tus orden de compra fue creada correctamente!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setSendOrder({
                    ...sendOrder,
                    folio: res.data?.folio,
                    discount: res.data?.discount?.code
                })
                nextStep();
                setTimeout(() => {
                    dispatch(
                        setProducts({products: []})
                    )
                    dispatch(
                        setKits({kits: []})
                    )
                    setSubTotalSum(0);
                    setSumTotalOrder(0);
                    dispatch(
                        setTotalAmount({totalAmount: 0})
                    )
                }, 1000);
            } else {
                toast.error("¡Algo salió mal!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            setIsLoadingStep2(false);
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep2(false);
        })
    }

    const validateMinShop = () => {
        if (sumTotalOrder < 10) {
            return true;
        } 
        return false;
    }

    return ( 
        <>
            <Flex w={"100%"} flexDirection={"column"}>
                <Flex>
                    {steps.step3 ?
                        <Text fontSize={"24px"} fontWeight={700}>Gracias, has realizado tu pedido</Text>
                        : 
                        <Text fontSize={"24px"} fontWeight={700}>Carrito de compra</Text>
                    }
                </Flex>
                <Step1 
                    errorCreateOrder={errorCreateOrder}
                    showPreview={productsQuote && productsQuote.length === 1 ? true : false}
                    productsStore={productsStore}
                    step1={steps.step1}
                    createOrder={createOrder}
                    setCreateOrder={setCreateOrder}
                    setLogo={setLogo}
                    logoInfo={logoInfo}
                    setLogoInfo={setLogoInfo}
                    categoryPrintImg={productsStore && productsStore.length > 0 ? productsStore[0]?.name : ""} />
                <Step2 
                    subTotalSum={subTotalSum}
                    setSubTotalSum={setSubTotalSum}
                    sumTotalOrder={sumTotalOrder}
                    setSumTotalOrder={setSumTotalOrder}
                    setPriceSend={setPriceSend}
                    setPriceIva={setPriceIva}
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
            <Flex justifyContent={"end"} mt={5} zIndex={1} display={num === 1 || num === 2 ? "flex" : "none"}>
                <IconButton
                    borderColor={"accent.500"} 
                    aria-label='Back' variant={"outline"}
                    icon={<ArrowBackIcon />}
                    onClick={() => changeStepQuote(num === 1 ? 1 : num-1)}
                    isDisabled={num <= 1 ? true : false}/>
            </Flex>
            <Flex mt={5} w={"100%"} flexDirection={"column"} display={num === 1 || num === 2 ? "flex" : "none"}>
                {validateMinShop() ? 
                    <Alert mb={5} status='error' lineHeight={1.2}>
                        <AlertIcon />
                        No es posible realizar el proceso, el mínimo de compra debe ser $1,500.00 MXN
                    </Alert>
                    : 
                    <Button display={steps.step2 ? "none" : "flex"} mb={5} _hover={{ bg: "#063D5F"}} 
                        fontWeight={600} fontSize={"18px"} 
                        height={"48px"}
                        onClick={() => handleSubmit()}
                        isDisabled={validateSteps()}>
                        Continuar
                    </Button>
                }
                <Button borderColor={"accent.500"} 
                    fontWeight={600} fontSize={"18px"} 
                    height={"48px"} variant={"outline"}
                    onClick={() => window.location.href = '/categoria/Todas'}>
                    Agregar artículos
                </Button>
            </Flex>
        </>
    );
}
 
export default QuoteProductMb;
