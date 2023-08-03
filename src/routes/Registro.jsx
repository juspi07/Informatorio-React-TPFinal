import React, { useState, useEffect } from "react";
import '../css/Ingreso.css'
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

export default function Registro() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Pw, setPw] = useState("");
  const [error, setError] = useState('')
  const [hab, setHab] = useState(false)

  const PostData = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/is-available", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': Email,
      }),
    });
    return await response.json();
  }

  const { mutate: doPost } = useMutation(PostData, {
    onError: (err) => console.log("The error", err),
    onSuccess: (D) => {
        if (D.isAvilable) {
          setHab(true)
        }
        else {
          setError('Email ocupado')
          setPw('')
        }
    }
  })

  const PostData2 = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "",
        "email": Email,
        "password": Pw,
        "avatar": ""
      }),
    })
    return await response.json();
  }


  const { mutate: doPost2 } = useMutation(PostData2, {
    onError: (err) => console.log("The error", err),
    onSuccess: () => {
      navigate('/')
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    doPost({ Email })
    if (hab) {
      doPost2({ Email, Pw })
    }
  }



  useEffect(() => {
    if ('Atoken' in localStorage) {
      navigate('/')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit}>
    <div class="container">
      <label for="uname"><b>Usuario</b></label>
      <input onChange={(e) => {setEmail(e.target.value)}} 
        type="text" placeholder="Ingresar Usuario" name="uname" required />
      
      <label for="psw"><b>Contraseña</b></label>
      <input onChange={(e) => {setPw(e.target.value)}}
        type="password" placeholder="Ingresar Contraseña" name="psw" required />

      <button type="submit">Ingresar</button>
      <a href='/login'> ¿Ya tenes cuenta? Ingresa</a>
      <h3> {error} </h3>
    </div>
  </form>
  );
}
