import React from 'react'
import { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles'
import { useRut } from "./node_modules/react-rut-formatter";


const CSS_HANDLES = [
  'labelMasterForm',
  'selectMasterForm',
  'inputMasterForm',
  'formMasterClass',
  'contMasterForm',
  'contEnviar',
  'enviarForm',
  'contForm',
  'error',
  'success'
]

function FormularioMaster() {
  const handles = useCssHandles(CSS_HANDLES);
  const [tipoClase, setTipoClase] = useState('');
  const [nombre, setNombre] = useState('');
  const { rut, updateRut, isValid } = useRut();
  const [email, setEmail] = useState('');
  const [tipoCompra, setTipoCompra] = useState('');
  const [nBoleta, setNBoleta] = useState('');
  const [msjeError, setMsjeError] = useState('');
  const [msjeSuccess, setMsjeSuccess] = useState('');

  const clases = [
    { value: '', label: '' },
    { value: 'armonica', label: 'Armónicas con Claudio Bluesman' },
    { value: 'ukelele', label: 'Ukeleles con Diego Alonso' }
  ]

  function validarDatos(e) {
    e.preventDefault();
    let body = {
      class: tipoClase,
      name: nombre,
      rut: rut.raw.replace('-',''),
      email: email,
      lugarCompra: tipoCompra,
      nBoleta: nBoleta,
    }

    setTimeout(()=>{setMsjeError('')},5000)
    setTimeout(()=>{setMsjeSuccess('')},5000)

    if([tipoClase,nombre,rut,email,tipoCompra,nBoleta].includes('')){
      setMsjeError("Todos los campos deben ser completados");
      
      return;
    }

    if(!/^[A-Z\s]+$/i.test(body.name)){
      setMsjeError("El nombre solo debe contener letras");
      return;
    }

    if(!isValid && rut.formatted != ''){
      setMsjeError("RUT inválido")
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(body.email)){
      setMsjeError("La dirección de email es incorrecta. Ej: xxxx@xxx.xx");
      return;
    }

    if(!/^([0-9])*$/.test(body.nBoleta)){
      setMsjeError("El numero de boleta o pedido deben ser solo digitos");
      return;
    }
    
    if(body.lugarCompra == 'tienda'){
      if(body.nBoleta.length <6 || body.nBoleta.length >9){
        setMsjeError("Numero de boleta invalido");
        return;
      }
    }

    if(body.lugarCompra == 'web' && body.nBoleta.length != 13){
      setMsjeError("Numero de pedido invalido");
      return;
    }

    setMsjeError(null);
    postInscripcion(body);
  }

  async function postInscripcion(body) {
    let url = '/api/dataentities/IM/documents/';
    const apikey = 'vtexappkey-casamarilla-YHIFCL';
    const apitoken ='WZCLIYTEMKRULRUMRAYBPTYHVNXIFEDLDAHJQRWXXZRYQBIUFJUJGPGDAVQUBLZHHGRKKLVZDAEPBZQTFDCWKTFOTEIVBCVLAJQKKXKUNUGFLRBBEWPXIDXOBCQGCZYB'
    
    let option = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 
        'Content-Type': 'application/json ',
        "Accept": "application/json",
        'X-VTEX-API-AppToken': apitoken,
        'X-VTEX-API-AppKey': apikey
      }
    }
    try {
      const resp = await fetch(url, option);
      if (resp.ok) {
        console.log(resp.json())
        setMsjeSuccess("Sus datos se han ingresado correctamente")
      }
    } catch (error) {
      console.log(error)
      alert("Datos adjuntados incorrectos")
    }
  }

  return (
    <form className={`${handles.formMasterClass}`} onSubmit={e => validarDatos(e)}>
      <div className={`${handles.contForm}`}>

          <label htmlFor="inscripcionClase" className={`${handles.labelMasterForm}`}>Selecciona una clase*</label>
          <select 
            name="inscripcionClase"
            id="inscripcionClase"
            className={`${handles.selectMasterForm}`}
            onChange={e => setTipoClase(e.target.value)}>
            {clases.map(clase => <option key={clase.value} value={clase.value}>{clase.label}</option>)}
          </select>

          <label htmlFor="nombre" className={`${handles.labelMasterForm}`}>Nombre Completo*</label>
          <input 
            type="text"
            id='nombre'
            className={`${handles.inputMasterForm}`}
            onChange={e => setNombre(e.target.value)}
          />
        
          <label htmlFor="rut" className={`${handles.labelMasterForm}`}>Rut*</label>
          <input 
            type="text"
            id='rut'
            className={`${handles.inputMasterForm}`}
            value={rut.formatted}
            onChange={(e) => updateRut(e.target.value)} 
          />

          <label htmlFor="email" className={`${handles.labelMasterForm}`}>Email*</label>
          <input 
            type="text"
            id='email'
            className={`${handles.inputMasterForm}`}
            onChange={e => setEmail(e.target.value)}
          />
        
          <label htmlFor="lugarCompra" className={`${handles.labelMasterForm}`}>Comprado en*</label>
          <select 
            name="lugarCompra"
            id="lugarCompra"
            className={`${handles.selectMasterForm}`}
            onChange={e => setTipoCompra(e.target.value)}>
            <option value=''></option>
            <option value="tienda">Tienda</option>
            <option value="web">Web</option>
          </select>
        
          <label htmlFor="boleta" className={`${handles.labelMasterForm}`}>
            {tipoCompra=='tienda'? "Numero de boleta*": tipoCompra=='web'? "Numero de pedido*" : 'Numero de boleta o pedido*'}
          </label>
          <input 
            type="text"
            id='boleta'
            className={`${handles.inputMasterForm}`}
            onChange={e => setNBoleta(e.target.value)}
          />
          {msjeError && <span className={`${handles.error}`}>{msjeError}</span>}
          {msjeSuccess && <span className={`${handles.success}`}>{msjeSuccess}</span>}
          <input 
            type="submit"
            value='Enviar'
            className={`${handles.enviarForm}`}
          />
      </div>
    </form>
  )
}

export default FormularioMaster