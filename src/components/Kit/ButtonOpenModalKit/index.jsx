import React from 'react';
import {
    useDisclosure,
    Button,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import ModalSelectColor from '../ModalSelectColor';

const ButtonOpenModalKit = ({ title, kit, validateData, showKitIncludes, setShowKitIncludes, values }) => {
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
                isDisabled={validateData()}>
                {title}
            </Button>
            {isOpen ?
                <ModalSelectColor
                    isOpen={isOpen} 
                    onClose={onClose}
                    kit={kit}
                    showKitIncludes={showKitIncludes}
                    setShowKitIncludes={setShowKitIncludes}
                    values={values} />
                : null
            }
        </>
    );
}
 
export default ButtonOpenModalKit;