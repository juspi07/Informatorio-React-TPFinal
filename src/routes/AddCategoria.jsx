import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import Appbar from "../components/appbar";
import { useMutation } from "react-query";
import Alerta from "../components/alerta"
import '../css/Ingreso.css'


export default function AddProducto() {
  const [msg, setMsg] = useState("");
  const [cat, setCat] = useState({
    id: "",
    name: "",
    image: ""
})    
  const [flag, setFlag] = useState(false)
  const [flag1, setFlag1] = useState(false)
  
  const PostData = async () => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": cat.id,
        "name": cat.name,
        "image": cat.image,
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
        setMsg('Categoria Agregada')
        setFlag1(!flag1)
        setCat({ id: "", name: "", image: "" })
        redirect('/categories/create')
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
        <h2 style={{ marginLeft: '370px' }}>ALTA DE CATEGORIA</h2>
        
        <label for="uname"><b>Identificacion de categoria</b></label>
        <input onChange={e => setCat({ ...cat, id: e.target.value })}
          value={cat.id}
          type="text" placeholder="Ingresar Id" name="uname" required />

        <label for="uname"><b>Nombre</b></label>
        <input value={cat.name}
        onChange={e => setCat({ ...cat, name: e.target.value })}
          type="text" placeholder="Ingresar Nombre" name="uname" required />

        <label for="uname"><b>URL de Imagen</b></label>
        <input value={cat.image}
        onChange={e => setCat({ ...cat, image: e.target.value })}
          type="text" placeholder="Ingresar URL" name="uname" required />

        <button type="submit">Guardar</button>
      </form>
    </>
  );
}
