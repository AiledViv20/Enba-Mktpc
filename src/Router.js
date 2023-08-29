import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import Home from "./pages/EnbaMk/Home";
import Categories from "./pages/Categories";
import Product from "./pages/Product";

const SwitchRouter = () => {
    return (
        <Suspense
            fallback={
                <Flex
                minH="100vh"
                direction="column"
                alignItems="center"
                justifyContent="center">
                <Spinner />
                    Cargando...
                </Flex>
            }>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/categoria/:category' element={<Categories/>} />
                <Route path='/producto/:product' element={<Product/>} />
            </Routes>
        </Suspense>    
    );
}

const Router = () => {
    return ( 
        <BrowserRouter basename="/">
            <SwitchRouter />
        </BrowserRouter>
     );
}
 
export default Router;