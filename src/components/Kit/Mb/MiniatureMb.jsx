import React, { useEffect, useState } from 'react';
import { 
    Flex, 
    IconButton,
    Image
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { kitGroup } from '../../../resource/save';

const MiniatureMb = ({ images, setIdx, idx }) => {
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
        <>
            <Flex alignItems={"center"}>
                <IconButton
                    w={"38px"} h={"38px"}
                    bg='#FFF'
                    boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                    color={"#31508C"}
                    fontSize={"20px"}
                    icon={<ChevronLeftIcon />}
                    isDisabled={idx === 0}
                    onClick={() => setIdx(idx - 1)}
                />
                <Flex flexDirection={"column"}>
                    <Image src={galleryKit[idx]?.items[0]?.images?.images_item[0]} width={"250"} height={"250"} mb={3} cursor={"pointer"}/>
                </Flex>
                <IconButton
                    w={"38px"} h={"38px"}
                    bg='#FFF'
                    boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
                    color={"#31508C"}
                    fontSize={"20px"}
                    icon={<ChevronRightIcon />}
                    isDisabled={idx === images.length}
                    onClick={() => setIdx(idx + 1)}
                />
            </Flex>
        </>
    );
}
 
export default MiniatureMb;