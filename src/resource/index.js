import axios from 'axios';
import fileDownload from 'js-file-download';

import img1 from '../assets/images/productsT/termo.png';
import img2 from '../assets/images/productsT/mouse.png';
import img3 from '../assets/images/productsT/carpeta.png';
import img4 from '../assets/images/productsT/cargador.png';

import ctg1 from '../assets/images/categoriesT/bebidas.svg';
import ctg2 from '../assets/images/categoriesT/bienestar.svg';
import ctg3 from '../assets/images/categoriesT/hogar.svg';
import ctg4 from '../assets/images/categoriesT/oficina.svg';

import img5 from '../assets/images/productsT/cuaderno.png';
import img6 from '../assets/images/productsT/notas.png';

import img7 from '../assets/images/productsT/mochila.png';
import img8 from '../assets/images/productsT/cilindro.png';
import img9 from '../assets/images/productsT/audifonos.png';

export const handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
}

export const colors = [
    {
        id: 10,
        hex: "#FFFFFF",
        color: "BLANCO"
    },
    {
        id: 1,
        hex: "#D9D9D9",
        color: "GRIS"
    },
    {
        id: 2,
        hex: "#000000",
        color: "NEGRO"
    },
    {
        id: 3,
        hex: "#1A6EA0",
        color: "AZUL"
    },
    {
        id: 4,
        hex: "#064A73",
        color: "AZUL MARINO"
    },
    {
        id: 5,
        hex: "#6ACC47",
        color: "VERDE"
    },
];

export const colors_complement = [
    {
        id: 9,
        hex: "#FFD200",
        color: "AMARILLO"
    },
    {
        id: 8,
        hex: "#FE983D",
        color: "NARANJA"
    },
    {
        id: 7,
        hex: "#FE5F5E",
        color: "ROSA"
    },
    {
        id: 6,
        hex: "#E40000",
        color: "ROJO"
    },
    {
        id: 12,
        hex: "#800080",
        color: "MORADO"
    },
    {
        id: 11,
        hex: "#C19A6B",
        color: "CAFE"
    },
];

export const productsTemplate = [
    {
        id: 1,
        url: img1,
        title: 'Termos',
        name: "termo-barrow",
        description: 'Termo Barrow',
        price: '152.25',
        promotion: 'Nuevo',
        bg: '#1E91D7'
    },
    {
        id: 2,
        url: img2,
        title: 'Mochilas',
        name: "mouse-tecno-soccer",
        description: 'Mouse Tecno Soccer',
        price: '152.25',
        promotion: '-25%',
        bg: '#FF9900'
    },
    {
        id: 3,
        url: img3,
        title: 'CARPETAS',
        name: "carpeta-luz-tawang",
        description: 'Carpeta con luz Tawang',
        price: '152.25',
        promotion: '-14%',
        bg: '#FF9900'
    },
    {
        id: 4,
        url: img4,
        title: 'ACCESORIOS SMARTPHONE Y TABLET',
        name: "cargador-inalambrico-namu",
        description: 'Cargador Inalámbrico namu',
        price: '152.25',
        promotion: 'Oferta',
        bg: '#4FB42C'
    }
];

export const categoriesTemplate = [
    {
        id: 1,
        url: ctg1,
        url_reditect: "CILINDRO",
        title: "Bebidas"
    },
    {
        id: 2,
        url: ctg2,
        url_reditect: "BELLEZA",
        title: "Bienestar"
    },
    {
        id: 3,
        url: ctg3,
        url_reditect: "HERRAMIENTAS",
        title: "Hogar y herramientas"
    },
    {
        id: 4,
        url: ctg4,
        url_reditect: "ESCRITORIO",
        title: "Oficina y tecnología"
    },
];

export const kitsTemplate = [
    {
        id: 1,
        url: img5,
        title: 'Casa',
        name: "pinta-numero-crea",
        description: 'PINTA POR NÚMERO CREA',
        price: '152.25',
        promotion: '-5% en la compra del kit',
        bg: '#FF9900'
    },
    {
        id: 2,
        url: img6,
        title: 'Casa',
        name: "porta-notas-dokka",
        description: 'Porta Notas Dokka',
        price: '152.25',
        promotion: '-5% en la compra del kit',
        bg: '#FF9900'
    },
    {
        id: 3,
        url: img5,
        title: 'Casa',
        name: "pinta-numero-crea",
        description: 'PINTA POR NÚMERO CREA',
        price: '152.25',
        promotion: '-5% en la compra del kit',
        bg: '#FF9900'
    },
    {
        id: 4,
        url: img6,
        title: 'Casa',
        name: "porta-notas-dokka",
        description: 'Porta Notas Dokka',
        price: '152.25',
        promotion: '-5% en la compra del kit',
        bg: '#FF9900'
    }
];

export const listSearchCategories = [
    {
        id: 1,
        url: img2,
        title: 'Mochilas',
        name: "mouse-tecno-soccer",
        description: 'Mouse Tecno Soccer',
        price: '152.25',
        promotion: '-25%',
        bg: '#FF9900'
    },
    {
        id: 2,
        url: img3,
        title: 'CARPETAS',
        name: "carpeta-luz-tawang",
        description: 'Carpeta con luz Tawang',
        price: '152.25',
        promotion: '-14%',
        bg: '#FF9900'
    },
    {
        id: 3,
        url: img4,
        title: 'ACCESORIOS SMARTPHONE Y TABLET',
        name: "cargador-inalambrico-namu",
        description: 'Cargador inalámbrico namu',
        price: '152.25',
        promotion: 'Oferta',
        bg: '#4FB42C'
    }
];

/*
    {
        id: 4,
        url: img1,
        title: 'Termos',
        description: 'Termo Barrow',
        price: '152.25',
        promotion: 'Nuevo',
        bg: '#1E91D7'
    },
    ,
    {
        id: 5,
        url: img7,
        title: 'Mochilas',
        description: 'Mochila Lift Verde',
        price: '152.25',
        promotion: 'Nuevo',
        bg: '#1E91D7'
    },
    ,
    {
        id: 6,
        url: img8,
        title: 'Mochilas',
        description: 'Cilindro de vidrio idara amarillo',
        price: '152.25',
        promotion: 'Oferta',
        bg: '#4FB42C'
    },
    {
        id: 7,
        url: img9,
        title: 'Mochilas',
        description: 'Audifonos Sound Gris',
        price: '152.25',
        promotion: '-14%',
        bg: '#FF9900'
    },
    {
        id: 8,
        url: img8,
        title: 'Mochilas',
        description: 'Cilindro de vidrio idara amarillo',
        price: '152.25',
        promotion: 'Oferta',
        bg: '#4FB42C'
    },
    {
        id: 9,
        url: img2,
        title: 'Mochilas',
        description: 'Mouse Tecno Soccer',
        price: '152.25',
        promotion: '-25%',
        bg: '#FF9900'
    },
    {
        id: 10,
        url: img2,
        title: 'Mochilas',
        description: 'Mouse Tecno Soccer',
        price: '152.25',
        promotion: '-25%',
        bg: '#FF9900'
    },
    {
        id: 11,
        url: img3,
        title: 'CARPETAS',
        description: 'Carpeta con luz Tawang',
        price: '152.25',
        promotion: '-25%',
        bg: '#FF9900'
    },
    {
        id: 12,
        url: img4,
        title: 'ACCESORIOS SMARTPHONE Y TABLET',
        description: 'Cargador inalámbrico namu',
        price: '152.25',
        promotion: 'Oferta',
        bg: '#4FB42C'
    },
*/

export const colors_dict = [
    {
        color: 'AZUL MARINO',
        hex: "#064A73",
    },
    {
        color: 'VERDE',
        hex: "#6ACC47",
    },
    {
        color: 'AMARILLO',
        hex: "#FFD200",
    },
    {
        color: 'NARANJA',
        hex: "#FE983D",
    },
    {
        color: 'ROSA',
        hex: "#FE5F5E",
    },
    {
        color:'ROJO',
        hex: "#E40000",
    },
    {
        color: 'MORADO', 
        hex: "#800080",
    },
    {
        color: 'CAFE',
        hex: "#C19A6B",
    },
    {
        color: 'BLANCO',
        hex: "#FFFFFF",
    },
    {
        color: 'NEGRO',
        hex: "#000000",
    },
    {
        color: 'GRIS',
        hex: "#A4A4A4",
    },
    {
        color: 'AZUL',
        hex: "#1A6EA0",
    },
];

export const colors_print_product = [
    {
        id: 1,
        hex: "#D9D9D9",
        color: "GRIS"
    },
    {
        id: 2,
        hex: "#000000",
        color: "NEGRO"
    },
    {
        id: 3,
        hex: "#1A6EA0",
        color: "AZUL"
    },
    {
        id: 4,
        hex: "#064A73",
        color: "AZUL MARINO"
    },
    {
        id: 5,
        hex: "#6ACC47",
        color: "VERDE"
    },
    {
        id: 6,
        hex: "#E40000",
        color: "ROJO"
    },
    {
        id: 7,
        hex: "#FE5F5E",
        color: "ROSA"
    },
    {
        id: 8,
        hex: "#FE983D",
        color: "NARANJA"
    }
];