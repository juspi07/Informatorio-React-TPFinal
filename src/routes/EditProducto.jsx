import React, { useEffect, useState } from "react";

import '../css/Ingreso.css'
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import Appbar from "../components/appbar";
import { useMutation } from "react-query";
import Alerta from "../components/alerta"

export default function EditProducto() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: { id: "" },
    images: [],
  });
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const parm = useParams();
  const [msg, setMsg] = useState("");


  const PostData = async () => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${parm.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
        images: [product.images],
      }),
    });
    return await response.json();
  }

  const { mutate: doPost } = useMutation(PostData, {
    onError: (err) => console.log("The error", err),
    onSuccess: (D) => {
      console.log(D)
      if (D.error == "Bad Request") {
        setMsg("La imagen debe ser una URL");
        setFlag(!flag);
      } else {
        setMsg("Producto modificado");
        setFlag1(!flag1);
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    doPost({ product })
  }

  const PostDelete = async () => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${parm.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  const { mutate: doDelete } = useMutation(PostDelete, {
    onError: (err) => console.log("The error", err),
    onSuccess: (D) => {
      if (D == true) {
        setMsg("Producto eliminado correctamente");
        setFlag1(!flag1)
        setTimeout(() => {
          navigate('/products')
        }, "2000")
      }
    }
  })

  
  useQuery(["Pro"], async () => {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/${parm.id}`)
    const json = await res.json()
    if (!json.id) {
      navigate("*");
    } else {
      setProduct(json);
    }
  })


  useEffect(() => {
    if (!localStorage.getItem("Atoken")) {
      navigate("/")
    }
  }, []);

  return (
    <>
      <Appbar></Appbar>
      {flag ? <Alerta aux={msg} color='red'/> : null}
      {flag1 ? <Alerta aux={msg} color='green'/> : null}
      <h2 style={{marginLeft:800}}> Modificar Producto </h2>
      <form style={{marginRight:700}} onSubmit={handleSubmit}>
          <label for="uname"><b>Titulo</b></label>
          <input
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            type="text" value={product.title}
            placeholder="Ingresar Titulo" name="uname" required />

          <label for="psw"><b>Descripcion</b></label>
          <input
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            type="text" value={product.description} 
            placeholder="Ingresar Descripcion" name="uname" required />

          <label for="psw"><b>Precio</b></label>
          <input
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            type="text" value={product.price}
            placeholder="Ingresar Precio" name="uname" required />

          <label for="psw"><b>Categoria</b></label>
          <input
            onChange={(e) =>
              setProduct({ ...product, category: { id: e.target.value } })
            }
            type="text" value={product.category.id} 
            placeholder="Ingresar numero Categoria" name="uname" required />

          <label for="psw"><b>Imagenes</b></label>
          <input
            onChange={(e) =>
              setProduct({ ...product, images: e.target.value })
            }
            type="text" value={product.images}
            placeholder="Ingresar Imagenes" name="uname" required />

          <button type="submit">Guardar</button>
        </form>
        <button onClick={() => doDelete()} style={{marginLeft:750,width:300,backgroundColor:'red'}}>Eliminar</button>
    </>
  );
}


//