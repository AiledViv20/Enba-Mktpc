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
    Stack
} from '@chakra-ui/react';
import icon1 from '../../assets/icons/quote/tarjeta-de-credito.svg';
import icon2 from '../../assets/icons/quote/pago-transferencia.svg';
import icon3 from '../../assets/icons/quote/pago-tienda.svg';
import icon4 from '../../assets/icons/quote/paypal.svg';

import icon5 from '../../assets/icons/quote/oxxo.svg';
import icon6 from '../../assets/icons/quote/seven.svg';

const WayToPay = ({ step2 }) => {
    const [value, setValue] = useState('');
    const [payPerStore, setPayPerStore] = useState('');

    return ( 
        <Flex mt={10} flexDirection={"column"} display={step2 ? "flex" : "none"}>
            <RadioGroup onChange={setValue} value={value}>
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
                            <Flex flexDirection={"column"}>
                                <Flex mb={3}>
                                    <Input fontSize={"14px"} height={"48px"} placeholder='No. de tarjeta' />
                                </Flex>
                                <Flex mb={3}>
                                    <Input fontSize={"14px"} height={"48px"} placeholder='Fecha de caducidad' mr={3}/>
                                    <Input fontSize={"14px"} height={"48px"} placeholder='CVC' />
                                </Flex>
                                <Flex justifyContent={"end"}>
                                    <Button width={"208px"} _hover={{ bg: "#063D5F"}} fontWeight={600} fontSize={"14px"}>Pagar</Button>
                                </Flex>
                            </Flex>
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
                    <AccordionItem border={"transparent"} mb={5}>
                        <AccordionButton width={"661px"} height={"66px"} border={"1px solid #D9D9D9"} borderRadius={"10px"}>
                            <Box as="span" flex='1' textAlign='left' fontSize={"16px"} fontWeight={400}>
                                <Radio value='4' mr={3}>
                                    <Flex alignItems={"center"}>
                                        <Image src={icon4} width={"37px"} height={"37px"} mr={3}/>Paypal
                                    </Flex>
                                </Radio>
                            </Box>
                        </AccordionButton>
                    </AccordionItem>
                </Accordion>
            </RadioGroup>
            <Flex mt={10}>
                <Flex>
                    <Input fontSize={"14px"} width={"448px"} height={"48px"} placeholder='Introducir un código de promoción' mr={5} />
                </Flex>
                <Flex justifyContent={"end"}>
                    <Button _hover={{ bg: "#063D5F"}} fontWeight={600} fontSize={"14px"} width={"148px"} height={"48px"}>Aplicar</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default WayToPay;