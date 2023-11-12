import React from 'react';
import {
    useDisclosure,
    Button,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import ModalSelectColor from './ModalSelectColor';

const ButtonOpenModalKit = ({ validateData, showKitIncludes, setShowKitIncludes, addKitShoppingCart }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return ( 
        <>
            <Button w={isGreaterThanMd ? "176px" : "430px"} fontSize={"14px"} fontWeight={500}
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