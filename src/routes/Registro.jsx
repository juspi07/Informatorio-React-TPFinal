import React, {useState} from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";

export default function Registro() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Pw, setPw] = useState("");
    const [error, setError] = useState(false)
    const [texto, setTexto] = useState('')

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await fetch("https://api.escuelajs.co/api/v1/users/is-available", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: Email })
          })
            .then((response) => response.json())
            .then((json) => {
                if (json.isAvailable) {
                    fetch("https://api.escuelajs.co/api/v1/users/", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 	
                            "name": "",
                            "email": Email,
                            "password": Pw,
                            "avatar": ""})
                    })
                    .then(() => navigate('/'))
                }
                else{
                    setError(!error)
                    setTexto("Email ya en uso")
                    setPw('')
                }
            })
        }
        catch (err) {console.log(err)}
      };
  
      useEffect(() => {
        if (localStorage.getItem('Atoken') !== '') {
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
           Registro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error = {error}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  helperText={texto}
                  onChange={(e) => {
                    setEmail(e.target.value);
                }}> {Email} </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPw(e.target.value);
                }}> {Pw} </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link variant="body2" to={`/login`}>
                {"Ya tienes cuenta? Ingresa aqui"}
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
