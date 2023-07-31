import React, {useEffect, useState} from "react";
import {
  Snackbar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert
} from "@mui/material";
import { Link, redirect } from "react-router-dom";
import Appbar from "../components/appbar";
import { useMutation } from "react-query";


export default function AddProducto() {

    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: ""
    })    
    const [flag, setFlag] = useState(false)
    const [errores, setErrores] = useState([false, false, false, false])   
   
    
    const PostData = async () => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "title": product.title,
          "price": product.price,
          "description": product.description,
          "categoryId": product.categoryId,
          "images": [product.images]
        }),
      });
      return await response.json();
    }

    const { mutate: doPost } = useMutation(PostData, {
      onError: (err) => console.log("The error", err),
      onSuccess: (json) => {
        if (json.error == 'Bad Request') {
          let aux = [...errores]
          for (let index = 0; index < json.message.length; index++) {
              if (json.message[index] == "title should not be empty"){aux[0] = true}
              if (json.message[index] == "price must be a positive number"){aux[1] = true}
              if (json.message[index] == "description should not be empty"){aux[2] = true}
              if (json.message[index] == "each value in images must be a URL address"){aux[3] = true}  
          }
          setErrores(aux)
        } else {
          setFlag(!flag)
          setProduct({title: "",price: "",description: "",categoryId: "",images: ""})
          redirect('/products/create')}
      }
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      doPost({ cat })
      }
    
    useEffect(() => {
      if (!localStorage.getItem('Atoken')) {
          navigate('/')
      }
    },[])


    return (
    <>
    <Appbar></Appbar>
    
    <Container sx={{marginX:40, display:'flex',flexDirection: 'column', marginY:-40}}> 
    <Snackbar
        open={flag}
        autoHideDuration={6000}
        onClose={() => setFlag(!flag)}
        message={'Producto agregado'}/>
        <Typography sx={{marginY:2, textAlign:'center'}} variant="h4">Alta de producto</Typography>
        <Box
        sx={{
          marginTop: 4,
          marginLeft:45,
          width:'40%',
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            error = {errores[0]}
            label="Nombre"
            autoFocus
            value={product.title}
            onFocus={() => {setErrores([false, false, false, false])}}
            onChange={e => setProduct({ ...product, title: e.target.value })}
            >  </TextField>
          <TextField
            margin="normal"
            required
            error = {errores[1]}
            fullWidth
            vale={product.price}
            label="Precio"
            onFocus={() => {setErrores([false, false, false, false])}}
            onChange={e => setProduct({ ...product, price: e.target.value })}
            >  </TextField>
          <TextField
            margin="normal"
            required
            error = {errores[2]}
            fullWidth
            label="Descripcion"
            value={product.description}
            onFocus={() => {setErrores([false, false, false, false])}}
            onChange={e => setProduct({ ...product, description: e.target.value })}
            >  </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="ID de la categoria"
            value={product.categoryId}
            onFocus={() => {setErrores([false, false, false, false])}}
            onChange={e => setProduct({ ...product, categoryId: e.target.value })}
            >  </TextField>
          <TextField
            margin="normal"
            required
            error = {errores[3]}
            fullWidth
            value={product.images}
            label="URL de la imagen"
            onFocus={() => {setErrores([false, false, false, false])}}
            onChange={e => setProduct({ ...product, images: e.target.value })}
            >  </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Agregar
          </Button>
        </Box>
        </Box>
    </Container>
    </>
  );
}
