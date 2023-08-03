import React, { useState } from 'react'
import Appbar from '../components/appbar'
import '../css/productos.css'
import CardsP from "../components/cardsP";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';


export default function Productos() {
  const api = `https://api.escuelajs.co/api/v1`
  const [nameprod, updateNameprod] = useState([]);
  const [productos, updateProductos] = useState([]);
  const [categorias, updateCategorias] = useState([]);
  const [checked, setChecked] = useState(localStorage.getItem('filtro'));
  const [checkedP, setCheckedP] = useState(undefined);
  const filtroP = ['$0 - $500', '$500 - $5000', '$5000 - $10000', '$ + 10000']
  const navigate = useNavigate()
  

  function onChange(i) {
    setChecked((prev) => (i === prev ? null : i));
    if (checked === null | checked === undefined) {
      updateNameprod(productos.filter(pre => {
        return pre.category.name === i
      }))
    }
    else {
      updateNameprod(productos)
    }
  }
  
  const FiltersCat = () => {
    let display = categorias.map((x) => {
      return (
        <label class="container"> {x.name}
          <input type="checkbox" 
            checked={x.name === checked}
            onChange={() => onChange(x.name)}>
          </input>
          <span class="checkmark"></span>
        </label>
      )
    })
    return (
      <>
        <label>Categorias</label>
          <>{display}</>
      </>
    )
  }

  function onChangeP(i) {
    setCheckedP((prev) => (i === prev ? null : i));
    if (checkedP === null | checkedP === undefined) {
      if (i === '$0 - $500'){
        updateNameprod(productos.filter(pre => {
          return pre.price > 0 && pre.price <= 500 }))
      }
      if (i === '$500 - $5000'){
        updateNameprod(productos.filter(pre => {
          return pre.price > 500 && pre.price <= 5000 }))
      }
      if (i === '$5000 - $10000'){
        updateNameprod(productos.filter(pre => {
          return pre.price > 5000 && pre.price <= 10000 }))
      }
      if (i === '$ + 10000'){
        updateNameprod(productos.filter(pre => {
          return pre.price > 10000 }))
      }
    }
    else {
      updateNameprod(productos)
    }
  }

  const FiltersPrice = () => {
    let display = filtroP.map((x) => {
      return (
        <label class="container"> {x}
          <input type="checkbox" 
            onChange={() => onChangeP(x)}
            checked={x === checkedP}>
          </input>
          <span class="checkmark"></span>
        </label>
      )
    })
    return (
      <>
        <label>Rango de precios</label>
          <>{display}</>
      </>
    )
  }

  const QueryC = useQuery(["Cat"], async () => {
    const res = await fetch(api + `/categories/`)
    const json = await res.json()
    updateCategorias(json)
  })

  const QueryProduct = useQuery(["Pro"], async () => {
      const res = await fetch(api + `/products/`)
      const json = await res.json()
      updateProductos(json)

      if (checked) {
        updateNameprod(json.filter(pre => {
          return pre.category.name === checked
        }))
      }
      else {
        updateNameprod(json)
      }
    })
 




    

  return (
    <>
      <Appbar />
      <h2 style={{'marginTop':100, 'marginLeft':900}}> PRODUCTOS </h2>
      <div id='context'>
      <div>
      <h3>Filtros</h3>
            <FiltersCat></FiltersCat>
            <span></span>
            <FiltersPrice></FiltersPrice>
            </div>
      <div id="grid">
      
      <CardsP results={nameprod} />
      
      </div>
      </div>
     
    </>
  )
}