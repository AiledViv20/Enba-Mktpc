import React from 'react';
import lightTheme from "./themes/ligth";
import Router from './Router';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { store } from './hooks';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';


const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

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
    <Elements stripe={stripePromise} options={options}>
      <Provider store={store}>
        <ChakraProvider theme={lightTheme}>
          <Router />
          <ToastContainer />
        </ChakraProvider>
      </Provider>
    </Elements>
  );
}

export default App;
