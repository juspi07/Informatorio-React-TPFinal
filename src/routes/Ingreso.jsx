import React, { useEffect, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import '../css/Ingreso.css'
import { useQuery, useMutation } from "react-query";

export default function Ingreso() {
  const navigate = useNavigate()
  const [Email, setEmail] = useState("")
  const [Pw, setPw] = useState("")
  const [error, setError] = useState('')


  const PostData = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': Email,
        'password': Pw,
      }),
    });
    return await response.json();
  }

  const { mutate: doPost } = useMutation(PostData, {
    onError: (err) => console.log("The error", err),
    onSuccess: (D) => {
      if (!(D.message == 'Unauthorized')) {
        localStorage.setItem("Atoken", D.access_token)
      }
      else {
        setError('Ingreso inválido')
        setEmail('')
        setPw('')
      }
    }
  })

  const QueryR = useQuery({
    queryKey: ['Role'],
    queryFn: async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem('Atoken')}` },
      })
      const json = await res.json()
      localStorage.setItem("Role", json.role)
      navigate('/')
    },
    enabled: 'Atoken' in localStorage,
  })



  const handleSubmit = (e) => {
    e.preventDefault();
    doPost({ Email, Pw })
  }

  useEffect(() => {
    if (localStorage.getItem('Atoken')) {
      navigate('/')
    }
  }, [])


  return (

    <form onSubmit={handleSubmit}>
        <h2 style={{marginLeft:'370px'}}>INGRESAR</h2>
        <label for="uname"><b>Usuario</b></label>
        <input onChange={(e) => {setEmail(e.target.value)}} 
          type="text" placeholder="Ingresar Usuario" name="uname" required />
        
        <label for="psw"><b>Contraseña</b></label>
        <input onChange={(e) => {setPw(e.target.value)}}
          type="password" placeholder="Ingresar Contraseña" name="psw" required />

        <button type="submit">Ingresar</button>
        <a href='/register'> ¿No tienes cuenta? Registrate</a>
        <h3> {error} </h3>
    </form>
  );
}
