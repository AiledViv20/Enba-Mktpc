import React, { useEffect, useContext } from 'react';
import lightTheme from "./themes/ligth";
import Router from './Router';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { store } from './hooks';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import ConfettiGenerator from "confetti-js";

import ShoppingCartProvider from './context/ShoppingCartContext';

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

  useEffect(() => {
    const confettiSettings = {target:"confetti-holder",max:"80",size:"1",animate:true,props:["circle","square","triangle","line"],colors:[[255,0,0],[93,255,0],[255,240,0],[225,225,225]],clock:"25",rotate:true,width:"1920",height:"931",start_from_edge:false,respawn:true};

    // Verifica si el elemento canvas existe
    const canvasElement = document.getElementById(confettiSettings.target);
    if (!canvasElement) {
      console.error(`El elemento canvas con el ID "${confettiSettings.target}" no existe.`);
      return;
    }

    // Crea una instancia de confetti-js solo si el elemento canvas existe
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    
  }, []);

  return (
    <Elements stripe={stripePromise} options={options}>
      <ShoppingCartProvider>
        <Provider store={store}>
          <ChakraProvider theme={lightTheme}>
              <Flex width={"100%"} flexDirection={"column"} position={"relative"}>
                <Router />
                <Flex position={"absolute"} display={"none"}>
                  <canvas id='confetti-holder' style={{ width: "100%", height: "100vh", position: "fixed" }}></canvas>
                </Flex>
              </Flex>
            <ToastContainer />
          </ChakraProvider>
        </Provider>
      </ShoppingCartProvider>
    </Elements>
  );
}

export default App;
