import React, { useEffect, useState } from 'react';
import { 
    Flex, 
    IconButton,
    Image
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { kitGroup } from '../../resource/save';

const Miniature = ({ images, setImg, setIdx, idx }) => {
    const params_url = useParams();
    const [firstChange, setFirstChange] = useState(true);
    const [galleryKit, setGalleryKit] = useState([]);

    const filterObjKit = () => {
        const filterTypeKit = kitGroup.filter(item => item.name === params_url.product);
        const tempGallery = [
            { 
                id: 1, 
                name: params_url.product,
                items: [
                    {
                        images: {
                            images_item: [
                                filterTypeKit[0].imgUrl
                            ]
                        }
                    }
                ]
            },
            { 
                id: 2, 
                name: images[0]?.items[0]?.name,
                items: [
                    {
                        images: {
                            images_item: [
                                images[0]?.items[0]?.images?.images_item[0]
                            ]
                        }
                    }
                ]
            },
            { 
                id: 3, 
                name: images[1]?.items[0]?.name,
                items: [
                    {
                        images: {
                            images_item: [
                                images[1]?.items[0]?.images?.images_item[0]
                            ]
                        }
                    }
                ]
            },
            { 
                id: 4, 
                name: images[2]?.items[0]?.name,
                items: [
                    {
                        images: {
                            images_item: [
                                images[2]?.items[0]?.images?.images_item[0]
                            ]
                        }
                    }
                ]
            },
            { 
                id: 5, 
                name: images[3]?.items[0]?.name,
                items: [
                    {
                        images: {
                            images_item: [
                                images[3]?.items[0]?.images?.images_item[0]
                            ]
                        }
                    }
                ]
            },
        ];
        return tempGallery;
    }

    useEffect(() => {
        if (firstChange && images.length >= 4) {
            const tempKit = filterObjKit();
            setGalleryKit(tempKit);
            const imgTemp = tempKit[0]?.items[0]?.images?.images_item[0];
            setImg(imgTemp);
            setFirstChange(false);
        }
    }, []);

    useEffect(() => {
        if (images.length >= 4) {
            const temp = filterObjKit();
            setGalleryKit(temp);
        }
    }, [images]);

    return ( 
        <Flex flexDirection={"column"} alignItems={"center"}>
            <IconButton
                w={"48px"} h={"48px"}
                bg='#FFF' mb={5}
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronUpIcon />}
                isDisabled={idx === 0}
                onClick={() => setIdx(idx - 1)}
            />
            <Flex flexDirection={"column"}>
                <Image src={galleryKit[idx]?.items[0]?.images?.images_item[0]} onClick={() => setImg(galleryKit[idx]?.items[0]?.images?.images_item[0])} width={"100"} height={"100"} mb={3} cursor={"pointer"}/>
                <Image src={galleryKit[idx+1]?.items[0]?.images?.images_item[0]} onClick={() => setImg(galleryKit[idx+1]?.items[0]?.images?.images_item[0])} width={"100"} height={"100"} mb={3} cursor={"pointer"}/>
                <Image src={galleryKit[idx+2]?.items[0]?.images?.images_item[0]} onClick={() => setImg(galleryKit[idx+2]?.items[0]?.images?.images_item[0])} width={"100"} height={"100"} cursor={"pointer"}/>
            </Flex>
            <IconButton
                w={"48px"} h={"48px"}
                bg='#FFF' mt={5}
                boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                color={"#31508C"}
                fontSize={"20px"}
                icon={<ChevronDownIcon />}
                isDisabled={idx === images.length - 2}
                onClick={() => setIdx(idx + 1)}
            />
        </Flex>
    );
}
 
export default Miniature;