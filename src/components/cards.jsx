import '../css/cardP.css'
import { Link, useNavigate } from "react-router-dom";
import React from 'react';


const Fabs = (aux) => {
  if (localStorage.getItem("Atoken")) {
    return (
      <Link to={`/categories/edit/${aux.aux}`}>Editar Categoria</Link>
    );
  }
};

const Cards = ({ results }) => {
  let display;
  const navigate = useNavigate();
  if (results) {
    display = results.map((x) => {
      let { id, image, name } = x;
      return (
        <div id={id} class="card">
        <img src={image} style={{width:'100%'}}/>
        <h3>{name}</h3>
        <Fabs aux={id}/>
        <p> 
          <button onClick={() => {
            localStorage.setItem('filtro', name)
            navigate(`/products`)
          }}>
            Ir a la categoria
          </button>
        </p>
      </div>
      );
    });
  }
  return <>{display}</>;
};

export default Cards;
