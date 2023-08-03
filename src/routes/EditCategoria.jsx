import React, {useEffect, useState} from "react";
import '../css/Ingreso.css'
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Appbar from "../components/appbar";
import Alerta from "../components/alerta"

export default function EditCategoria() {
    const navigate = useNavigate();
    const [cat, setCat] = useState({
        id: "",
        name: "",
        image: ""
    })    
    const [flag, setFlag] = useState(false)
    const [flag1, setFlag1] = useState(false)
    const parm = useParams()
    const [msg, setMsg] = useState('')
   
    
    const PostData = async () => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${parm.id}`, {
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
      onSuccess: (D) => {
        if (D.error == 'Bad Request') {
          setMsg('La imagen debe ser una URL')
          setFlag(!flag)
        } else {
          setMsg('Categoria modificada')
          setFlag1(!flag1)
        }
        }
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      doPost({ cat })
      }
    
      const PostDelete = async () => {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${parm.id}`, {
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
            setMsg("Categoria eliminado correctamente");
            setFlag(!flag1)
            setTimeout(() => {
                navigate('/categories')
            }, "2000")
          }
          }
      })

      const handleDelete = (e) => {
        e.preventDefault();
        doDelete()
        }
  

    const FetchQuery = useQuery(
      ["categorias"], async () => {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${parm.id}`)
        const json = await res.json()
        if (!json.id) {
          navigate("*");
        } else {
        setCat(json)
          }
        }
    )
    
    useEffect(() => {
      if (!localStorage.getItem('Atoken')) {
          navigate('/')
      }
    },[])


    return (
    <>
    <Appbar></Appbar>
    {flag ? <Alerta aux={msg} color='red'/> : null}
      {flag1 ? <Alerta aux={msg} color='green'/> : null}
      <h2 style={{marginLeft:800}}> Modificacion de Categoria </h2>
      <form style={{marginRight:700}} onSubmit={handleSubmit}>
          <label for="uname"><b>Identificacion</b></label>
          <input
            onChange={e => setCat({ ...cat, id: e.target.value })}
            type="text" value={cat.id}
            placeholder="Ingresar Titulo" name="uname" required />

          <label for="psw"><b>Nombre</b></label>
          <input
            onChange={e => setCat({ ...cat, name: e.target.value })}
            type="text" value={cat.name}
            placeholder="Ingresar Descripcion" name="uname" required />

          <label for="psw"><b>URL Imagenes</b></label>
          <input
            onChange={e => setCat({ ...cat, image: e.target.value })}
            type="text" value={cat.image}
            placeholder="Ingresar Precio" name="uname" required />
          
          <button type="submit">Guardar</button>
        </form>
        <button onClick={() => doDelete()} style={{marginLeft:750,width:300,backgroundColor:'red'}}>Eliminar</button>
    </>
  );
}