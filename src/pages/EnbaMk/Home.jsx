import React from 'react';
import { Flex, useMediaQuery, useTheme } from '@chakra-ui/react';
import Presentacion from '../../components/Presentacion';
import RecommendedProducts from '../../components/RecommendedProducts';
import Fondo from '../../components/Fondo';
import FeaturedCategories from '../../components/FeaturedCategories';
/* 
import Contacto from '../../components/Contacto';
import Footer from '../../components/Footer'; 
import ContactoMobile from '../../components/Contacto/Mobile';
*/

import { productsTemplate, kitsTemplate } from '../../resource';

import logo from '../../assets/icons/logo.svg';
import logoW from '../../assets/icons/logo-blanco.svg';
import img1 from '../../assets/images/fondo/img-fd1.png';
import img2 from '../../assets/images/fondo/img-fd2.png';

const Home = () => {
  const { breakpoints } = useTheme();
  const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

  return (
    <>
      <Presentacion />
      <Flex flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} padding={"3rem 6rem"} minHeight={"100vh"}>
        <RecommendedProducts 
          titleSection={"Productos destacados"}
          productsTemplate={productsTemplate} />
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
        <RecommendedProducts 
          titleSection={"Kits"}
          productsTemplate={kitsTemplate} />
      </Flex>
    </>
  );
};
 
export default Home;

/*

return (
    <>
      {isGreaterThanMd ?
        <Contacto /> : <ContactoMobile />
      }
      <Footer />
    </>
  );

*/