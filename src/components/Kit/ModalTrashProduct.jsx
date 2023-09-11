import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Icon
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

const ModalTrashProduct = ({ isOpen, onClose, setConfirmTrash }) => {
    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Eliminar producto <Icon ml={2} as={WarningIcon} color='red.500'/></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    ¿Estás seguro de eliminar los productos del kit?
                </ModalBody>
                <ModalFooter>
                    <Button border={"1px solid #064A73"} variant={"outline"} mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button 
                        bg='red.500' type='button'
                        _hover={{
                            bg: "#B20000"
                        }}
                        onClick={() => {setConfirmTrash(true); onClose()}}>Confirmar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
 
export default ModalTrashProduct;