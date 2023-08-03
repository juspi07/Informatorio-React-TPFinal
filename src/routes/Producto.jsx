import React, { useState, useContext } from "react";
import Appbar from "../components/appbar";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import UserContext from '../components/context'

import '../css/producto.css'

export default function Producto() {
  const params = useParams();
  const navigate = useNavigate()
  const [productos, updateProductos] = useState([]);
  const [uni, setUni] = useState(1)
  const { carrito, setCarrito } = useContext(UserContext);
  const api = `https://api.escuelajs.co/api/v1`;

  const fetchProductos = useQuery(['Prod'], async () => {
    try {
      await fetch(api + `/products/${params.id}`)
        .then((res) => res.json())
        .then((obj) => {
          updateProductos(obj);
        });
    } catch (err) { navigate('*') }
  })

  const ListaImg = () => {
    if (productos.length !== 0) {
      return (
        <>
          {productos.images.map((item) => (
            <img src={item} />
          ))}
        </>
      )
    }
  }

  function AddCarrito() {
    const isFound = carrito.some(element => {
      if (element.id === productos.id) {
        element.cant = uni
        return true
      }
      return false;
    })

    if (!isFound) {
      setCarrito(current => [...current,
      {
        id: productos.id,
        title: productos.title,
        image: productos.images[0],
        price: productos.price,
        cant: uni
      }]);
    }
  }

  return (
    <>
      <Appbar />
      <div id='context'>
        <div id="cover">
          <ListaImg></ListaImg>
        </div>
        <div id='info'>
          <h3>{productos.title}</h3>
          <h4>${productos.price}</h4>
          <h4>{productos.description}</h4>
          <div style={{
            maxWidth: '500px',
            display: 'flex', flexDirection: 'row'
          }}>
            <button 
            onClick={() => AddCarrito()}
            style={{ marginRight: 30, maxWidth: '150px' }}>
              Agregar producto
            </button>
            <input id='input' onChange={(e) => setUni(parseInt(e.target.value))}
            value={uni}
            style={{ marginTop: 25, maxWidth: '50px', maxHeight: '30px' }} />
          </div>
        </div>
      </div>
    </>
  );
}
