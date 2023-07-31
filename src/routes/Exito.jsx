import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Container } from '@mui/material'
import Appbar from '../components/appbar'
import { useNavigate } from 'react-router';
import UserContext from '../components/context'



export default function Exito() {
    let [counter, setCounter] = useState(5);
    const navigate = useNavigate()
    const {carrito, setCarrito} = useContext(UserContext);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000); 
        if (counter == 0) {
            setCarrito([])
            navigate('/')}
    }, [counter])
    
    
    return (
        <>
            <Appbar />
            <Box sx={{marginLeft:70}}>
                <Stack spacing={3}>
                <Typography variant='h4' align='center'>
                    SU COMPRA FUE REALIZADA CON EXITO
                </Typography>
                <Typography variant='h8' align='center'>
                    Se enviará a la pagina principal en... {counter}
                </Typography>
                </Stack>
            </Box>
        </>
    )



}