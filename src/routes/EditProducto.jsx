import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Stack,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Dialog, DialogActions,DialogContent ,DialogContentText, DialogTitle
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Appbar from "../components/appbar";
import { useMutation } from "react-query";

export default function EditProducto() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: { id: "" },
    images: [],
  });
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const parm = useParams();
  const [msg, setMsg] = useState("");
  const [errores, setErrores] = useState(false);
  const [open, setOpen] = useState(false);

  
  const PostData = async () => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${parm.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
        images: [product.images],
      }),
    });
    return await response.json();
  }

  const { mutate: doPost } = useMutation(PostData, {
    onError: (err) => console.log("The error", err),
    onSuccess: (D) => {
      if (D.error == "Bad Request") {
        setMsg("La imagen debe ser una URL");
        setFlag(!flag);
      } else {
        setMsg("Producto modificado");
        setFlag1(!flag1);
      }
      }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    doPost({ product })
    }

    const PostDelete = async () => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${parm.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    }

    const { mutate: doDelete } = useMutation(PostDelete, {
      onError: (err) => console.log("The error", err),
      onSuccess: (D) => {
        if (D == true) {
          setMsg("Producto eliminado correctamente");
          setOpen(!open)
          setFlag(!flag)
          setTimeout(() => {
              navigate('/products')
          }, "2000")
        }
        }
    })

    const handleDelete = (e) => {
      e.preventDefault();
      doDelete()
      }


    useQuery(["Pro"], async () => {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${parm.id}`)
      const json = await res.json()
      if (!json.id) {
        navigate("*");
      } else {
        setProduct(json);
      }
    })


  useEffect(() => {
    if (!localStorage.getItem("Atoken")) {
      navigate("/")
    } 
  },[]);

  return (
    <>
      <Appbar></Appbar>

      <Container
        sx={{
          marginX: 40,
          display: "flex",
          flexDirection: "column",
          marginY: -40,
        }}
      >
        <Snackbar
          open={flag}
          autoHideDuration={6000}
          onClose={() => setFlag(!flag)}
          message={msg}
        />
        <Snackbar
          open={flag1}
          autoHideDuration={6000}
          onClose={() => setFlag(!flag1)}
          message={msg}
        />
        <Typography sx={{ marginY: 2, textAlign: "center" }} variant="h4">
          Modificacion de Categoria
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            marginLeft: 45,
            width: "40%",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              error={errores[0]}
              label="Nombre"
              autoFocus
              value={product.title}
              onFocus={() => {
                setErrores([false, false, false, false]);
              }}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            >
              {" "}
            </TextField>
            <TextField
              margin="normal"
              required
              error={errores[1]}
              fullWidth
              value={product.price}
              label="Precio"
              onFocus={() => {
                setErrores([false, false, false, false]);
              }}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            >
              {" "}
            </TextField>
            <TextField
              margin="normal"
              required
              error={errores[2]}
              fullWidth
              label="Descripcion"
              value={product.description}
              onFocus={() => {
                setErrores([false, false, false, false]);
              }}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            >
              {" "}
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              label="ID de la categoria"
              value={product.category.id}
              onFocus={() => {
                setErrores([false, false, false, false]);
              }}
              onChange={(e) =>
                setProduct({ ...product, category: { id: e.target.value } })
              }
            >
              {" "}
            </TextField>
            <TextField
              margin="normal"
              required
              error={errores[3]}
              fullWidth
              value={product.images}
              label="URL de la imagen"
              onFocus={() => {
                setErrores([false, false, false, false]);
              }}
              onChange={(e) =>
                setProduct({ ...product, images: e.target.value })
              }
            >
              {" "}
            </TextField>
            <Stack sx={{ mt: 2 }} spacing={1} direction="row">
              <Button type="submit" fullWidth variant="contained">
                Editar
              </Button>
              <Button fullWidth variant="contained" onClick={() => setOpen(true)}>
                Eliminar
              </Button>
            </Stack>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"¿Eliminar producto?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Está seguro que desea eliminar este producto. Esta acción es irreversible
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDelete}>Aceptar</Button>
                <Button onClick={() => setOpen(false)} autoFocus>
                  Cancelar
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Container>
    </>
  );
}
