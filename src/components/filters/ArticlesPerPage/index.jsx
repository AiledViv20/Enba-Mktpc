import React from 'react';
import {
  Flex,
  Text,
  Select
} from '@chakra-ui/react';

const ArticlesPerPage = ({ setArtPerPage}) => {

    return ( 
        <>
            <Flex flexDirection={"column"}>
                <Text fontSize={"14px"} fontWeight={600} mb={2}>Artículos por página</Text>
                <Select _hover={{ cursor: 'pointer' }} name='articlesPerPage' border={"1px solid #CACACA"} w={"8.5rem"}>
                    <option onClick={() => setArtPerPage(25)} value={25}>Ver:  25</option>
                    <option onClick={() => setArtPerPage(50)} value={50}>Ver:  50</option>
                    <option onClick={() => setArtPerPage(75)} value={75}>Ver:  75</option>
                    <option onClick={() => setArtPerPage(100)} value={100}>Ver:  100</option>
                    <option onClick={() => setArtPerPage(150)} value={150}>Ver:  150</option>
                    <option onClick={() => setArtPerPage(200)} value={200}>Ver:  200</option>
                </Select>
            </Flex>
        </>
    );
}
 
export default ArticlesPerPage;