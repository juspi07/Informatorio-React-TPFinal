import React, {useState, useEffect} from 'react'
import Appbar from '../components/appbar'
import { Typography, FormControl ,FormGroup ,FormLabel ,Box, FormControlLabel, Stack, Checkbox } from '@mui/material'
import CardsP from "../components/cardsP";


export default function Productos() {
    const api = `https://api.escuelajs.co/api/v1`
    const [nameprod, updateNameprod] = useState([]);
    const [productos, updateProductos] = useState([]);
    const [categorias, updateCategorias] = useState([]);
    const [checked, setChecked] = useState(window.filtro.name);


    function onChange(i) {
      setChecked((prev) => (i === prev ? null : i));
      if (checked === null){
      updateNameprod(productos.filter(pre => {
        return pre.category.name === i 
      }))}
      else {
        updateNameprod(productos)
      }
    }
        
    
    const Filters = () => {
      let display = categorias.map((x) => {
          return(
          <FormControlLabel
          control={
            <Checkbox name={x.name} 
            onChange={() => onChange(x.name)}
            checked={x.name === checked}
            />
          }
          label={x.name}
        />)
        })
        return(
        <FormControl sx={{ m: 3, marginX:'2', mr:7 }} component="fieldset" variant="standard">
        <FormLabel sx={{color:'#ffffff'}} >Categorias</FormLabel>
        <FormGroup>
          <>{display}</>
        </FormGroup>
      </FormControl>
      )
    }
       
    

  useEffect(() => {
      const fetchCategorias = async () => {
        try {
          await fetch(api + `/categories/`).then((res) => 
            res.json()
          ).then((obj) => {updateCategorias(obj)})
        } catch (err) {
        }
      };
    
      const fetchProductos = async () => {
        try {
          await fetch(api + `/products/`).then((res) => 
            res.json()
          ).then((obj) => {updateProductos(obj)
           
            if (checked){
              updateNameprod(obj.filter(pre => {
                return pre.category.name === checked
              }))}
              else {
                updateNameprod(obj)
              }
          })
        } catch (err) {}
      };
     
      const fetchBoth = async () => {
        await fetchCategorias();
        await fetchProductos();
      };
      fetchBoth();
  }, []);


    return (
        <>
        <Appbar/>

        <Stack direction='column' sx={{marginTop:15}}>
        <Box sx={{ p:3}}>
        <Box sx={{ p:2, border: '1px solid grey' }}>
            <Typography variant='h4' align='center'>
                Productos
            </Typography>
        </Box>
        </Box>
        <Stack spacing={2} direction={'row'}> 
        <Filters></Filters>
        <Stack
        sx={{ p: 10 }}
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        direction="row"
      >
      <CardsP results={nameprod} />
      </Stack>
      </Stack>
      </Stack>
        </>
    )
}