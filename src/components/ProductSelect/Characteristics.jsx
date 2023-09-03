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

const Characteristics = ({ kit = false, data }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    return ( 
        <Flex color={"#424242"} fontSize={"16px"} mt={10} flexDirection={"column"} pl={10} pr={20}>
            <Flex flexDirection={"column"} display={kit ? "none" : "flex"}>
                <Text as={"b"} mb={4}>DESCRIPCIÓN Y CARACTERÍSTICAS</Text>
                <Text lineHeight={1.2}>
                    {data.description}
                </Text>
            </Flex>
            <Flex mt={10}>
                <Tabs position="relative" variant="unstyled" width={"100%"}>
                    <TabList>
                        <Tab fontWeight={500}>Cotizar</Tab>
                        <Tab fontWeight={500}>Información básica</Tab>
                        <Tab fontWeight={500}>Impresión</Tab>
                        <Tab fontWeight={500}>Empaque</Tab>
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
                                <Text mt={5}><Text as={"b"} mr={5}>Material</Text>{data.material}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Medida</Text>{data.measurements}</Text>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={"column"}>
                                <Text mt={5}><Text as={"b"} mr={5}>Aréa de impresión</Text>{data.printing.printing_area}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Técnica de impresión</Text>{data.printing.printing_technique}</Text>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDirection={"column"}>
                                <Text mt={5}><Text as={"b"} mr={5}>Peso neto</Text>{data.package.net_weight} {data.package.weight_unit}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Peso bruto</Text>{data.package.gross_weight} {data.package.weight_unit}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Alto</Text>{data.package.height}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Largo</Text>{data.package.length}</Text>
                                <Text mt={5}><Text as={"b"} mr={5}>Ancho</Text>{data.package.width}</Text>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
}
 
export default Characteristics;