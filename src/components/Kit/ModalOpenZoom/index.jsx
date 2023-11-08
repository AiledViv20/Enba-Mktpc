import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
} from '@chakra-ui/react';

import ZoomImage from '../../ProductSelect/ZoomImage';

const ModalOpenZoom = ({ isOpen, onClose, selectImg }) => {

    return ( 
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Producto</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex width={"442px"} height={"442px"}>
                        <ZoomImage src={selectImg} alt={'image product'} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
 
export default ModalOpenZoom;