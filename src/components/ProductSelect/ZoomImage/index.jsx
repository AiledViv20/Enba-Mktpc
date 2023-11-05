import React from 'react';
import './zoom.css';

const ZoomImage = ({ src, alt }) => {

    function zoom(e) {
        var zoomer = e.currentTarget;
        var offsetX, offsetY, x, y;
    
        if (e && e.nativeEvent) {
          e = e.nativeEvent; // Obtén el evento nativo de React si es necesario
        }
    
        if (e.offsetX !== undefined && e.offsetY !== undefined) {
          offsetX = e.offsetX;
          offsetY = e.offsetY;
        } else if (e.touches && e.touches[0]) {
          offsetX = e.touches[0].pageX - e.currentTarget.getBoundingClientRect().left;
          offsetY = e.touches[0].pageY - e.currentTarget.getBoundingClientRect().top;
        } else {
          offsetX = 0;
          offsetY = 0;
        }
    
        x = (offsetX / zoomer.offsetWidth) * 100;
        y = (offsetY / zoomer.offsetHeight) * 100;
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
    }

    return (
        <figure
            className="zoom"
            onMouseMove={zoom}
            onTouchMove={zoom}
            style={{ backgroundImage: `url(${src})` }}>
            <img src={src} alt={alt} />
        </figure>
    );
};

export default ZoomImage;