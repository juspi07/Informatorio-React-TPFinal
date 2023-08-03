<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
=======
import React, {useState} from 'react'
import './index.css'
import {ThemeProvider, createTheme} from '@mui/material'
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Ingreso from "./routes/Ingreso"
import Registro from "./routes/Registro"
import Categorias from "./routes/Categorias"
import Productos from "./routes/Productos"
import Producto from "./routes/Producto"
import AddProducto from "./routes/AddProducto"
import EditProducto from "./routes/EditProducto"
import Carrito from "./routes/Carrito"
import Exito from "./routes/Exito"
import EditCategoria from './routes/EditCategoria'
import AddCategoria from './routes/AddCategoria'
import Error404 from './routes/Error404'
import { QueryClient, QueryClientProvider } from 'react-query'
import UserContext from './components/context'

localStorage.setItem("filtro", "");
const queryClient = new QueryClient()
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3c3c3c',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#979797',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Ingreso />,
  },
  {
    path: "/register",
    element: <Registro />,
  },
  {
    path: "/categories",
    element: <Categorias />,
  },
  {
    path: "/categories/create",
    element: <AddCategoria />,
  },
  {
    path: "/categories/edit/:id",
    element: <EditCategoria />,
  },
  {
    path: "/products",
    element: <Productos />,
  },
  {
    path: "/products/:id",
    element: <Producto />,
  },
  {
    path: "/products/create",
    element: <AddProducto />,
  },
  {
    path: "/products/edit/:id",
    element: <EditProducto />,
  },
  {
    path: "/cart-detail",
    element: <Carrito />,
  },
  {
    path: "/success",
    element: <Exito />,
  },
  {
    path: "*",
    element: <Error404 />,
  }
])


export default function App() {
  const [carrito, setCarrito] = useState([])
>>>>>>> Stashed changes

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
