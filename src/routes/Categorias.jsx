import React, { useState } from 'react'
import Appbar from '../components/appbar'
import '../css/productos.css'
import Cards from "../components/cards";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';


export default function Categorias() {
  let [fetchedData, updateFetchedData] = useState([]);
  const api = "https://api.escuelajs.co/api/v1/categories/"
  const navigate = useNavigate()

  const FetchQuery = useQuery(
    ["categorias"], async () => {
      const res = await fetch(api)
      const json = await res.json()
      updateFetchedData(json)
    }
  )

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


  if (FetchQuery.status == 'error') {
    navigate('*')
  }

  return (
    <>
      <Appbar />
      <h2 style={{ 'marginTop': 100, 'marginLeft': 900 }}> CATEGORIAS </h2>
      <div id='context'>
        <div id="grid">
          <Cards results={fetchedData} />
        </div>
      </div>
    </>
  )
}