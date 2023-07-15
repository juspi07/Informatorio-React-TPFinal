import React, {useState, useEffect} from 'react'
import Appbar from '../components/appbar'
import { Typography, FormControl ,FormGroup ,FormLabel ,Box, FormControlLabel, Stack, Checkbox } from '@mui/material'
import CardsP from "../components/cardsP";


export default function Productos() {
    const api = `https://api.escuelajs.co/api/v1`
    const [nameprod, updateNameprod] = useState([]);
    const [productos, updateProductos] = useState([]);
    const [categorias, updateCategorias] = useState([]);
    const [checked, setChecked] = useState(localStorage.getItem('filtro'));
    const [checkedP, setCheckedP] = useState(undefined);
    const filtroP = ['$0 - $500', '$500 - $5000', '$5000 - $10000', '$ + 10000']

    function onChange(i) {
      setChecked((prev) => (i === prev ? null : i));
      if (checked === null | checked === undefined){
      updateNameprod(productos.filter(pre => {
        return pre.category.name === i 
      }))}
      else {
        updateNameprod(productos)
      }
    }
        
    const FiltersCat = () => {
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
    
    function onChangeP(i) {
      setCheckedP((prev) => (i === prev ? null : i));
      if (checkedP === null | checkedP === undefined){
      updateNameprod(productos.filter(pre => {
        return pre.price > 0 && pre.price <= 500
      }))}
      else {
        updateNameprod(productos)
      }
    }

    const FiltersPrice = () => {
      let display = filtroP.map((x) => {
          return(
          <FormControlLabel
          control={
            <Checkbox name={x} 
            onChange={() => onChangeP(x)}
            checked={x === checkedP}
            />
          }
          label={x}
        />)
        })
        return(
        <FormControl sx={{ m: 3, marginX:'2', mr:7 }} component="fieldset" variant="standard">
        <FormLabel sx={{color:'#ffffff'}} >Rango de precios</FormLabel>
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
        <Box spacing={2}>
        <Typography>Filtros</Typography>
        <FiltersCat></FiltersCat>
        <FiltersPrice></FiltersPrice>
        </Box>
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