import React, {useEffect, useState} from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Ingreso() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    try {
        event.preventDefault();
        await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'email': Email,
          'password': Pw,
        }),
      })
        .then((response) => response.json())
        .then((json) => { 
            console.log(json)
            window.Atoken = json.access_token
            navigate('/')
        });
    } catch (err) { console.log(err)}
  };

  useEffect(() => {
    if (window.Atoken === '') {
        navigate('/')
    }
  },[])

  
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
            error = {error}
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
            error = {error}
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
    </Container>
  );
}
