import axios from 'axios';
import fileDownload from 'js-file-download';

import img2 from '../assets/images/productsT/mouse.png';
import img3 from '../assets/images/productsT/carpeta.png';
import img4 from '../assets/images/productsT/cargador.png';

import ctg1 from '../assets/images/categoriesT/bebidas.svg';
import ctg2 from '../assets/images/categoriesT/bienestar.svg';
import ctg3 from '../assets/images/categoriesT/hogar.svg';
import ctg4 from '../assets/images/categoriesT/oficina.svg';
import ctg5 from '../assets/images/categoriesT/textiles.svg';
import ctg6 from '../assets/images/categoriesT/tiempo-libre.svg';
import ctg7 from '../assets/images/categoriesT/marcas.svg';

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
    {
        id: 5,
        url: ctg5,
        url_reditect: "PLAYERAS",
        title: "Textiles"
    },
    {
        id: 6,
        url: ctg6,
        url_reditect: "JUGUETES",
        title: "Tiempo libre"
    },
    {
        id: 7,
        url: ctg7,
        url_reditect: "DECORACION",
        title: "Marcas"
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
