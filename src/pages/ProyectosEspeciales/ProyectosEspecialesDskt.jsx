import React from 'react';
import { 
    Flex,
    Text,
    Button,
    Grid, 
    GridItem
} from '@chakra-ui/react';

import { MarkDownSection } from '../../components/Section';

const ProyectosEspecialesDskt = ({ onOpen, slides, setSelectGallery }) => {

    return (
        <>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[0].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[0].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(0); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[0].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"end"}>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[1].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[1].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[1].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(1); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[2].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[2].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(2); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[2].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"end"}>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[3].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[3].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[3].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(3); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
            <Grid templateColumns='repeat(2, 1fr)' m={5}>
                <GridItem>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <Flex flexDirection={"column"}>
                            <Text
                                mb={2}
                                fontWeight={600}
                                fontSize={"26px"}>
                                {slides[4].title}
                            </Text>
                            <Text
                                mb={5}
                                fontWeight={400}
                                fontSize={"16px"}
                                lineHeight={1.2}>
                                <MarkDownSection>{slides[4].description}</MarkDownSection>
                            </Text>
                            <Button 
                                w={"280px"} h={"44px"} 
                                _hover={{ bg: "#F8F8F8" }} 
                                variant={'outline'}
                                borderColor={"#064A73"}
                                bg={"#FFF"} color={"accent.500"} 
                                fontSize={"14px"} fontWeight={500}
                                onClick={() => { onOpen(); setSelectGallery(4); }}>
                                Ver proyecto
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex>
                        <Flex
                            width={"658px"}
                            height={"414px"}
                            backgroundImage={`url(${slides[4].imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center center"
                            backgroundRepeat="no-repeat">
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
        </>
    );
}
 
export default ProyectosEspecialesDskt;