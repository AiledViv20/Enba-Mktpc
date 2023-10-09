import React from 'react';
import lightTheme from "./themes/ligth";
import Router from './Router';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { store } from './hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/Nav';

const persistor = persistStore(store);

function App() {

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ChakraProvider theme={lightTheme}>
            <Flex width={"100%"} flexDirection={"column"}>
              <Nav />
              <Router />
            </Flex>
          <ToastContainer />
        </ChakraProvider>
      </Provider>
    </PersistGate>
  );
}

export default App;
