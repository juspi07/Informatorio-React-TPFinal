import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import Appbar from "../components/appbar";
import { useMutation } from "react-query";
import Alerta from "../components/alerta"
import '../css/Ingreso.css'


export default function AddProducto() {
  const [msg, setMsg] = useState("");
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: ""
  })
  const [flag, setFlag] = useState(false)
  const [flag1, setFlag1] = useState(false)
  
  const PostData = async () => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "title": product.title,
        "price": product.price,
        "description": product.description,
        "categoryId": product.categoryId,
        "images": [product.images]
      }),
    });
    return await response.json();
  }

  const { mutate: doPost } = useMutation(PostData, {
    onError: (err) => console.log("The error", err),
    onSuccess: (json) => {
      if (json.error == 'Bad Request') {
        setMsg(json.message[0])
        setFlag(!flag)
      } else {
        setMsg('Producto Agregado')
        setFlag1(!flag1)
        setProduct({ title: "", price: "", description: "", categoryId: "", images: "" })
        redirect('/products/create')
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    doPost({ product })
  }

  useEffect(() => {
    if (!localStorage.getItem('Atoken')) {
      navigate('/')
    }
  }, [])


  return (
    <>
      <Appbar></Appbar>
      {flag ? <Alerta aux={msg} color='red'/> : null}
      {flag1 ? <Alerta aux={msg} color='green'/> : null}
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginLeft: '370px' }}>ALTA DE PRODUCTO</h2>
        <label for="uname"><b>Titulo</b></label>
        <input onChange={e => setProduct({ ...product, title: e.target.value })}
          value={product.title}
          type="text" placeholder="Ingresar Titulo" name="uname" required />

        <label for="uname"><b>Precio</b></label>
        <input value={product.price}
        onChange={e => setProduct({ ...product, price: e.target.value })}
          type="text" placeholder="Ingresar Precio" name="uname" required />

        <label for="uname"><b>Descripcion</b></label>
        <input value={product.description}
        onChange={e => setProduct({ ...product, description: e.target.value })}
          type="text" placeholder="Ingresar Descripcion" name="uname" required />

        <label for="uname"><b>Id de categoria</b></label>
        <input value={product.categoryId}
        onChange={e => setProduct({ ...product, categoryId: e.target.value })}
          type="text" placeholder="Ingresar Id de Cat." name="uname" required />
        
        <label for="uname"><b>URL de Imagenes</b></label>
        <input value={product.images}
        onChange={e => setProduct({ ...product, images: e.target.value })}
          type="text" placeholder="Ingresar URL de imagenes" name="uname" required />

        <button type="submit">Guardar</button>
      </form>
    </>
  );
}
