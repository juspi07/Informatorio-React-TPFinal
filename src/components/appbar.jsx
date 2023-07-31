import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserContext from './context'
import { Link, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

//carrito.length

export default function Appbar() {
  const navigate = useNavigate();
  const { carrito, setCarrito } = useContext(UserContext); 
  
  const Logout = () => {
    localStorage.clear()
    navigate('/')
  }

  const Admin = () => {
    if (localStorage.getItem('Role') == 'admin') {
      return (
        <Button component={Link} to='/products/create' color="inherit">Alta de Producto</Button>
      )
    }
  }
    
  const Login = () => {
    if (localStorage.getItem('Atoken')) {
      return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton component={Link} to='/cart-detail' size="large" color="inherit">
            <Badge badgeContent={carrito.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Admin></Admin>
          <Button onClick={() => Logout()} color="inherit">Salir</Button>
        </Box>
      );
    }
    else {
      return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button component={Link} to='/login' color="inherit">Login</Button>
        </Box>
      )
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Ecommerce
          </Typography>
          <Stack sx={{ ml: 3 }} direction={"row"} spacing={3}>
            <Button component={Link} to={`/categories`} color="inherit">
              Categorias
            </Button>
            <Button component={Link} to={`/products`} color="inherit">
              Productos
            </Button>
            <Button onClick={() => { console.log(carrito) }} color="inherit">
              About
            </Button>
            <Button onClick={() => { setCarrito([]) }} color="inherit">
              Abouts
            </Button>
          </Stack>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Login />
        </Toolbar>
      </AppBar>
    </Box>
  );

}
