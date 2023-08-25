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

export const productsTemplate = [
    {
        id: 1,
        url: img1,
        title: 'Termos',
        description: 'Termo Barrow',
        price: '152.25',
        promotion: 'Nuevo',
        bg: '#1E91D7'
    },
    {
        id: 2,
        url: img2,
        title: 'Mochilas',
        description: 'Mouse Tecno Soccer',
        price: '152.25',
        promotion: '-25%',
        bg: '#FF9900'
    },
    {
        id: 3,
        url: img3,
        title: 'CARPETAS',
        description: 'Carpeta con luz Tawang',
        price: '152.25',
        promotion: '-14%',
        bg: '#FF9900'
    },
    {
        id: 4,
        url: img4,
        title: 'ACCESORIOS SMARTPHONE Y TABLET',
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
        title: "Bebidas"
    },
    {
        id: 2,
        url: ctg2,
        title: "Bienestar"
    },
    {
        id: 3,
        url: ctg3,
        title: "Hogar y herramientas"
    },
    {
        id: 4,
        url: ctg4,
        title: "Oficina y tecnología"
    },
];

export const kitsTemplate = [
    {
        id: 1,
        url: img5,
        title: 'Casa',
        description: 'PINTA POR NÚMERO CREA',
        price: '152.25',
        promotion: '-5% en la compra del kit',
        bg: '#FF9900'
    },
    {
        id: 2,
        url: img6,
        title: 'Casa',
        description: 'Porta Notas Dokka',
        price: '152.25',
        promotion: '-5% en la compra del kit',
        bg: '#FF9900'
    },
    {
        id: 3,
        url: img5,
        title: 'Casa',
        description: 'PINTA POR NÚMERO CREA',
        price: '152.25',
        promotion: '-5% en la compra del kit',
        bg: '#FF9900'
    },
    {
        id: 4,
        url: img6,
        title: 'Casa',
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
        description: 'Mouse Tecno Soccer',
        price: '152.25',
        promotion: '-25%',
        bg: '#FF9900'
    },
    {
        id: 2,
        url: img3,
        title: 'CARPETAS',
        description: 'Carpeta con luz Tawang',
        price: '152.25',
        promotion: '-14%',
        bg: '#FF9900'
    },
    {
        id: 3,
        url: img4,
        title: 'ACCESORIOS SMARTPHONE Y TABLET',
        description: 'Cargador inalámbrico namu',
        price: '152.25',
        promotion: 'Oferta',
        bg: '#4FB42C'
    },
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
