import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { selectProducts } from '../../hooks/slices/counterSlice';
import { Flex, IconButton } from '@chakra-ui/react';
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
    const pdfRef = useRef();
    const productsStore = useSelector(selectProducts);
    const [products, setProducts] = useState([]);
    const [onClosePdf, setOnClosePdf] = useState(false);
    const [transform] = usePostTransformImageMutation();
    const [isLoading, setIsLoading] = useState(true);

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
        //downloadPDF();
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
                        <div class="container" ref={pdfRef}>
                            <div class="grid-header">
                                <div class="grid-item-header">
                                    <img src={logo} width="100" height="56" alt="logo" />
                                </div>
                                <div class="grid-item-header">
                                    <div class="contact">
                                        <div class="contact-links">
                                            <div class="email">
                                                <img src={iconEmail} style={{ marginRight: "8px" }} width="25" height="25" alt="correo"/>
                                                <p>marketplace@enba.mx</p>
                                            </div>
                                            <div class="phone">
                                                <img src={iconTel} style={{ marginRight: "8px" }} width="25" height="25" alt="correo"/>
                                                <p>T. 33 3305 0000</p>
                                            </div>
                                        </div>
                                        <div class="address">
                                            <p>Av. Libertad 1211, Col. Centro, Guadalajara, Jalisco, CP 44100, MX</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-item-header">
                                    <div class="social-networks">
                                        <a href="https://www.linkedin.com/company/grupo-enba/about/">
                                            <img style={{ marginRight: "1rem" }} src={iconLk} width="40" height="40" alt="Linkedin"/>
                                        </a>
                                        <a href="https://www.instagram.com/grupoenbamx/?igshid=MzRlODBiNWFlZA%3D%3D">
                                            <img src={iconIg} width="40" height="40" alt="Instagram"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-table">
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
                                        {}
                                    </table>
                                </div>
                            </div>
                            <div class="grid-alert">
                                <div class="alert">
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
                    </>
                ): null
            }
        </>
    );
}
 
export default PDFQuoteProducts;
