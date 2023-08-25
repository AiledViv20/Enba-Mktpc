import { Flex, Image, Text } from '@chakra-ui/react';
import '../styles/styled.css';
import '../styles/list.css';

const amenities = [
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/amenidades/img1.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/amenidades/img2.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/amenidades/img3.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/amenidades/img4.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/amenidades/img5.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/amenidades/img6.png' }
];

const images = [
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-1-min.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-2-min.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-3-min.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-4-min.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-5-min.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-6-min.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-7-min.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/images/prototipos/vista-8-min.png' }
];

const imgConstruvida = [
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/construvida/img1.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/construvida/img2.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/construvida/img3.png' },
    { imageUrl: 'https://boomerang.s3.us-east-2.amazonaws.com/landings/centrozapopan/icons/construvida/img4.png' },
];

export const listImages = [
    {
        id: 1,
        images: [
            <Flex className='container-cols-mon'>
                <Flex className='col1-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[5].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
                <Flex position={"relative"} className='col2-mon'  width={"60%"} padding={"5rem"}>
                    <img style={{ width: "100%" }} src={amenities[0].imageUrl} width='100' height='100' alt='icon'/>
                    <Text position={"absolute"} fontSize="22px" mt={2} ml={2} fontWeight={600} color={"#FFF"}>Terraza</Text>
                </Flex>
                <Flex className='col3-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[1].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
            </Flex>,
            <Flex className='container-cols-mon'>
                <Flex className='col1-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[0].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
                <Flex position={"relative"} className='col2-mon'  width={"60%"} padding={"5rem"}>
                    <img style={{ width: "100%" }} src={amenities[1].imageUrl} width='100' height='100' alt='icon'/>
                    <Text position={"absolute"} fontSize="22px" mt={2} ml={2} fontWeight={600} color={"#FFF"}>Hamacas</Text>
                </Flex>
                <Flex className='col3-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[2].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
            </Flex>,
            <Flex className='container-cols-mon'>
                <Flex className='col1-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[1].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
                <Flex position={"relative"} className='col2-mon'  width={"60%"} padding={"5rem"}>
                    <img style={{ width: "100%" }} src={amenities[2].imageUrl} width='100' height='100' alt='icon'/>
                    <Text position={"absolute"} fontSize="22px" mt={2} ml={2} fontWeight={600} color={"#FFF"}>Lounge</Text>
                </Flex>
                <Flex className='col3-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[3].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
            </Flex>,
            <Flex className='container-cols-mon'>
                <Flex className='col1-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[2].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
                <Flex position={"relative"} className='col2-mon'  width={"60%"} padding={"5rem"}>
                    <img style={{ width: "100%" }} src={amenities[3].imageUrl} width='100' height='100' alt='icon'/>
                    <Text position={"absolute"} fontSize="22px" mt={2} ml={2} fontWeight={600} color={"#FFF"}>Yoga deck</Text>
                </Flex>
                <Flex className='col3-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[4].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
            </Flex>,
            <Flex className='container-cols-mon'>
                <Flex className='col1-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[3].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
                <Flex position={"relative"} className='col2-mon'  width={"60%"} padding={"5rem"}>
                    <img style={{ width: "100%" }} src={amenities[4].imageUrl} width='100' height='100' alt='icon'/>
                    <Text position={"absolute"} fontSize="22px" mt={2} ml={2} fontWeight={600} color={"#FFF"}>Bar</Text>
                </Flex>
                <Flex className='col3-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[5].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
            </Flex>,
            <Flex className='container-cols-mon'>
                <Flex className='col1-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[4].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
                <Flex position={"relative"} className='col2-mon'  width={"60%"} padding={"5rem"}>
                    <img style={{ width: "100%" }} src={amenities[5].imageUrl} width='100' height='100' alt='icon'/>
                    <Text position={"absolute"} fontSize="22px" mt={2} ml={2} fontWeight={600} color={"#FFF"}>Terraza norte</Text>
                </Flex>
                <Flex className='col3-mon' borderBottomRightRadius={"22px"} borderTopRightRadius={"22px"} backgroundImage={`url('${amenities[0].imageUrl}')`} width={"20%"} margin={"5rem 0px"} backgroundSize={"cover"}></Flex>
            </Flex>,
        ]
    },
    {
        id: 2,
        images: [
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"}>
                <Flex className='container-list1-images' width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[0].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo B1<Text fontSize="26px" textTransform={"lowercase"}>77.63 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 2 cajones de<br />estacionamiento</Text>
                </Flex>
            </Flex>,
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"}>
                <Flex className='container-list1-images'  width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[1].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo B1-A<Text fontSize="26px" textTransform={"lowercase"}>82.72 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras + flex</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 2 cajones de<br />estacionamiento</Text>
                </Flex>
            </Flex>,
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"}>
                <Flex className='container-list1-images'  width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[2].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo B2<Text fontSize="26px" textTransform={"lowercase"}>79.58 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras + flex</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 2 cajones de<br />estacionamiento</Text>
                </Flex>
            </Flex>,
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"}>
                <Flex className='container-list1-images'  width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[3].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo C1<Text fontSize="26px" textTransform={"lowercase"}>71.84 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 1 cajón de<br />estacionamiento</Text>
                </Flex>
            </Flex>,
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"}>
                <Flex className='container-list1-images'  width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[4].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo C2<Text fontSize="26px" textTransform={"lowercase"}>71.02 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 1 cajón de<br />estacionamiento</Text>
                </Flex>
            </Flex>,
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"}>
                <Flex className='container-list1-images'  width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[5].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo C2-B<Text fontSize="26px" textTransform={"lowercase"}>72.68 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 1 cajón de<br />estacionamiento</Text>
                </Flex>
            </Flex>,
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"}>
                <Flex className='container-list1-images'  width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[6].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo D1<Text fontSize="26px" textTransform={"lowercase"}>90.15 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras + flex</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 2 cajones de<br />estacionamiento</Text>
                </Flex>
            </Flex>,
            <Flex className='container-list1' justifyContent={"center"} alignItems={"center"} color={"#545454"} padding={"0px 1rem"} pb={10}>
                <Flex className='container-list1-images'  width={"50%"}>
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={images[7].imageUrl}
                        alt="icon"
                    />
                </Flex>
                <Flex paddingLeft={"1rem"} flexDirection={"column"}>
                    <Text textTransform={"uppercase"} fontWeight={300} marginBottom={"1rem"} fontSize="35px">
                        Modelo E<Text fontSize="26px" textTransform={"lowercase"}>71.54 m<sup>2</sup></Text>
                    </Text>
                    <Text fontSize="22px" fontWeight={500}>Descripción:</Text>
                    <Text fontSize="20px">· 2 recámaras</Text>
                    <Text fontSize="20px">· 2 baños</Text>
                    <Text fontSize="20px">· Sala-comedor</Text>
                    <Text fontSize="20px">· Cocina</Text>
                    <Text fontSize="20px">· 1 cajón de<br />estacionamiento</Text>
                </Flex>
            </Flex>
        ],
    },
    {
        id: 1,
        images: [
          <div style={{ display: "flex", justifyContent: "center", height: "100%", paddingLeft: "5px" }}>
            <img
              src={imgConstruvida[0].imageUrl}
              style={{ width: "90%", height: "100%"}}
              width="100"
              height="100"
              alt="icon"
            />
          </div>,
          <div style={{ display: "flex", justifyContent: "center", height: "100%", paddingLeft: "5px" }}>
            <img
              src={imgConstruvida[1].imageUrl}
              style={{ width: "90%", height: "100%" }}
              width="100"
              height="100"
              alt="icon"
            />
          </div>,
          <div style={{ display: "flex", justifyContent: "center", height: "100%", paddingLeft: "5px" }}>
            <img
              src={imgConstruvida[2].imageUrl}
              style={{ width: "90%", height: "100%" }}
              width="100"
              height="100"
              alt="icon"
            />
          </div>,
          <div style={{ display: "flex", justifyContent: "center", height: "100%", paddingLeft: "5px" }}>
            <img
              src={imgConstruvida[3].imageUrl}
              style={{ width: "90%", height: "100%" }}
              width="100"
              height="100"
              alt="icon"
            />
          </div>,
        ],
    },
];