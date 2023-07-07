import React, {useState, useEffect} from 'react'
import Appbar from '../components/appbar'
import { Typography, Box, Stack } from '@mui/material'
import Cards from "../components/cards";


export default function Categorias() {
    let [fetchedData, updateFetchedData] = useState([]);
    let api = "https://api.escuelajs.co/api/v1/categories/"

    useEffect(() => {
        (async function () {
          let data = await fetch(api).then((res) => 
          {return res.json()})     
          updateFetchedData(data);
        })();
      }, [api]);


    
    return (
        <>
        <Appbar/>
        <Stack sx={{marginTop:15}}>
        <Box sx={{ p:3}}>
        <Box sx={{ p:2, border: '1px solid grey' }}>
            <Typography variant='h4' align='center'>
                Categorias
            </Typography>
        </Box>
        </Box>
        <Stack
        sx={{ marginTop: 10, p: 4 }}
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        direction="row"
      >
      <Cards results={fetchedData} />
      </Stack>
      </Stack>
        </>
    )
}