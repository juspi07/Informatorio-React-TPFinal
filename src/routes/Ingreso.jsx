import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useQuery, useMutation } from "react-query";

export default function Ingreso() {
  const navigate = useNavigate()
  const [Email, setEmail] = useState("")
  const [Pw, setPw] = useState("")
  const [error, setError] = useState(false)
  const [flag, setFlag] = useState(false)


  const PostData = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': Email,
        'password': Pw,
      }),
    });
    return await response.json();
  }

  const { mutate: doPost } = useMutation(PostData, {
    onError: (err) => console.log("The error", err),
    onSuccess: (D) => {
      if (!(D.message == 'Unauthorized')) {
        localStorage.setItem("Atoken", D.access_token)
      }
      else {
        setFlag(!flag)
      }
    }
  })

  const QueryR = useQuery({
    queryKey: ['Role'],
    queryFn: async () => {
      const res =  await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem('Atoken')}` },
      })
      const json =  await res.json()
      localStorage.setItem("Role", json.role)
      navigate('/')
    },
    enabled: 'Atoken' in localStorage,
  })
  
    
  
  const handleSubmit = (e) => {
    e.preventDefault();
    doPost({ Email, Pw })
  }

  useEffect(() => {
    if (localStorage.getItem('Atoken')) {
      navigate('/')
    }
  }, [])


  return (
    <Container sx={{ marginX: 90 }} component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingreso
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            error={error}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}> {Email} </TextField>
          <TextField
            margin="normal"
            required
            error={error}
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPw(e.target.value);
            }}> {Pw} </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" to={`/register`}>
                {"No tienes cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={flag}
        autoHideDuration={6000}
        onClose={() => setFlag(!flag)}
        message={'Error en autentificar'} />
    </Container>
  );
}
