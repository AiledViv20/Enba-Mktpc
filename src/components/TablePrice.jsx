import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

import { formatterValue } from '../resource/validate';

const TablePrice = ({ pdt }) => {

    return ( 
        <TableContainer>
            <Table variant='simple'>
                <Thead bg={"accent.500"}>
                    <Tr>
                        <Th color={"#FFF"} fontSize={"14px"} textTransform={"none"}>Volumen de compra</Th>
                        <Th color={"#FFF"} fontSize={"14px"} textTransform={"none"}>Precio unitario</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td border={"1px solid #D9D9D9"}>$0.00 - $15,000.00</Td>
                        <Td border={"1px solid #D9D9D9"}>{formatterValue(pdt.items[0]?.retail_price)}</Td>
                    </Tr>
                    <Tr>
                        <Td border={"1px solid #D9D9D9"}>$15,001.00 ó <span style={{ fontWeight: 700, fontSize: "20px" }}>+</span></Td>
                        <Td border={"1px solid #D9D9D9"}>{formatterValue(pdt.items[0]?.wholesale_price)}</Td>
                    </Tr>
                </Tbody>    
            </Table>
        </TableContainer>
    );
}
 
export default TablePrice;