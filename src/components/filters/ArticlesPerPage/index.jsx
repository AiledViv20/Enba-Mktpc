import React, { useContext } from 'react';
import {
  Flex,
  Text,
  Select
} from '@chakra-ui/react';
import { CardFilterContext } from '../../../context';
import { actions } from '../../../context/actions';

const ArticlesPerPage = () => {
    const { state, dispatch } = useContext(CardFilterContext);

    const handleChange = (e) => {
        dispatch({
            type: actions.artPerPageCards,
            payload: parseInt(e.target.value)
        });
    };

    return ( 
        <>
            <Flex flexDirection={"column"}>
                <Text fontSize={"14px"} fontWeight={600} mb={2}>Artículos por página</Text>
                <Select 
                    _hover={{ cursor: 'pointer' }} 
                    name='artPerPage' 
                    border={"1px solid #CACACA"} w={"8.5rem"}
                    onChange={handleChange}
                    value={state.artPerPage}>
                    <option value={1}>Ver:  Todos</option>
                    <option value={3}>Ver:  3</option>
                    <option value={6}>Ver:  6</option>
                    <option value={9}>Ver:  9</option>
                    <option value={16}>Ver:  16</option>
                    <option value={25}>Ver:  25</option>
                </Select>
            </Flex>
        </>
    );
}
 
export default ArticlesPerPage;