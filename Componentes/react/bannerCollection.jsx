import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function bannerCollection() {
    const [verificador,setVerificador] = useState(false);

    useEffect(() =>{
        if(window.location.pathname == "/184"){
            setVerificador(true);
        }
    },[])

    if(verificador){
        return (
            <a href="/Licores" style={{width:"100%"}}>
                <picture>
                    <source srcset="https://directwines.vteximg.com.br/arquivos/Licores_De-Categoría_Mundial_Directwines.cl_Desk.jpg" alt="Variedad en Licores, Piscos, Gin, Tequila, Vodka, Whisky y otros con las mejores ofertas en Directwines.cl" media="(max-width: 991px)"/>
                    <img src="https://directwines.vteximg.com.br/arquivos/Licores_De-Categor%C3%ADa_Mundial_Directwines.cl_Desk.jpg" alt="Variedad en Licores, Piscos, Gin, Tequila, Vodka, Whisky y otros con las mejores ofertas en Directwines.cl" style={{width:"100%"}}/>
                </picture>
            </a>
        )
    }else{
        return null;
    }
}

export default bannerCollection