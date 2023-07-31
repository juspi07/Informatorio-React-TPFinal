import React, {useState} from 'react'
import Appbar from '../components/appbar'
import { Typography, Box, Stack, Skeleton } from '@mui/material'
import Cards from "../components/cards";
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router';


export default function Categorias() {
    let [fetchedData, updateFetchedData] = useState([]);
    const api = "https://api.escuelajs.co/api/v1/categories/"
    const navigate = useNavigate()
    
    const FetchQuery = useQuery(
      ["categorias"], async () => {
        const res = await fetch(api)
        const json = await res.json()
        updateFetchedData(json)
      }
    )
    
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


    const Loading = () => {
      let items = [];
      for (let index = 0; index < 20; index++) {
        items.push(<Skeleton variant="rectangular" width={310} height={218} />)
      }
      return (items)
    }

    if (FetchQuery.status == 'error') {
      navigate('*')
    }


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
      {FetchQuery.isLoading ?  
       <Loading/> :
       <Cards results={fetchedData} />
      }
      </Stack>
      </Stack>
        </>
    )
}