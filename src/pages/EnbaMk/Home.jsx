import React from 'react';
import { useState, useEffect } from 'react';
import { Flex, useMediaQuery, useTheme } from '@chakra-ui/react';
import Presentacion from '../../components/Presentacion';
import RecommendedProducts from '../../components/RecommendedProducts';
import Fondo from '../../components/Fondo';
import FeaturedCategories from '../../components/FeaturedCategories';
import Footer from '../../components/Footer';
import KitsProduct from '../../components/KitsProduct';

import logo from '../../assets/icons/logo.svg';
import logoW from '../../assets/icons/logo-blanco.svg';
import img1 from '../../assets/images/fondo/img-fd1.png';
import img2 from '../../assets/images/fondo/img-fd2.png';

import { useGetFavoritesQuery, useGetKitsQuery } from '../../hooks/enbaapi';

const Home = () => {
  const { breakpoints } = useTheme();
  const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const [productsData, setProductsData] = useState(null);
  const [kitsData, setKitsData] = useState(null);
  const { data: products, isLoading: isProductsLoading, error: productsError } = useGetFavoritesQuery();
  const { data: kits, isLoading: isKitsLoading, error: kitsError } = useGetKitsQuery({
    "take": 100,
    "page": 0,
    "category": "",
    "name": ""
  });

  useEffect(() => {
      if(products){
          setProductsData(products);
      }
  },[products])

  useEffect(() => {
      if(kits){
        setKitsData(kits);
      }
  },[kits])


  return (
    <>
      <Presentacion />
      <Flex flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} padding={"3rem 6rem"} minHeight={"100vh"}>
        <RecommendedProducts 
          titleSection={"Productos destacados"}
          data={productsData} />
        <Fondo 
          bg={"#31689C"} fontColor={"#FFF"} icon={logoW}
          title={"Desarrollamos productos para ti"}
          txt1={"Nos especializamos en innovación y desarrollo de nuevos"}
          txt2={"productos para facilitar tu día a día."}
          img={img1} />
        <FeaturedCategories 
          titleSection={"Categorias destacadas"} />
        <Fondo 
          bg={"#DFD8D1"} fontColor={"#064A73"} icon={logo}
          title={"Lorem Ipsum is simply dummy"}
          txt1={"Lorem Ipsum is simply dummy text of the printing and"}
          txt2={"typesetting industry. Lorem Ipsum has"}
          img={img2} />
        <KitsProduct 
          titleSection={"Kits"}
          data={kitsData} />
      </Flex>
      <Footer />
    </>
  );
};
 
export default Home;
