import React from 'react';
import lightTheme from "./themes/ligth";
import Router from './Router';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { store } from './hooks';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={lightTheme}>
        <Router />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
