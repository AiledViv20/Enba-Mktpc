import React from 'react';
import lightTheme from "./themes/ligth";
import Router from './Router';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ChakraProvider theme={lightTheme}>
      <Router />
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
