import React, { useContext, useState } from 'react';
import { Box, Button, Stack, Typography, Container} from '@mui/material'
import Appbar from '../components/appbar'
import UserContext from '../components/context'
import CarritoItem from '../components/carritoitem'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




export default function Carrito() {
    const { carrito, setCarrito } = useContext(UserContext);
    const [ total, setTotal ] = useState(0)
    const navigate = useNavigate()
    const [ bandera, setBandera ] = useState(true)
    
    useEffect(() => { 
        setTotal(0)   
        carrito.map(elem => {
        setTotal(e => e + (elem.cant * elem.price))
    })
        if (carrito.length > 0 ) {
            setBandera(false)
        } else {
            setBandera(true)
        }
    },[carrito])

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
            <Button disabled={bandera} onClick={() => {navigate('/success')}} sx={{left:950, marginTop:5}} size='large' color='secondary'>
                    REALIZAR COMPRA
            </Button>
        </>
    )
}