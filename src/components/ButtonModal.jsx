import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModalCard from './ModalCard';

const ButtonModal = ({ title, bg, color, bgHover, colorHover, border, thankYouPage, idForm }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return ( 
        <>
            <Button
                fontSize={'sm'}
                fontWeight={700}
                variant={'link'}
                bg={bg}
                color={color}
                width={"fit-content"}
                border={border ? border : "transparent"}
                padding={2}
                textTransform={"uppercase"}
                paddingLeft={4}
                paddingRight={4}
                as='a'
                borderRadius='0px'
                _hover={{
                    bg: bgHover,
                    color: colorHover,
                    cursor: 'pointer'
                }}
                onClick={onOpen}>
                {title}
            </Button>
            {isOpen ?
                <ModalCard 
                    isOpen={isOpen} 
                    onClose={onClose}
                    title={title}
                    thankyoupage={thankYouPage}
                    idForm={idForm} /> : null
            }
        </>
    );
}
 
export default ButtonModal;
