import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts, selectTotalAmount } from '../../hooks/slices/counterSlice';
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

const QuoteProduct = ({ props }) => {
    const productsStore = useSelector(selectProducts);
    const totalAmountStore = useSelector(selectTotalAmount);

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
    const [products, setProducts] = useState([]);
    const [kits, setKits] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);

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
        setProducts(productsStore);
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
                    <Step1 step1={steps.step1} />
                    <Step2 
                        step2={steps.step2}
                        value={value}
                        setValue={setValue}
                        payPerStore={payPerStore}
                        setPayPerStore={setPayPerStore} />
                    <Step3 
                        step3={steps.step3}
                        nextStep={nextStep} />
                    <ThanksForPayment 
                        step4={steps.step4} 
                        nextStep={nextStep} />
                    <ElectronicBill step5={steps.step5} />
                </Flex>
                <Flex w={"50%"} pl={20} >
                    <Flex w={"100%"} height={"fit-content"} bg={"#F8F8F8"} border={"1px solid #E2E2E2"} borderRadius={"8px"} p={10} flexDirection={"column"}>
                        <Flex mb={8}>
                            <Text fontSize={"20px"} as={"b"}>Mi orden</Text>
                        </Flex>
                        {products.length > 1 ?
                            <Flex maxHeight={"200px"} overflowY={"auto"}>
                                <ListProductCard data={products}/>
                            </Flex> : 
                            <ListProductCard data={products}/>
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