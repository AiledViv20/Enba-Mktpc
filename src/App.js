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

import Nav from './components/Nav';
import ButtonWhatsApp from './components/ButtonWhatsApp';

const persistor = persistStore(store);

function App() {

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <CardFilterProvider>
          <ChakraProvider theme={lightTheme}>
              <Flex width={"100%"} flexDirection={"column"}>
                <Nav />
                <Router />
                <ButtonWhatsApp />
              </Flex>
            <ToastContainer />
          </ChakraProvider>
        </CardFilterProvider>
      </Provider>
    </PersistGate>
  );
}

export default App;
