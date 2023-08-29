import React, { useState } from 'react';
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
    Switch,
    Button
} from '@chakra-ui/react';

const Characteristics = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex flexDirection={"column"}>
                <Text as={"b"} mb={4}>DESCRIPCIÓN Y CARACTERÍSTICAS</Text>
                <Text lineHeight={1.2}>
                    Audífonos bluetooth con batería recargable, diadema ajustable 
                    de 4 posiciones. Tiempo de reproducción de 10 horas 
                    aproximadamente.<br />Incluye cable auxiliar de 3.5 mm y 
                    cable cargador USB.
                </Text>
            </Flex>
            <Flex mt={10}>
                <Tabs position="relative" variant="unstyled" width={"100%"}>
                    <TabList>
                        <Tab fontWeight={500}>Cotizar</Tab>
                        <Tab fontWeight={500}>Información básica</Tab>
                        <Tab fontWeight={500} isDisabled>Impresión</Tab>
                        <Tab fontWeight={500} isDisabled>Empaque</Tab>
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
                                <Flex width={"100%"} alignItems={"center"} justifyContent={"end"}>
                                    <Text fontWeight={400}>Agregar impresión</Text>
                                    <Switch ml={3} size='lg' isChecked={isSwitchOn} onChange={handleSwitchChange}/>
                                </Flex>
                                <Flex mt={5} justifyContent={"end"}>
                                    <Input fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Seleccionar color' mr={5} />
                                    <Input fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Cantidad' />
                                    <Input fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Precio unitario' ml={5}/>
                                </Flex>
                                <Flex mt={6} display={isSwitchOn ? "flex" : "none"} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"}>
                                        <Text fontWeight={400}><Text as={"b"}>Tipo de impresión:</Text>{" "}Serigrafia</Text>
                                        <Input mt={3} fontSize={"14px"} width={"366px"} height={"56px"} placeholder='Precio unitario' />
                                    </Flex>
                                </Flex>
                                <Flex mt={5} width={"100%"} justifyContent={"end"}>
                                    <Flex flexDirection={"column"} textAlign={"end"}>
                                        <Text fontWeight={400}><Text as={"b"}>Total:</Text>{" "}$23,232.00</Text>
                                        <Flex mt={5}>
                                            <Button w={"208px"} fontSize={"14px"} fontWeight={500} color={"#000"} borderColor={"accent.500"} variant='outline'>Imprimir cotización</Button>
                                            <Button ml={5} w={"208px"} fontSize={"14px"} fontWeight={500}>Agregar al carrito</Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={"column"}>
                                <Text mt={5}><Text as={"b"} mr={5}>Material</Text>Plástico</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Medida</Text>17 x 19 x 7.3 cm</Text>
                            </Flex>
                        </TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
}
 
export default Characteristics;