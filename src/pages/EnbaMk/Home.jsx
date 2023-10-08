import React, { useState, useEffect } from 'react';
import { 
  Flex,
  useTheme,
  useMediaQuery
} from '@chakra-ui/react';
import Presentacion from '../../components/Presentacion';
import RecommendedProducts from '../../components/RecommendedProducts';
import Fondo from '../../components/Fondo';
import FeaturedCategories from '../../components/FeaturedCategories';
import Footer from '../../components/Footer';
import KitsProduct from '../../components/KitsProduct';

import { categoriesTemplate } from '../../resource';

import logo from '../../assets/icons/logo.svg';
import logoW from '../../assets/icons/logo-blanco.svg';
import img1 from '../../assets/images/fondo/img-fd1.png';
import img2 from '../../assets/images/fondo/img-fd2.png';

import { useGetFavoritesQuery } from '../../hooks/enbaapi';

const Home = () => {
  const { breakpoints } = useTheme();
  const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const [productsData, setProductsData] = useState(null);
  const { data: products, isLoading: isProductsLoading, error: productsError } = useGetFavoritesQuery();

  useEffect(() => {
      if(products){
          setProductsData(products);
      }
  },[products])

  return (
    <>
      <Presentacion />
      <Flex flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} padding={isGreaterThanMd ? "3rem 6rem" : "1rem 0.8rem"} minHeight={"100vh"}>
        <RecommendedProducts 
          titleSection={"Productos destacados"}
          data={productsData} />
        <Fondo 
          space={10}
          bg={"#31689C"} fontColor={"#FFF"} icon={logoW}
          title={"“Hecho por ti y para ti.”"}
          img={img1} />
        <FeaturedCategories 
          titleSection={"Categorias destacadas"}
          data={categoriesTemplate} />
        <Fondo 
          soace={0}
          bg={"#DFD8D1"} fontColor={"#064A73"} icon={logo}
          title={"“Hecho por ti y para ti.”"}
          img={img2} />
        <KitsProduct 
          titleSection={"Kits"} />
      </Flex>
      <Footer />
    </>
  );
};
 
export default Home;
