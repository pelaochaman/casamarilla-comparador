import React from 'react'
import { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles'
import areas from './utils/Areas-de-interes';
import axios from 'axios'
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

function FormTrabajo() {
  const handles = useCssHandles(CSS_HANDLES);
  const [areaInteres, setAreaInteres] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cargo, setCargo] = useState('');
  const [msjeError, setMsjeError] = useState('');
  const [msjeSuccess, setMsjeSuccess] = useState('');
  const [datos, setDatos] = useState({})
  const handleInputChange = (event) => {

    console.log(event)

    if (event != undefined) {
      if (event.target) {
        if (event.target.attributes[0].value == "file") {
          console.log("se subio un file");
          setDatos({
            ...datos,
            [event.target.name]: event.target.files[0]
          })
        }
        else {
          console.log(datos, "else se subio un file")
          setDatos({
            ...datos,
            [event.target.name]: event.target.value
          })
        }
      }
    }
  }
  function validarDatos(e) {
    e.preventDefault();
    let body = {
      areaInteres: areaInteres,
      nombre: nombre,
      apellido: apellido,
      email: email,
      descripcion: descripcion,
      cargo: cargo
    }

    setTimeout(() => { setMsjeError('') }, 5000)
    setTimeout(() => { setMsjeSuccess('') }, 5000)

    if (body.areaInteres == '') {
      setMsjeError("El area de interes no puede estar vacia");
      return;
    }

    if (body.descripcion == '') {
      setMsjeError("La descripcion no puede estar vacia");
      return;
    }

    if ([areaInteres, nombre, apellido, descripcion, cargo].includes('')) {
      setMsjeError("Todos los campos deben ser completados");
      return;
    }

    if (!/^[A-Z\s]+$/i.test(body.name)) {
      setMsjeError("El nombre solo debe contener letras");
      return;
    }

    if (!/^[A-Z\s]+$/i.test(body.apellido)) {
      setMsjeError("El apellido solo debe contener letras");
      return;
    }

    if (body.cargo != '' && !/^[A-Z\s]+$/i.test(body.cargo)) {
      setMsjeError("EL campo cargo no puede estar vacio y debe contener solo letras");
      return;
    }

    setMsjeError(null);
    postInscripcion(body);
  }

  async function postInscripcion(body) {

    try {
      const resp = await axios({
        method: 'POST', url: '/api/dataentities/TN/documents/', data: body,
        headers: { 'Content-Type': 'application/json ', "Accept": "application/json" }
      });
      console.log(resp)
      let formData = new FormData();
      formData.append("curriculum", datos.curriculum);
      console.log(formData)
      const respF = await axios({
        method: 'post', url: '/api/dataentities/TN/documents/' + resp.data.DocumentId + '/curriculum/attachments', data: formData,
        headers: { 'Content-Type': 'multipart/form-data', "Accept": "*" }
      })
      console.log(respF)

      setMsjeSuccess("Sus datos se han ingresado correctamente")

    } catch (error) {
      console.log(error)
      setMsjeError("Datos adjuntados incorrectos")

    }
  }

  /*{areasDeInteres.map(clase => <option key={clase.value} value={clase.value}>{clase.label}</option>)}*/

  return (
    <form className={`${handles.formMasterClass}`} onSubmit={e => validarDatos(e)}>
      <div className={`${handles.contForm}`}>

        <label htmlFor="areaInteres" className={`${handles.labelMasterForm}`}>Selecciona un area de interes*</label>
        <select
          name="areaInteres"
          id="areaInteres"
          className={`${handles.selectMasterForm}`}
          onChange={e => setAreaInteres(e.target.value)}>
          {areas.map(area => <option key={area.value} value={area.value}>{area.label}</option>)}
        </select>

        <label htmlFor="nombre" className={`${handles.labelMasterForm}`}>Nombre*</label>
        <input
          type="text"
          id='nombre'
          className={`${handles.inputMasterForm}`}
          onChange={e => setNombre(e.target.value)}
        />

        <label htmlFor="apellido" className={`${handles.labelMasterForm}`}>Apellido*</label>
        <input
          type="text"
          id='apellido'
          className={`${handles.inputMasterForm}`}
          onChange={e => setApellido(e.target.value)}
        />

        <label htmlFor="email" className={`${handles.labelMasterForm}`}>Email*</label>
        <input
          type="email"
          id='email'
          className={`${handles.inputMasterForm}`}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="descripcion" className={`${handles.labelMasterForm}`}>Escribe una breve descripción de tus intereses y experiencia*</label>
        <textarea
          name="descripcion"
          id='descripcion'
          rows="10"
          cols="50"
          className={`${handles.inputMasterForm}`}
          onChange={e => setDescripcion(e.target.value)}>
        </textarea>

        <label htmlFor="cargo" className={`${handles.labelMasterForm}`}>Cargo deseado*</label>
        <input
          type="text"
          id='cargo'
          className={`${handles.inputMasterForm}`}
          onChange={e => setCargo(e.target.value)}
        />

        <label className={`${handles.labelMasterForm}`}>Curriculum*</label>
        <input
          type="file"
          className={`${handles.inputArchivo}`}
          onChange={handleInputChange}
          name="curriculum"
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

export default FormTrabajo