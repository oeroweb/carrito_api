import { useState } from 'react'

const Producto = ({producto, agregarCarrito, openModal}) => {
  
  const { id, nombre, descripcion, imagen, precio } = producto

  const handleSubmit = (e) => {
    e.preventDefault()

    const produtoSeleccionado = {
      id,
      nombre,
      precio
    }

    agregarCarrito(produtoSeleccionado)
  }

  return (
    <>
      <div className='rounded-lg bg-white pt-10 shadow-lg shadow-gray-400 hover:shadow-gray-500' >
        <div className='m-auto'>
          <img src={imagen} className='m-auto h-40' alt="Imagen del Producto" />
        </div>
        <div className='p-2 bg-gray-200 h-64'>
          <h2 className='text-lg mb-2 uppercase text-blue-600'>{nombre}</h2>
          <p>{descripcion}</p>
          <div className='my-3 text-lg flex justify-end pr-4'>
            <span>{precio}</span>
          </div>
          <div className='flex flex-wrap justify-between p-2'>
            <button
              className='hover:underline'
              onClick={() => openModal(id)}
            >+ Vista previa</button>

            <button
              className='rounded-xl bg-blue-600 hover:bg-blue-800 text-white px-5 py-2'
              onClick={handleSubmit}

            >Agregar</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Producto
