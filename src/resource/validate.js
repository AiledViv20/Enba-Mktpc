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

export const redirectToWhatsApp = () => {
    const phoneNumber = '3333050000';
    const message = 'Hola, quisiera más información sobre algunos productos.';
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}
