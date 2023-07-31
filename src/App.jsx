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
import EditCategoria from './routes/EditCategoria'
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
    path: "*",
    element: <Error404 />,
  }
])


export default function App() {
  const [carrito, setCarrito] = useState([])

  return (
    <UserContext.Provider value={{
      carrito,
      setCarrito
    }}>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    </QueryClientProvider>
    </UserContext.Provider>
  )
}
