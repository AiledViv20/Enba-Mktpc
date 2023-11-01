import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import Home from "./pages/EnbaMk/Home";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import QuoteProduct from "./pages/QuoteProduct";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import ProyectosEspeciales from "./pages/ProyectosEspeciales";
import PopularCategories from "./pages/PopularCategories";
import Cotizar from "./pages/Cotizar";
import Kit from "./pages/Kit";
import Terms from "./pages/Tyc/Terms";
import Privacy from "./pages/Tyc/Privacy";
import PDFQuoteProducts from "./pages/PDFQuoteProducts";
import PagoStripe from "./pages/PagoStripe";

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
                <Route path='/categoria/:category/:name?' element={<Categories/>} />
                <Route path='/producto/:product' element={<Product/>} />
                <Route path='/productos/cotizar' element={<QuoteProduct/>} />
                <Route path='/contacto' element={<Contacto/>} />
                <Route path='/nosotros' element={<Nosotros />} />
                <Route path='/proyectos-especiales' element={<ProyectosEspeciales />} />
                <Route path='/temporalidades' element={<PopularCategories />} />
                <Route path='/cotizar' element={<Cotizar />} />
                <Route path='/kit/:product' element={<Kit/>} />
                <Route path='/terminos-condiciones' element={<Terms/>} />
                <Route path='/aviso-privacidad' element={<Privacy/>} />
                <Route path='/download' element={<PDFQuoteProducts/>} />
                <Route path='/pago-completado' element={<PagoStripe/>} />
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