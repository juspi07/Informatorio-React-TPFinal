import React from 'react'
import Appbar from '../components/appbar'
import {Typography, Box} from '@mui/material'


export default function Home() {
    
    return (
        <>
           <Appbar/>
           <Box sx={{marginLeft:90}}>
                <Typography variant='h4' align='center'>
                    PAGINA PRINCIPAL
                </Typography>
            </Box>
        </>
    )
}