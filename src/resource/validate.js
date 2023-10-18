import g1 from '../assets/images/gallery/img1.png';
import g2 from '../assets/images/gallery/img2.png';
import g3 from '../assets/images/gallery/img3.png';
import g4 from '../assets/images/gallery/img4.png';
import g5 from '../assets/images/gallery/img5.png';
import g6 from '../assets/images/gallery/img6.png';
import g7 from '../assets/images/gallery/img7.png';
import g8 from '../assets/images/gallery/img8.png';
import g9 from '../assets/images/gallery/img9.png';

const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
});

export const formatterValue = (value) => {
    return formatter.format(value);
}

export const  capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const galleryList = [
    { id: 0, imgUrl: g1 },
    { id: 1, imgUrl: g2 },
    { id: 2, imgUrl: g3 },
    { id: 3, imgUrl: g4 },
    { id: 4, imgUrl: g5 },
    { id: 5, imgUrl: g6 },
    { id: 6, imgUrl: g7 },
    { id: 7, imgUrl: g8 },
    { id: 8, imgUrl: g9 }
]