import React from 'react';
import lightTheme from "./themes/ligth";
import Router from './Router';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import CardFilterProvider from './context';
import { store } from './hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'react-toastify/dist/ReactToastify.css';

import iconWpp from './assets/icons/wpp.svg';
import { redirectToWhatsApp } from './resource/validate';

import Nav from './components/Nav';

const persistor = persistStore(store);

function App() {

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <CardFilterProvider>
          <ChakraProvider theme={lightTheme}>
              <Flex width={"100%"} flexDirection={"column"}>
                <Flex zIndex={-1} p={8} position={"fixed"} width={"100%"} height={"100%"} justifyContent={"end"} alignItems={"end"}>
                  <Flex _hover={{ cursor: "pointer" }} 
                    onClick={() => redirectToWhatsApp()}>
                    <img src={iconWpp} width="50" height="50" alt='icon'/>
                  </Flex>
                </Flex>
                <Nav />
                <Router />
              </Flex>
            <ToastContainer />
          </ChakraProvider>
        </CardFilterProvider>
      </Provider>
    </PersistGate>
  );
}

export default App;
