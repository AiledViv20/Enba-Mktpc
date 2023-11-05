import React from 'react';
import {
    useDisclosure,
    Button
} from '@chakra-ui/react';
import ModalSelectColor from './ModalSelectColor';

const ButtonOpenModalKit = ({ validateData, showKitIncludes, setShowKitIncludes, addKitShoppingCart }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return ( 
        <>
            <Button w={"176px"} fontSize={"14px"} fontWeight={500}
                _hover={{
                    bg: "#063D5F"
                }}
                onClick={() => onOpen()}
                isDisabled={validateData()}>Agregar al carrito
            </Button>
            {isOpen ?
                <ModalSelectColor
                    isOpen={isOpen} 
                    onClose={onClose}
                    showKitIncludes={showKitIncludes}
                    setShowKitIncludes={setShowKitIncludes}
                    addKitShoppingCart={addKitShoppingCart} />
                : null
            }
        </>
    );
}
 
export default ButtonOpenModalKit;