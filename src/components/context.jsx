import React from "react";

const UserContext = React.createContext({
  carrito: {},
  setCarrito : () => {}
});

export default UserContext;