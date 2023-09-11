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
import Form from '../../components/ShoppingCart/Form';
import WayToPay from '../../components/ShoppingCart/WayToPay';
import Bill from '../../components/ShoppingCart/Bill';
import ListProductCard from '../../components/ShoppingCart/ListProductCard';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { formatterValue } from '../../resource/validate';

const QuoteProduct = ({ props }) => {
    const productsStore = useSelector(selectProducts);
    const totalAmountStore = useSelector(selectTotalAmount);

    const [steps, setSteps] = useState({
        step1: true,
        step2: false,
        step3: false
    });
    const [num, setNum] = useState(1);
    const [products, setProducts] = useState([]);
    const [kits, setKits] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);

    const changeStepQuote = (numStep) => {
        switch (numStep) {
            case 1:
                setSteps({
                    step1: true,
                    step2: false,
                    step3: false
                })
                break;
            case 2:
                setSteps({
                    step1: false,
                    step2: true,
                    step3: false
                })
                break;
            default:
                setSteps({
                    step1: false,
                    step2: false,
                    step3: true
                })
                break;
        }
        setNum(numStep);
    }

    useEffect(() => {
        setProducts(productsStore);
    }, []);

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} borderRadius={"8px"} padding={"2rem 5%"} position="relative">
                <Flex>
                    <Text fontSize={"16px"} fontWeight={400}>
                        {`Home / Cotizar`}
                    </Text>
                </Flex>
            </Box>
            <Flex w={"100%"} padding={"2rem 5%"} pt={0}>
                <Flex w={"50%"} flexDirection={"column"}>
                    <Flex>
                        {steps.step3 ?
                            <Text fontSize={"24px"} fontWeight={700}>Gracias, has realizado tu pedido</Text>
                            : 
                            <Text fontSize={"24px"} fontWeight={700}>Carrito de compra</Text>
                        }
                    </Flex>
                    <Form step1={steps.step1}/>
                    <WayToPay step2={steps.step2}/>
                    <Bill step3={steps.step3}/>
                </Flex>
                <Flex w={"50%"} pl={20} >
                    <Flex w={"100%"} height={"fit-content"} bg={"#F8F8F8"} border={"1px solid #E2E2E2"} borderRadius={"8px"} p={10} flexDirection={"column"}>
                        <Flex mb={8}>
                            <Text fontSize={"20px"} as={"b"}>Mi orden</Text>
                        </Flex>
                        {products.length > 1 ?
                            <Flex maxHeight={"150px"} overflowY={"auto"}>
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
                        <Flex mt={5} flexDirection={"column"} zIndex={1} display={num === 3 ? "none" : "flex"}>
                            <Button mb={5} _hover={{ bg: "#063D5F"}} 
                                fontWeight={600} fontSize={"18px"} 
                                height={"48px"}
                                onClick={() => changeStepQuote(num+1)}>
                                Continuar
                            </Button>
                            <Button borderColor={"accent.500"} 
                                fontWeight={600} fontSize={"18px"} 
                                height={"48px"} variant={"outline"}
                                onClick={() => window.location.href = '/categoria/Todas'}>
                                Agregar artículos
                            </Button>
                        </Flex>
                        <Flex mt={5} zIndex={1}>
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