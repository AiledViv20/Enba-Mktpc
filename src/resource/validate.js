import g1 from '../assets/images/gallery/img1.png';
import g2 from '../assets/images/gallery/img2.png';
import g3 from '../assets/images/gallery/img3.png';
import g4 from '../assets/images/gallery/img4.png';
import g5 from '../assets/images/gallery/img5.png';
import g6 from '../assets/images/gallery/img6.png';
import g7 from '../assets/images/gallery/img7.png';
import g8 from '../assets/images/gallery/img8.png';
import g9 from '../assets/images/gallery/img9.png';
import g10 from '../assets/images/gallery/img10.png';
import g11 from '../assets/images/gallery/img11.png';
import g12 from '../assets/images/gallery/img12.png';
import g13 from '../assets/images/gallery/img13.png';

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
    { id: 0, images: [ { id: 1, imgUrl: g1 }, { id: 2, imgUrl: g6 }, { id: 3, imgUrl: g10 }, { id: 4, imgUrl: g11 }, { id: 5, imgUrl: g12 }, { id: 6, imgUrl: g13 } ] },
    { id: 1, images: [ { id: 1, imgUrl: g2 }, { id: 2, imgUrl: g7 } ]  },
    { id: 2, images: [ { id: 1, imgUrl: g3 }, { id: 2, imgUrl: g8 } ]  },
    { id: 3, images: [ { id: 1, imgUrl: g4 }, { id: 2, imgUrl: g9 } ] },
    { id: 4, images: [ { id: 1, imgUrl: g5 } ] }
]