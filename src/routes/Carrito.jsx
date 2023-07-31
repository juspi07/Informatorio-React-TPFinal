import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Container} from '@mui/material'
import Appbar from '../components/appbar'
import UserContext from '../components/context'
import CarritoItem from '../components/carritoitem'
import { useEffect } from 'react';




export default function Carrito() {
    const { carrito, setCarrito } = useContext(UserContext);
    const [ total, setTotal ] = useState(0)

    useEffect(() => { 
        setTotal(0)   
        carrito.map(elem => {
        setTotal(e => e + (elem.cant * elem.price))
    })},[carrito])

    return (
        <>
            <Appbar />
            <Stack direction='column' >
                <Box sx={{ p: 3, width: 1850 }}>
                    <Box sx={{ p: 2, border: '1px solid grey' }}>
                        <Typography variant='h4' align='center'>
                            Carrito de compras
                        </Typography>
                    </Box>
                </Box>
                <Container>
                    <Stack direction='column' spacing={3}>
                        <Typography></Typography>
                        <CarritoItem></CarritoItem>
                    </Stack>
                </Container>
                <Box>
                    <Typography sx={{ marginTop: 2 }} variant='h6' align='center'>
                        Total : $ {total}
                    </Typography>
                </Box>
            </Stack>
        </>
    )
}