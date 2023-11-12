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

import img1 from '../../assets/images/fondo/bg1.png';
import img2 from '../../assets/images/fondo/bg2.png';
import img1Mb from '../../assets/images/fondo/bg1-mb.png';
import img2Mb from '../../assets/images/fondo/bg2-mb.png';

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
      <Flex flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} padding={isGreaterThanMd ? "3rem 6rem" : "1rem 0.8rem"} minHeight={"100vh"}>
        <RecommendedProducts 
          titleSection={"Productos destacados"}
          data={productsData} />
        <Fondo
          bg={img1}
          bgmb={img1Mb} />
        <FeaturedCategories 
          titleSection={"Categorias destacadas"}
          data={categoriesTemplate} />
        <Fondo
          bg={img2}
          bgmb={img2Mb} />
        <KitsProduct 
          titleSection={"Kits"} />
      </Flex>
      <Footer />
    </>
  );
};
 
export default Home;
