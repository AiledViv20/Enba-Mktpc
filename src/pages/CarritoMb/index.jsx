import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectKits, setTotalAmount } from '../../hooks/slices/counterSlice';
import { 
    Flex,
    Box,
    Text,
    Button,
    Alert,
    AlertIcon,
    Grid, 
    GridItem
} from '@chakra-ui/react';
import { formatterValue } from '../../resource/validate';
import Footer from '../../components/Footer';
import ProductsMb from './ProductsMb';
import KitsMb from './KitsMb';

const CarritoMb = ({ props }) => {
    const productsStore = useSelector(selectProducts);
    const kitsStore = useSelector(selectKits);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [kits, setKits] = useState([]);
    const [subTotalSum, setSubTotalSum] = useState(0);
    const [sumIva, setSumIva] = useState(0);
    const [sumShopping, setSumShopping] = useState(0);
    const [sumTotalOrder, setSumTotalOrder] = useState(0);

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
        if (productsStore.length > 0) {
            setProducts(productsStore);
        }
        if (kitsStore.length > 0) {
            setKits(kitsStore);
        }
    }, []);

    useEffect(() => {
        if (products.length > 0 || kits.length > 0) {
            let sumP = 0;
            let sumK = 0;
            let sums = 0;
            let sumsIv = 0;
            let sumsSp = 0;
            if (products.length > 0) {
                products.forEach((elementP) => {
                    sumP = elementP.total_price + sumP;
                });
            }
            if (kits.length > 0) {
                kits.forEach((elementK) => {
                    sumK = elementK.sum_total_kit + sumK;
                });
            }
            sums = sumP + sumK;
            sumsIv = sums * 0.16;
            sumsSp = calculateSend();
            setSubTotalSum(sums);
            setSumIva(sumsIv);
            setSumShopping(sumsSp);
            setSumTotalOrder(sums + sumsIv + sumsSp);
            dispatch(
                setTotalAmount({totalAmount: subTotalSum})
            )
        }
    }, [products, kits]);

    const validateMinShop = () => {
        if (sumTotalOrder < 10) {
            return true;
        } 
        return false;
    }

    return ( 
        <>
            <Box color={"#424242"} w="full" mx="auto" maxW="3x1" {...props} padding={"2rem 0.5rem"} position="relative">
                <Text mb={10} fontSize='xl' fontWeight={700}>Mi orden</Text>
                <Flex w={"100%"} flexDirection={"column"} display={products.length > 0 ? "flex" : "none"}>
                    <Grid templateColumns='repeat(1, 1fr)'>
                        {products && products.map((item, idx) => {
                            return (
                                <GridItem key={idx} w='100%' pl={2} pr={2}>
                                    <ProductsMb 
                                        setSumIva={setSumIva}
                                        setSumShopping={setSumShopping}
                                        product={item}
                                        setSubTotalSum={setSubTotalSum}
                                        setSumTotalOrder={setSumTotalOrder}
                                    />
                                </GridItem>
                            )
                        })}
                    </Grid>
                </Flex>
                <Flex w={"100%"} flexDirection={"column"} display={kits.length > 0 ? "flex" : "none"}>
                    <Grid templateColumns='repeat(1, 1fr)'>
                        {kits && kits.map((item, idx) => {
                            return (
                                <GridItem key={idx} w='100%' pl={2} pr={2}>
                                    <KitsMb 
                                        kits={kits}
                                        kit={item}
                                        idx={idx}
                                        setSumIva={setSumIva}
                                        setSumShopping={setSumShopping}
                                        setSubTotalSum={setSubTotalSum}
                                        setSumTotalOrder={setSumTotalOrder}
                                    />
                                </GridItem>
                            )
                        })}
                    </Grid>
                </Flex>
                <Flex flexDirection={"column"} w={"100%"} mt={5} pl={2} pr={2}>
                    <Flex borderTop={"1px solid #E2E2E2"} pt={3} mb={5}>
                        <Flex w={"40%"}>
                            <Text fontSize={"lg"} fontWeight={500}>Subtotal</Text>
                        </Flex>
                        <Flex w={"70%"} justifyContent={"end"}>
                            <Text fontSize={"lg"} fontWeight={500}>{formatterValue(subTotalSum)}</Text>
                        </Flex>
                    </Flex>
                    <Flex borderTop={"1px solid #E2E2E2"} pt={3} mb={5}>
                        <Flex w={"40%"} flexDirection={"column"}>
                            <Text color={"#828282"} fontSize={"14px"} fontWeight={400}>{"IVA (16%)"}</Text>
                            <Text color={"#828282"} mt={3} fontSize={"14px"} fontWeight={400}>Costo de envio</Text>
                        </Flex>
                        <Flex w={"70%"} flexDirection={"column"} alignItems={"end"}>
                            <Text fontSize={"14px"} fontWeight={500}>{formatterValue(sumIva)}</Text>
                            <Text fontSize={"14px"} mt={3} fontWeight={500}>{formatterValue(sumShopping)}</Text>
                        </Flex>
                    </Flex>
                    <Flex borderTop={"1px solid #E2E2E2"} pt={3} mb={5}>
                        <Flex w={"40%"}>
                            <Text fontSize={"lg"} fontWeight={500}>Total</Text>
                        </Flex>
                        <Flex w={"70%"} justifyContent={"end"}>
                            <Text fontSize={"lg"} fontWeight={500}>{formatterValue(sumTotalOrder)}</Text>
                        </Flex>
                    </Flex>
                    <Flex mt={5}>
                        {validateMinShop() ? 
                            <Alert status='error' lineHeight={1.2}>
                                <AlertIcon />
                                No es posible realizar el proceso, el mínimo de compra debe ser $1,500.00 MXN
                            </Alert>
                            : 
                            <Button 
                                width={"100%"}
                                fontWeight={600} fontSize={"18px"} 
                                height={"48px"}
                                onClick={() => window.location.href = '/productos/cotizar'}>
                                Continuar
                            </Button>
                        }
                    </Flex>
                    <Flex mt={3}>
                        <Button borderColor={"accent.500"} marginTop={3}
                            width={"100%"}
                            fontWeight={600} fontSize={"18px"} 
                            height={"48px"} variant={"outline"}
                            onClick={() => window.open('/download', '_blank')}
                            isDisabled={validateMinShop() ? true : false}>
                            Descargar cotización
                        </Button>
                    </Flex>
                </Flex>
            </Box>
            <Footer />
        </>
    );
}
 
export default CarritoMb;