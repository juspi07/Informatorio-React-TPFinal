import { Paper, Stack, Typography, Box, Button, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import UserContext from '../components/context'
import DeleteIcon from '@mui/icons-material/Delete';



const DeleteItem = () => {
    
}


const CarritoItem = () => {   
    const { carrito, setCarrito } = useContext(UserContext);
    const [bandera, setBandera] = useState(false)
    let display
    if (carrito) {
        display = carrito.map((x) => {
            let { id, title, cant, image, price } = x;
            let total = (cant * price)
            return (
                <Stack direction='row'>
                    <Paper sx={{ backgroundColor: 'white', minWidth: 650, minHeight: 100 }}>
                        <Stack sx={{ p: 1 }} spacing={5} direction='row'>
                            <Box sx={{ maxHeight: 150 }} component="img" src={image}></Box>
                            <Stack spacing={3} direction='row'>
                                <Stack alignContent='center' spacing={4} direction='column'>
                                    <Typography>Descripcion</Typography>
                                    <Typography>{title}</Typography>
                                </Stack>
                                <Stack alignContent='center' spacing={4} direction='column'>
                                    <Typography>Cantidad</Typography>
                                    <Typography>{cant}</Typography>
                                </Stack>
                                <Stack alignContent='center' spacing={4} direction='column'>
                                    <Typography>Precio Un.</Typography>
                                    <Typography>{price}</Typography>
                                </Stack>
                                <Stack alignContent='center' spacing={4} direction='column'>
                                    <Typography>Total</Typography>
                                    <Typography>{total}</Typography>
                                </Stack>
                                <IconButton onClick={() => {
                                    setCarrito(
                                        carrito.filter(a => a.id !== x.id)
                                    );
                                }} size="large" color="inherit">
                                    <DeleteIcon/>
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Paper>
                    <Stack sx={{ marginTop: 2 }} spacing={2} direction='column'>
                        <IconButton onClick={() => {
                            setCarrito(carrito.map(element => {
                                setBandera(false)
                                if (element.id === id) {
                                    return { ...element, cant: ++cant };
                                } else {
                                    return element;
                                }
                            }))
                        }} size="large" color="inherit"> + </IconButton>
                        <IconButton disabled={bandera} onClick={() => {
                            if ((cant - 1) == 0) {
                                setBandera(true)
                            }
                            setCarrito(carrito.map(element => {
                                if (element.id === id) {
                                    return { ...element, cant: --cant };
                                } else {
                                    return element;
                                }
                            }))
                        }} size="large" color="inherit"> - </IconButton>
                    </Stack>
                </Stack>
            )
        })
        return <>{display}</>;
    }
}
export default CarritoItem;


