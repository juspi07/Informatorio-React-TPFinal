 import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import '../css/cardP.css'



const Fabs = (aux) => {
  if (localStorage.getItem("Atoken")) {
    return (
      <Link to={`/products/edit/${aux.aux}`}>Editar Producto</Link>
    );
  }
};


 const CardsP = ({ results }) => { 
  const navigate = useNavigate();
  let display
    if (results) {
        display = results.map((x) => {
        let { id, images, title, price, description} = x;
        return(
          <div id={id} class="card">
            <img src={images} style={{width:'100%'}}/>
            <h3>{title}</h3>
            <p class="price">${price}</p>
            <p>{description.substr(0, 55) + "\u2026"}</p>
            <Fabs aux={id}/>
            <p> 
              <button onClick={() => 
                navigate(`/products/${id}`)
              }>
                Ir al Producto
              </button>
            </p>
          </div>
          )
    })
    }
    return <>{display}</>;
  }

  export default CardsP;