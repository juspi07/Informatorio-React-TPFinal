import React, { useState, useEffect, useContext } from "react";
import Appbar from "../components/appbar";
import { useParams } from "react-router";
import { Typography, Stack, Box, TextField, ImageListItem, ImageList, Button } from "@mui/material";
import { Image } from "mui-image";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import UserContext from '../components/context'

export default function Producto() {
  const params = useParams();
  const navigate = useNavigate()
  const [productos, updateProductos] = useState([]);
  const [uni, setUni] = useState(1)
  const {carrito, setCarrito} = useContext(UserContext);
  const api = `https://api.escuelajs.co/api/v1`;
  
  const fetchProductos = useQuery(['Prod'], async () => {
      try {
        await fetch(api + `/products/${params.id}`)
          .then((res) => res.json())
          .then((obj) => {
            updateProductos(obj);
          });
      } catch (err) {navigate('*')}
    })
  
  const ListaImg = () => {
    if (productos.length !== 0) {
        return(
        <ImageList sx={{marginX:5, marginY:10}} cols={2} rowHeight={300}>
        {productos.images.map((item) => (
          <ImageListItem key={item}>
            <Image
              src={item}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    )}
  }
 
  function AddCarrito() {
    const isFound = carrito.some(element => {
      if (element.id === productos.id) {
        element.cant = uni
        return true
      }
      return false;
    })
  
    if (!isFound) {
      setCarrito(current => [...current, 
        { id: productos.id,
          title: productos.title,
          image: productos.images[0],
          price: productos.price,
          cant: uni
        }]);
    } 
  }
 
  return (
    <>
      <Appbar />
      <Stack direction={"row"} spacing={3} justifyContent="center">
        <ListaImg></ListaImg>
        <Box sx={{paddingY: 15, paddingX: 20 }}>
        <Typography
          variant="h3"
        >
          {productos.title}
        </Typography>
        <Typography
          variant="h5"
          sx={{paddingX: 3 }}
        >
          ${productos.price}
        </Typography>
        <Typography
          variant="h5"
        >
          {productos.description}
        </Typography>
        <Stack direction='row' spacing={2} sx={{p:3}}>
        <Button sx={{p:3}}
          onClick={() => AddCarrito()}
          >
          Agregar producto
        </Button>
        <TextField sx={{width:50}} justifyContent='center' value={uni}
          onChange={(e) => setUni(parseInt(e.target.value))}
        >
        </TextField>
        </Stack>
        </Box>
      </Stack>
    </>
  );
}
