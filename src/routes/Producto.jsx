import React, { useState, useEffect } from "react";
import Appbar from "../components/appbar";
import { useParams } from "react-router";
import { Typography, Stack, Box, Paper, ImageListItem, ImageList } from "@mui/material";
import { Image } from "mui-image";

export default function Producto() {
  const params = useParams();
  const [productos, updateProductos] = useState([]);
  const api = `https://api.escuelajs.co/api/v1`;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        await fetch(api + `/products/${params.id}`)
          .then((res) => res.json())
          .then((obj) => {
            updateProductos(obj);
          });
      } catch (err) {}
    };
    fetchProductos();
  }, []);

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
        </Box>
      </Stack>
    </>
  );
}
