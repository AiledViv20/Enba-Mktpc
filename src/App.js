import React, { useEffect } from 'react';
import lightTheme from "./themes/ligth";
import Router from './Router';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { store } from './hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/Nav';

const persistor = persistStore(store);

//const stripePromise = loadStripe(process.env.REACT_APP_TEST_STRIPE_PUBLIC_KEY);

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

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
