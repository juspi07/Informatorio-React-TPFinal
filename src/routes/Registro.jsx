import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  Avatar,
  Button,
  TextField,
  Snackbar
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

export default function Registro() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Pw, setPw] = useState("");
  const [error, setError] = useState(false)
  const [hab, setHab] = useState(false)
  const [flag, setFlag] = useState(false)

  const PostData = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/is-available", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': Email,
      }),
    });
    return await response.json();
  }

  const { mutate: doPost } = useMutation(PostData, {
    onError: (err) => console.log("The error", err),
    onSuccess: (D) => {
        if (D.isAvilable) {
          setHab(true)
        }
        else {
          setError(true)
          setPw('')
        }
    }
  })

  const PostData2 = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "",
        "email": Email,
        "password": Pw,
        "avatar": ""
      }),
    })
    return await response.json();
  }


  const { mutate: doPost2 } = useMutation(PostData2, {
    onError: (err) => console.log("The error", err),
    onSuccess: () => {
      navigate('/')
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    doPost({ Email })
    if (hab) {
      doPost2({ Email, Pw })
    }
  }



  useEffect(() => {
    if ('Atoken' in localStorage) {
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
                error={error}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
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
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={() => setFlag(false)}
        message={'Email ya en uso'} />
    </Container>
  );
}
