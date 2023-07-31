import React, {useEffect, useState} from "react";
import {
  Snackbar,
  Button,
  TextField,
  Box,
  Stack,
  Typography,
  Container,
  Dialog, DialogActions,DialogContent ,DialogContentText, DialogTitle
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Appbar from "../components/appbar";


export default function EditCategoria() {
    const navigate = useNavigate();
    const [cat, setCat] = useState({
        id: "",
        name: "",
        image: ""
    })    
    const [flag, setFlag] = useState(false)
    const [flag1, setFlag1] = useState(false)
    const parm = useParams()
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false);
   
    
    const PostData = async () => {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${parm.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "id": cat.id,
          "name": cat.name,
          "image": cat.image,
        }),
      });
      return await response.json();
    }

    const { mutate: doPost } = useMutation(PostData, {
      onError: (err) => console.log("The error", err),
      onSuccess: (D) => {
        if (D.error == 'Bad Request') {
          setMsg('La imagen debe ser una URL')
          setFlag(!flag)
        } else {
          setMsg('Categoria modificada')
          setFlag1(!flag1)
        }
        }
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      doPost({ cat })
      }
    
      const PostDelete = async () => {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${parm.id}`, {
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
            setMsg("Categoria eliminado correctamente");
            setOpen(!open)
            setFlag(!flag1)
            setTimeout(() => {
                navigate('/categories')
            }, "2000")
          }
          }
      })

      const handleDelete = (e) => {
        e.preventDefault();
        doDelete()
        }
  

    const FetchQuery = useQuery(
      ["categorias"], async () => {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${parm.id}`)
        const json = await res.json()
        if (!json.id) {
          navigate("*");
        } else {
        setCat(json)
          }
        }
    )
    
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
        message={msg}/>
    <Snackbar
        open={flag1}
        autoHideDuration={6000}
        onClose={() => setFlag(!flag1)}
        message={msg}/>
        <Typography sx={{marginY:2, textAlign:'center'}} variant="h4">Modificacion de Categoria</Typography>
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
            label="ID"
            autoFocus
            value={cat.id}
            onChange={e => setCat({ ...cat, id: e.target.value })}
            >  </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            value={cat.name}
            label="Nombre"
            onChange={e => setCat({ ...cat, name: e.target.value })}
            >  </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Imagen"
            value={cat.image}
            error={flag}
            onChange={e => setCat({ ...cat, image: e.target.value })}
            >  </TextField>
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
                {"¿Eliminar categoria?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Está seguro que desea eliminar esta categoria. Esta acción es irreversible
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