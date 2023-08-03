import React from "react";
import { useNavigate, Link } from "react-router-dom";

import '../css/appbar.css'


export default function Appbar() {
  const navigate = useNavigate();
  
  const Logout = () => {
    localStorage.clear()
    navigate('/')
  }

  const Admin = () => {
    if (localStorage.getItem('Role') == 'admin') {
      return (
        <>
        <a class='two' href='/products/create'>Alta de Producto</a>
        <a class='two' href='/categories/create'>Alta de Categoria</a>
      </>
      )
    }
  }
    
  const Login = () => {
    if (localStorage.getItem('Atoken')) {
      return (
        <>
        <Link class='two' onClick={() => Logout()} color="inherit">Salir</Link>
        <Link class='two' to='/cart-detail'>Carrito</Link>
        <Admin></Admin>
        </>
      );
    }
    else {
      return (
          <Link class='two' to='/login'>Login</Link>
      )
    }
  }

  return (
    <div class="topnav">
      <Link class="active" to="/">Ecommerce</Link>
      <Link to="/categories">Categorias</Link>
      <Link to="/products">Productos</Link>
      <Login />
    </div>
  );

}
