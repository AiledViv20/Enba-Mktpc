import React, { useEffect, useState } from 'react';
import { 
    Flex,
    Image,
    RadioGroup,
    Radio,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Input,
    Button,
    Stack,
    Text,
    useTheme,
    useMediaQuery,
    AlertIcon,
    Alert
} from '@chakra-ui/react';
import icon1 from '../../../assets/icons/quote/tarjeta-de-credito.svg';
import icon2 from '../../../assets/icons/quote/pago-transferencia.svg';
import icon3 from '../../../assets/icons/quote/pago-tienda.svg';

import icon5 from '../../../assets/icons/quote/oxxo.svg';
import icon6 from '../../../assets/icons/quote/seven.svg';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import StripeForm from '../StripeForm';

import { usePostStripeSendPaymentOxxoMutation } from '../../../hooks/enbaapi';

import { usePostDiscountCodeMutation } from '../../../hooks/enbaapi';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Step2 = ({ subTotalSum, setSubTotalSum, sumTotalOrder, setSumTotalOrder, setPriceSend, setPriceIva, step2, value, setValue, payPerStore, setPayPerStore, isLoadingStep2, setIsLoadingStep2, handleSubmitCreateOrder, validateSteps }) => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const [codex, setCodex] = useState("");
    const [postStripeSendPaymentOxxo] = usePostStripeSendPaymentOxxoMutation();
    const [postDiscountCode] = usePostDiscountCodeMutation();
    const [isLoadingStep5, setIsLoadingStep5] = useState(false);
    const [checkPay, setCheckPay] = useState(false);

    const appearance = {
        theme: "stripe",
    };

    const options = {
        appearance,
    };

    const handleSubmit = () => {
        setIsLoadingStep5(true);
        let discountCode = {
            code: codex
        }
        postDiscountCode(discountCode).then(res => {
            if (res.data.length > 0) {
                console.log(res.data)
                /* setCreateOrder({
                    ...createOrder,
                    discount_code: codex
                }) */
                toast.success("¡Tu código se ha aplicado correctamente!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else {
                toast.warning("¡El código de descuento no es válido, intenta nuevamente!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            setIsLoadingStep5(false);
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep5(false);
        })
    }

    const validateStripeForm = () => {
        if (value === "1" || value === "2" || value === "3") {
            if (value === "1") {
                if (checkPay === false) {
                    return true;
                } else {
                    validateSteps();
                }
            } else if (value !== "1") {
                validateSteps();
            }
        } else {
            return true;
        }
    }

    const sendRequestOxxo = async () => {
        let amountCents = sumTotalOrder * 100;
        amountCents = parseInt(amountCents);
        const sendStripeOxxoData = { amount_total: amountCents };
        postStripeSendPaymentOxxo(sendStripeOxxoData).then(res => {
            if (res.data) {
                window.open(res.data.checkout_url, "_blank");
                toast.success("¡Tu pago se ha solicitado correctamente!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setTimeout(() => {
                    handleSubmitCreateOrder();
                }, 1000);
            } else {
                setIsLoadingStep2(false);
                toast.error("¡Oops! Algo ha salido mal al solicitar el pago", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }).catch(err => {
            setIsLoadingStep2(false);
            console.error('Error en la solicitud:', err);
        })
    }

    const sendRequestCreateOrder = () => {
        setIsLoadingStep2(true);
        if (value === "3") {
            sendRequestOxxo();
        } else {
            handleSubmitCreateOrder()
        }
    }

    return (
        <Flex mt={10} flexDirection={"column"} display={step2 ? "flex" : "none"}>
            <Text mb={10} fontSize={"16px"} fontWeight={700}>Seleccionar forma de pago</Text>
            {value === "1" && checkPay === false ?
                <Alert status='info' mb={5}>
                    <AlertIcon />
                    Introduce el número de tu tarjeta para realizar el cobro.
                </Alert>
                : null
            }
            <RadioGroup onChange={setValue} value={value} zIndex={1}>
                <Accordion defaultIndex={value === "1" && checkPay === false ? [0] : [null]} allowMultiple>
                    <AccordionItem border={"transparent"} mb={5}>
                        <AccordionButton width={isGreaterThanMd ? "661px" : "100%"} height={"66px"} border={"1px solid #D9D9D9"} borderRadius={"10px"}>
                            <Box as="span" flex='1' textAlign='left' fontSize={"16px"} fontWeight={400}>
                                <Radio value='1' mr={3}>
                                    <Flex alignItems={"center"}>
                                        <Image src={icon1} width={"37px"} height={"37px"} mr={3}/>Tarjeta de debido o crédito
                                    </Flex>
                                </Radio>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Elements stripe={stripePromise} options={options}>
                                <Flex flexDirection={"column"}>
                                    <StripeForm 
                                        sumTotalOrder={sumTotalOrder}
                                        setCheckPay={setCheckPay} />
                                </Flex>
                            </Elements>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem border={"transparent"} mb={5}>
                        <AccordionButton width={isGreaterThanMd ? "661px" : "100%"} height={"66px"} border={"1px solid #D9D9D9"} borderRadius={"10px"}>
                            <Box as="span" flex='1' textAlign='left' fontSize={"16px"} fontWeight={400}>
                                <Radio value='2' mr={3}>
                                    <Flex alignItems={"center"}>
                                        <Image src={icon2} width={"37px"} height={"37px"} mr={3}/>Pago por transferencia
                                    </Flex>
                                </Radio>
                            </Box>
                        </AccordionButton>
                    </AccordionItem>
                    <AccordionItem border={"transparent"} mb={5}>
                        <AccordionButton width={isGreaterThanMd ? "661px" : "100%"} height={"66px"} border={"1px solid #D9D9D9"} borderRadius={"10px"}>
                            <Box as="span" flex='1' textAlign='left' fontSize={"16px"} fontWeight={400}>
                                <Radio value='3' mr={3}>
                                    <Flex alignItems={"center"}>
                                        <Image src={icon3} width={"37px"} height={"37px"} mr={3}/>Pagar en tienda
                                    </Flex>
                                </Radio>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <RadioGroup onChange={setPayPerStore} value={payPerStore}>
                                <Stack direction='column'>
                                    <Radio value='1'><Image src={icon5} alt='oxxo' mr={3}/></Radio>
                                </Stack>
                            </RadioGroup>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </RadioGroup>
            <Flex mt={4} zIndex={1} flexDirection={isGreaterThanMd ? "row" : "column"}>
                <Flex>
                    <Input name='codex' onChange={(e) => setCodex(e.target.value)} value={codex} fontSize={"14px"} width={"448px"} height={"48px"} placeholder='Introducir un código de promoción' mr={isGreaterThanMd ? 5 : 0} />
                </Flex>
                <Flex justifyContent={"end"} mt={isGreaterThanMd ? 0 : 5}>
                    <Button 
                        _hover={{ bg: "#063D5F"}} fontWeight={600} type='button'
                        fontSize={"14px"} width={isGreaterThanMd ? "148px" : "100%"} height={"48px"}
                        isDisabled={codex === "" ? true : false}
                        onClick={() => handleSubmit()}
                        isLoading={isLoadingStep5}>
                        Aplicar
                    </Button>
                </Flex>
            </Flex>
            <Flex mt={8} justifyContent={"center"}>
                <Button 
                    _hover={{ bg: "#063D5F"}} fontWeight={600} 
                    fontSize={"14px"} w={"174px"}
                    onClick={() => sendRequestCreateOrder()}
                    isLoading={isLoadingStep2}
                    isDisabled={validateStripeForm()}>Enviar</Button>
            </Flex>
        </Flex>
    );
}
 
export default Step2;