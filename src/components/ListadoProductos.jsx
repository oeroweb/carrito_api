import { useState, useEffect } from 'react'
import Producto from './Producto'
import Header from './Header'
import Mensaje from './Mensaje'
import Modal from './Modal'

const ListadoProductos = () => {

  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [modal, setModal] = useState('')
  
  useEffect( () => {
    const obtenerProductosApi = async () =>{
      try {
        const url = 'http://localhost:4000/productos'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()        
        setProductos(resultado)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerProductosApi()
  }, [])

  useEffect( () => {
    const productosLS = JSON.parse(localStorage.getItem("misproductos")) ?? [];
    setCarrito(productosLS)
  }, [])

  useEffect( () => {
    localStorage.setItem("misproductos", JSON.stringify(carrito));
  }, [carrito])

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

  const openModal = async (id) =>{    
    const modalproducto = document.getElementById('modalproducto')
    try {
      const url = `http://localhost:4000/productos/${id}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()     
      setModal(resultado)
      modalproducto.classList.add('mostrar')
      modalproducto.classList.remove('hidden')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <Header 
        carrito={carrito}
        setCarrito={setCarrito}        
      />

      {mensaje && <Mensaje tipo='send'> {mensaje} </Mensaje>}      
      
      <div className='w-11/12 m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'>
        {productos.map( producto => (
          <Producto 
            key= { producto.id }
            producto={producto}
            carrito={carrito}
            agregarCarrito={agregarCarrito}
            openModal={openModal}
          />

        ))}        

      </div>

      <Modal 
        modal={modal}
        carrito={carrito}
        setCarrito={setCarrito}   
        agregarCarrito={agregarCarrito}
      />   

    </>
  )
}

export default ListadoProductos
