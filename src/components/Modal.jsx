import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const Modal = ({modal, carrito, setCarrito}) => {
  const { id, nombre, marca, descripcion, imagen, Caracteristicas, precio } = modal
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const modalproducto = document.getElementById('modalproducto')
    const produtoSeleccionado = {
      id,
      nombre,
      precio
    }

    agregarCarrito(produtoSeleccionado)
    modalproducto.classList.add('hidden')
    modalproducto.classList.remove('mostrar')
  }

  const agregarCarrito = producto => {    
    if(carrito.some( articulo => articulo.id === producto.id)){      
      setMensaje('Producto duplicado')      

      setTimeout(() => {
        setMensaje('')
      }, 3000);
    }else{
      setCarrito([...carrito, producto])
      setMensaje('Producto añadido')      

      setTimeout(() => {
        setMensaje('')
      }, 3000);
    }    
  }

  return (
    <>
      {mensaje && <Mensaje tipo='send'> {mensaje} </Mensaje>}  
      <div className='absolute hidden top-0 left-0 bg-blue-300 w-full h-full flex items-center justify-center' id="modalproducto">
        
        <div className='w-2/4 h-2/4 '>
          <div className='rounded-lg bg-white pt-10 shadow-lg shadow-gray-400 hover:shadow-gray-500' >
            <div className='m-auto'>
              <img src={imagen} className='m-auto h-48' alt="Imagen del Producto" />
            </div>
            <div className='p-4 bg-gray-200'>
              <div className='my-3 text-lg flex flex-wrap justify-between pr-4'>
                <h2 className='text-lg mb-2 uppercase text-blue-600'>{nombre}</h2>
                <span className='text-bold'>{precio}</span>
              </div>
              <div>
                <p>{marca}</p>
                <p>{descripcion}</p>
                <h2 className='text-xl text-bold underline my-3'>Información extra:</h2>
                <p>{Caracteristicas}</p>
              </div>
              <div className='flex flex-wrap justify-between p-2'>
                <button
                  className='rounded-xl bg-blue-600 hover:bg-blue-800 text-white px-5 py-2'
                  onClick={handleSubmit}
                  >Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
