import { useState, useEffect } from 'react'
import carritoimg from "../img/carrito.png"

const Header = ({carrito, setCarrito }) => {

  const [total, setTotal] = useState(0)
  const [id, nombre, precio] = carrito

  useEffect( () => {
    const calculoTotal = carrito.reduce( (total, producto) => total + parseInt(producto.precio), 0 );    
    setTotal(calculoTotal)
  }, [carrito])


  const cantidad = carrito.length;

  const openCarrito = () => {
    const btnOpenCarrito = document.querySelector('#listaCarrito')
    btnOpenCarrito.classList.toggle('mostrarCarrito')
  }
  const clearCarrito = () => {    
    setCarrito([])
    localStorage.removeItem('misproductos')
  }

  const eliminarProducto = (id) => {
    const carritoActualizado = carrito.filter( articulo => articulo.id !== id )
    setCarrito(carritoActualizado)    
  }

  return (
    <div className='bg-blue-600 text-white flex flex-wrap justify-between p-10 mb-10 relative'>
      <h1 className='text-2xl font-sans'>Carrito de Compras</h1>
      <button className='flex items-center cursor-pointer'
        onClick={openCarrito}
      >
        {cantidad > 0 ? 
          <span className='mr-1 text-2xl'>{cantidad}</span> : <span className='mr-1 text-2xl'></span>
        }
        <img 
          src={carritoimg}
          className="w-7 cursor-pointer"
          alt='Imagen Carrito'
        />

      </button>
      <div className='listaCarrito absolute bg-blue-700 rounded-lg' id='listaCarrito'>
        <div className='flex justify-end mb-2'>
          <button
            className='bg-blue-600 hover:bg-blue700 hover:underline py-2 px-6 rounded-full'
            onClick={clearCarrito}
          >Vaciar</button>
        </div>
        <h2 className='mb-3 underline '>Carrito:</h2>
        {carrito.length >= 1 ? (
          <ul >
            {carrito.map( producto => (
              <li key={producto.id} 
                className='flex justify-between items-center mb-2 border-b-2 border-white-500'>
                <div className='flex flex-col mb-1'>
                  {producto.nombre}<span>S/.{producto.precio}</span>
                </div>
                <button 
                  type='button' 
                  className='bg-blue-600 rounded-full w-10 h-10 font-bold' 
                  onClick={() => eliminarProducto(producto.id)}
                  title="Quitar"
                >X</button>
              </li>
            ))}
            <p className='flex justify-between mb-2'>Total : <span className='font-black text-lg'>S/.{total}</span> </p>          
          </ul>
        ) : 'No hay productos añadidos'}
      </div>
    </div>
  )
}

export default Header
