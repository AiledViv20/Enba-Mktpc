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
        hex: "#A4A4A4",
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
        hex: "#000080",
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
        hex: "#FF91AE",
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
        url_reditect: "BEBIDAS",
        title: "Bebidas"
    },
    {
        id: 2,
        url: ctg2,
        url_reditect: "BIENESTAR",
        title: "Bienestar"
    },
    {
        id: 3,
        url: ctg3,
        url_reditect: "HOGAR Y HERRAMIENTAS",
        title: "Hogar y herramientas"
    },
    {
        id: 4,
        url: ctg4,
        url_reditect: "OFICINA Y TECNOLOGIA",
        title: "Oficina y tecnología"
    },
    {
        id: 5,
        url: ctg5,
        url_reditect: "TEXTILES",
        title: "Textiles"
    },
    {
        id: 6,
        url: ctg6,
        url_reditect: "TIEMPO LIBRE",
        title: "Tiempo libre"
    },
    /*{
        id: 7,
        url: ctg7,
        url_reditect: "Otras",
        title: "Otras"
    }*/
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
        color: 'AMARILLO',
        hex: "#FFD200",
    },
    {
        color: 'AMARILLO METALICO',
        hex: "#FFFF00",
    },
    {
        color: 'AMARILLO PASTEL',
        hex: "#FDFD96",
    },
    {
        color: 'AMARILLO TRASLUCIDO',
        hex: "#FFFF00",
    },
    {
        color: 'AZUL',
        hex: "#1A6EA0",
    },
    {
        color: 'AZUL CIELO',
        hex: "#0CB7F2",
    },
    {
        color: 'AZUL CON VERDE',
        hex: "#009C8C",
    },
    {
        color: 'AZUL MARINO',
        hex: "#000080",
    },
    {
        color: 'AZUL METALICO',
        hex: "#5391C7",
    },
    {
        color: 'AZUL PASTEL',
        hex: "#B2DAFA",
    },
    {
        color: 'AZUL REY',
        hex: "#051F61",
    },
    {
        color: 'AZUL TRASLUCIDO',
        hex: "#58CCE9",
    },
    {
        color: 'BEIGE',
        hex: "#FFDFC9",
    },
    {
        color: 'BICOLOR',
        hex: "#3D5B81",
    },
    {
        color: 'BLANCO',
        hex: "#F7F7F7",
    },
    {
        color: 'BLANCO CON AMARILLO',
        hex: "#F3F2DA",
    },
    {
        color: 'BLANCO CON AZUL',
        hex: "#C6DBF0",
    },
    {
        color: 'BLANCO CON GRIS',
        hex: "#DCDCDC",
    },
    {
        color: 'BLANCO CON NEGRO',
        hex: "#262626",
    },
    {
        color: 'BLANCO FIESTA',
        hex: "#E6E6E6",
    },
    {
        color: 'BLANCO FROSTY',
        hex: "#F2EEEB",
    },
    {
        color: 'BLANCO TRASLUCIDO',
        hex: "#F7F7F7",
    },
    {
        color: 'CAFE',
        hex: "#C19A6B",
    },
    {
        color: 'CASAS',
        hex: "#444444",
    },
    {
        color: 'CIRCULOS',
        hex: "#444444",
    },
    {
        color: 'CIRCULOS AZULES',
        hex: "#1A6EA0",
    },
    {
        color: 'CUADROS',
        hex: "#444444",
    },
    {
        color: 'FLORES',
        hex: "#444444",
    },
    {
        color: 'GRIS',
        hex: "#A4A4A4",
    },
    {
        color: 'GRIS METALICO',
        hex: "#E3E4E5",
    },
    {
        color: 'GRIS OXFORD',
        hex: "#393D42",
    },
    {
        color: 'GRIS TRASLUCIDO',
        hex: "#A4A4A4",
    },
    {
        color: 'HOJAS',
        hex: "#B6D23E",
    },
    {
        color: 'HUESO',
        hex: "#DCBAA4",
    },
    {
        color: 'KAKI',
        hex: "#D8BD86",
    },
    {
        color: 'MADERA',
        hex: "#804000",
    },
    {
        color: 'MARMOL',
        hex: "#FFFCF0",
    },
    {
        color: 'MORADO',
        hex: "#800080",
    },
    {
        color: 'MORADO PASTEL',
        hex: "#CCA9DD",
    },
    {
        color: 'MORADO TRASLUCIDO',
        hex: "#7C369C",
    },
    {
        color: 'MULTICOLOR',
        hex: "#444444",
    },
    {
        color: 'NARANJA',
        hex: "#FE983D",
    },
    {
        color: 'NARANJA NEON',
        hex: "#FE983D",
    },
    {
        color: 'NARANJA TRASLUCIDO',
        hex: "#FF8B24",
    },
    {
        color: 'NEGRO',
        hex: "#000000",
    },
    {
        color: 'NEGRO CON PLATA',
        hex: "#2E2E2E",
    },
    {
        color: 'NEGRO METALICO',
        hex: "#2D2D2E",
    },
    {
        color: 'NEGRO TRASLUCIDO',
        hex: "#000000",
    },
    {
        color: 'NULL',
        hex: "#444444",
    },
    {
        color: 'ORO',
        hex: "#E8B20F",
    },
    {
        color: 'PLATA',
        hex: "#DCDDDE",
    },
    {
        color: 'PLATA MATE',
        hex: "#DCDDDE",
    },
    {
        color: 'PLATA TRASLUCIDO',
        hex: "#DCDDDE",
    },
    {
        color: 'ROJO',
        hex: "#E40000",
    },
    {
        color: 'ROJO METALICO',
        hex: "#E40000",
    },
    {
        color: 'ROJO TRASLUCIDO',
        hex: "#E40000",
    },
    {
        color: 'ROSA',
        hex: "#FF91AE",
    },
    {
        color: 'ROSA METALICO',
        hex: "#FF91AE",
    },
    {
        color: 'ROSA NEON',
        hex: "#FF91AE",
    },
    {
        color: 'ROSA PASTEL',
        hex: "#F7BAC5",
    },
    {
        color: 'ROSA TRASLUCIDO',
        hex: "#FE5F5E",
    },
    {
        color: 'ROSE GOLD',
        hex: "#B16B75",
    },
    {
        color: 'TINTO',
        hex: "#5B2028",
    },
    {
        color: 'TORNASOL',
        hex: "#542261",
    },
    {
        color: 'TRANSPARENTE',
        hex: "#F7F7F7",
    },
    {
        color: 'VERDE',
        hex: "#6ACC47",
    },
    {
        color: 'VERDE METALICO',
        hex: "#6ACC47",
    },
    {
        color: 'VERDE NEON',
        hex: "#6ACC47",
    },
    {
        color: 'VERDE  PASTEL',
        hex: "#B7E5B0",
    },
    {
        color: 'VERDE TRASLUCIDO',
        hex: "#6ACC47",
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
