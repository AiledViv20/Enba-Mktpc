import React, { useState } from 'react';
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
    Text
} from '@chakra-ui/react';
import icon1 from '../../../assets/icons/quote/tarjeta-de-credito.svg';
import icon2 from '../../../assets/icons/quote/pago-transferencia.svg';
import icon3 from '../../../assets/icons/quote/pago-tienda.svg';

import icon5 from '../../../assets/icons/quote/oxxo.svg';
import icon6 from '../../../assets/icons/quote/seven.svg';
import StripeForm from '../StripeForm';

import { usePostDiscountCodeMutation } from '../../../hooks/enbaapi';
import { toast } from 'react-toastify';

const Step2 = ({ step2, value, setValue, payPerStore, setPayPerStore, isLoadingStep2, handleSubmitCreateOrder, validateSteps }) => {
    const [codex, setCodex] = useState("");
    const [postDiscountCode] = usePostDiscountCodeMutation();
    const [isLoadingStep5, setIsLoadingStep5] = useState(false);

    const handleSubmit = () => {
        setIsLoadingStep5(true);
        let discountCode = {
            code: codex
        }
        postDiscountCode(discountCode).then(res => {
            toast.success("¡Tu código se ha aplicado correctamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep5(false);
        }).catch(err => {
            console.log(err);
            toast.error("¡Algo salió mal!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoadingStep5(false);
        })
    }

    return (
        <Flex mt={10} flexDirection={"column"} display={step2 ? "flex" : "none"}>
            <Text mb={10} fontSize={"16px"} fontWeight={700}>Seleccionar forma de pago</Text>
            <RadioGroup onChange={setValue} value={value} zIndex={1}>
                <Accordion allowMultiple>
                    <AccordionItem border={"transparent"} mb={5}>
                        <AccordionButton width={"661px"} height={"66px"} border={"1px solid #D9D9D9"} borderRadius={"10px"}>
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
                            <StripeForm />
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem border={"transparent"} mb={5}>
                        <AccordionButton width={"661px"} height={"66px"} border={"1px solid #D9D9D9"} borderRadius={"10px"}>
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
                        <AccordionButton width={"661px"} height={"66px"} border={"1px solid #D9D9D9"} borderRadius={"10px"}>
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
                                    <Radio value='2'><Image src={icon6} alt='seven' mr={3}/></Radio>
                                </Stack>
                            </RadioGroup>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </RadioGroup>
            <Flex mt={4} zIndex={1}>
                <Flex>
                    <Input name='codex' onChange={(e) => setCodex(e.target.value)} value={codex} fontSize={"14px"} width={"448px"} height={"48px"} placeholder='Introducir un código de promoción' mr={5} />
                </Flex>
                <Flex justifyContent={"end"}>
                    <Button 
                        _hover={{ bg: "#063D5F"}} fontWeight={600} type='button'
                        fontSize={"14px"} width={"148px"} height={"48px"}
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
                    onClick={() => handleSubmitCreateOrder()}
                    isLoading={isLoadingStep2}
                    isDisabled={validateSteps()}>Enviar</Button>
            </Flex>
        </Flex>
    );
}
 
export default Step2;