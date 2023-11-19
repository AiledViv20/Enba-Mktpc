import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { selectProducts, selectKits } from '../../hooks/slices/counterSlice';
import { 
    Flex, 
    IconButton,
    useTheme,
    useMediaQuery
} from '@chakra-ui/react';
import logo from '../../assets/icons/logo.svg';
import iconLk from '../../assets/icons/footer/icon-lk.svg';
import iconIg from '../../assets/icons/footer/icon-ig.svg';
import iconEmail from '../../assets/icons/footer/email.svg';
import iconTel from '../../assets/icons/footer/tel.svg';
import iconInfo from '../../assets/icons/icon-info.svg';
import { usePostTransformImageMutation } from '../../hooks/enbaapi';

import { capitalizeFirstLetter, formatterValue } from '../../resource/validate';

import { FaFileDownload } from "react-icons/fa";

import './styled.scss';

const PDFQuoteProducts =  () => {
    const { breakpoints } = useTheme();
    const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    const pdfRef = useRef();
    const productsStore = useSelector(selectProducts);
    
    const [products, setProducts] = useState([]);
    const [onClosePdf, setOnClosePdf] = useState(false);
    const [transform] = usePostTransformImageMutation();
    const [isLoading, setIsLoading] = useState(true);
    const [subTotalSum, setSubTotalSum] = useState(0);
    const [sumIva, setSumIva] = useState(0);
    const [sumShopping, setSumShopping] = useState(0);
    const [sumTotalOrder, setSumTotalOrder] = useState(0);

    const downloadPDF = async () => {
        const input = pdfRef.current;
        if (input) {
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('cotizacion.pdf');
            window.close();
            setOnClosePdf(true);
        }
    }
    const imgB64 = async (url) => {
        return await transform({url: url ? url : 'https://cdn.pixabay.com/photo/2022/01/17/22/20/subtract-6945896_1280.png'}).then((response) => {
            if(response?.data?.image){
                return response.data.image
            } else {
                return 'https://cdn.pixabay.com/photo/2022/01/17/22/20/subtract-6945896_1280.png'
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    useEffect(() => {
        updateProductsWithImages();
    }, []);

    const updateProductsWithImages = async () => {
        setIsLoading(true);
        let imageB64 = '';
        if (productsStore.length > 0) {
            const imgPromises = productsStore.map(async (element) => {
                imageB64 = await imgB64(element.image);
                return {
                    ...element,
                    imageB64
                };
            });
            const productsWithImages = await Promise.all(imgPromises);
            setProducts(productsWithImages);
            setIsLoading(false);
        }else{
            setIsLoading(false);
        }
    };

    const calculateSend = () => {
        if (subTotalSum <= 3000) {
            return 199;
        } else if (subTotalSum >= 3000 && subTotalSum <= 10000) {
            return 99;
        } else if (subTotalSum > 10000) {
            return 0;
        }
    }

    useEffect(()=>{
        if (products.length > 0) {
            let sumP = 0;
            let sums = 0;
            let sumsIv = 0;
            let sumsSp = 0;
            if (products.length > 0) {
                products.forEach((elementP) => {
                    sumP = elementP.total_price + sumP;
                });
            }
            sums = sumP;
            sumsIv = sums * 0.16;
            sumsSp = calculateSend();
            setSubTotalSum(sums);
            setSumIva(sumsIv);
            setSumShopping(sumsSp);
            setSumTotalOrder(sums + sumsIv + sumsSp);
        }
    },[products])

    useEffect(()=>{
        console.log(pdfRef)
        downloadPDF()
    },[isLoading])

    useEffect(() => {
        if (onClosePdf) {
            window.close();
        }
    }, [onClosePdf])
    
    return ( 
        <>
            {
                !isLoading ? (
                    <>
                        <Flex justifyContent={"end"} pt={5} mr={10}>
                            <IconButton
                                variant='outline'
                                colorScheme='accent.500'
                                fontSize='20px'
                                icon={<FaFileDownload />}
                                onClick={() => downloadPDF()}
                                />
                        </Flex>
                        <div className="container" style={{ display: isGreaterThanMd ? "flex" : "none" }} ref={pdfRef}>
                            <div className="grid-header">
                                <div className="grid-item-header">
                                    <img src={logo} width="100" height="56" alt="logo" />
                                </div>
                                <div className="grid-item-header">
                                    <div className="contact">
                                        <div className="contact-links">
                                            <div className="email">
                                                <img src={iconEmail} style={{ marginRight: "8px" }} width="25" height="25" alt="correo"/>
                                                <p>marketplace@enba.mx</p>
                                            </div>
                                            <div className="phone">
                                                <img src={iconTel} style={{ marginRight: "8px" }} width="25" height="25" alt="correo"/>
                                                <p>T. 33 3305 0000</p>
                                            </div>
                                        </div>
                                        <div className="address">
                                            <p>Av. Libertad 1211, Col. Centro, Guadalajara, Jalisco, CP 44100, MX</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item-header">
                                    <div className="social-networks">
                                        <a href="https://www.linkedin.com/company/grupo-enba/about/">
                                            <img style={{ marginRight: "1rem" }} src={iconLk} width="40" height="40" alt="Linkedin"/>
                                        </a>
                                        <a href="https://www.instagram.com/grupoenbamx/?igshid=MzRlODBiNWFlZA%3D%3D">
                                            <img src={iconIg} width="40" height="40" alt="Instagram"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-table">
                                <div className='container-table'>
                                    <table style={{ borderRadius: "24px" }}>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Cant.</th>
                                            <th>Artículo</th>
                                            <th>Color</th>
                                            <th>Precio Unitario</th>
                                            <th>Total</th>
                                        </tr>
                                        {productsStore.length > 0 && products.length > 0 ? productsStore.map((item, idx) => {
                                            return (
                                                <tr key={idx} className='init-row-img'>
                                                    <td className='row-img'>
                                                        <img src={`${products[idx].imageB64}`} width='104px' height='80px' alt='img' />
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                    <td>{capitalizeFirstLetter(item.name)}</td>
                                                    <td>{capitalizeFirstLetter(item.color)}</td>
                                                    <td>{formatterValue(item.unit_price)}</td>
                                                    <td>{formatterValue(item.total_price)}</td>
                                                </tr>
                                            )
                                        }) : null}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{formatterValue(subTotalSum)}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className='grid-price'>
                                <div className='grid-price-list'>
                                    <p><span>{"IVA (16%): "}</span>{formatterValue(sumIva)}</p>
                                    <p><span>{"Costo de envio: "}</span>{formatterValue(sumShopping)}</p>
                                    <p><span>{"Total: "}</span>{formatterValue(sumTotalOrder)}</p>
                                </div>
                            </div>
                            <div className="grid-alert">
                                <div className="alert">
                                    <img src={iconInfo} style={{ marginRight: "8px" }} width="24" height="24" alt="icon info" />
                                    <p><span style={{ fontWeight: "700" }}>Vigencia de la cotización:</span> 15 Días naturales a partir de la fecha de expedición</p>
                                </div>
                            </div>
                            <div className='grid-footer'>
                                <div className='content-footer'>
                                    <p>
                                        Precios vigentes al día en que consulta o descarga esta cotización, los precios se encuentran 
                                        <br />sujetos a cambio sin previo aviso, se sugiere revise la página web frecuentemente. Sujeto a disponibilidad.
                                        <br />
                                        Consulte <a href='/terminos-condiciones'>Términos y Condiciones</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='container-mb' style={{ display: isGreaterThanMd ? "none" : "flex" }} ref={pdfRef}>
                            <div className='grid-header-mb'>
                                <div className="grid-item-header-mb">
                                    <img src={logo} width="100" height="56" alt="logo" />
                                </div>
                                <div className="contact-links-mb">
                                    <div className="email-mb">
                                        <img src={iconEmail} style={{ marginRight: "8px" }} width="25" height="25" alt="correo"/>
                                        <p>marketplace@enba.mx</p>
                                    </div>
                                    <div className="phone-mb">
                                        <img src={iconTel} style={{ marginRight: "8px" }} width="25" height="25" alt="correo"/>
                                        <p>T. 33 3305 0000</p>
                                    </div>
                                </div>
                                <div className="address-mb">
                                    <p>Av. Libertad 1211, Col. Centro, Guadalajara,<br />Jalisco, CP 44100, MX</p>
                                </div>
                            </div>
                            <div className='grid-table-mb'>
                                <div className='grid-cards-mb'>
                                    {productsStore.length > 0 && products.length > 0 ? productsStore.map((item, idx) => {
                                        return (
                                            <div key={idx} className='card-mb'>
                                                <div className='img_card'>
                                                    <img src={`${products[idx].imageB64}`} width='50px' height='80px' alt='img' />
                                                </div>
                                                <div className='data_card'>
                                                    <p>{capitalizeFirstLetter(item.name)}</p>
                                                    <span>{capitalizeFirstLetter(item.color)}</span><br />
                                                    <span className='product-quantity'>{"Cant: "}{item.quantity}</span><br /><br />
                                                    <span>{formatterValue(item.total_price)}</span>
                                                </div>
                                            </div>
                                        )
                                    }) : null}
                                </div>
                            </div>
                            <div className='grid-price-mb'>
                                <div className='grid-price-list-mb'>
                                    <p><span>{"IVA (16%): "}</span>{formatterValue(sumIva)}</p>
                                    <p><span>{"Costo de envio: "}</span>{formatterValue(sumShopping)}</p>
                                    <p><span>{"Total: "}</span>{formatterValue(sumTotalOrder)}</p>
                                </div>
                            </div>
                            <div className="grid-alert-mb">
                                <div className="alert-mb">
                                    <img src={iconInfo} style={{ marginRight: "8px" }} width="24" height="24" alt="icon info" />
                                    <p><span style={{ fontWeight: "700" }}>Vigencia de la cotización:</span><br /><br />15 Días naturales a partir de la<br />fecha de expedición</p>
                                </div>
                            </div>
                            <div className='grid-footer-mb'>
                                <div className='content-footer-mb'>
                                    <p>
                                        Precios vigentes al día en que consulta<br />o descarga esta cotización, los precios se<br />encuentran 
                                        sujetos a cambio sin previo aviso,<br />se sugiere revise la página web frecuentemente.<br />Sujeto a disponibilidad.
                                        <br />
                                        Consulte <a href='/terminos-condiciones'>Términos y Condiciones</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ): null
            }
        </>
    );
}
 
export default PDFQuoteProducts;
