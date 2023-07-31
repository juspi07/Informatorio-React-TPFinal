import React, { useState, useEffect } from 'react'
import Appbar from '../components/appbar'
import { Typography, FormControl, FormGroup, Skeleton, FormLabel, Box, FormControlLabel, Stack, Checkbox } from '@mui/material'
import CardsP from "../components/cardsP";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';


export default function Productos() {
  const api = `https://api.escuelajs.co/api/v1`
  const [nameprod, updateNameprod] = useState([]);
  const [productos, updateProductos] = useState([]);
  const [categorias, updateCategorias] = useState([]);
  const [checked, setChecked] = useState(localStorage.getItem('filtro'));
  const [checkedP, setCheckedP] = useState(undefined);
  const filtroP = ['$0 - $500', '$500 - $5000', '$5000 - $10000', '$ + 10000']
  const navigate = useNavigate()

  function onChange(i) {
    setChecked((prev) => (i === prev ? null : i));
    if (checked === null | checked === undefined) {
      updateNameprod(productos.filter(pre => {
        return pre.category.name === i
      }))
    }
    else {
      updateNameprod(productos)
    }
  }

  const FiltersCat = () => {
    let display = categorias.map((x) => {
      return (
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
    return (
      <FormControl sx={{ m: 3, marginX: '2', mr: 7 }} component="fieldset" variant="standard">
        <FormLabel sx={{ color: '#ffffff' }} >Categorias</FormLabel>
        <FormGroup>
          <>{display}</>
        </FormGroup>
      </FormControl>
    )
  }

  function onChangeP(i) {
    setCheckedP((prev) => (i === prev ? null : i));
    if (checkedP === null | checkedP === undefined) {
      updateNameprod(productos.filter(pre => {
        return pre.price > 0 && pre.price <= 500
      }))
    }
    else {
      updateNameprod(productos)
    }
  }

  const FiltersPrice = () => {
    let display = filtroP.map((x) => {
      return (
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
    return (
      <FormControl sx={{ m: 3, marginX: '2', mr: 7 }} component="fieldset" variant="standard">
        <FormLabel sx={{ color: '#ffffff' }} >Rango de precios</FormLabel>
        <FormGroup>
          <>{display}</>
        </FormGroup>
      </FormControl>
    )
  }

  const QueryC = useQuery(["Cat"], async () => {
    const res = await fetch(api + `/categories/`)
    const json = await res.json()
    updateCategorias(json)
  })

  const QueryProduct = useQuery(["Pro"], async () => {
      const res = await fetch(api + `/products/`)
      const json = await res.json()
      updateProductos(json)

      if (checked) {
        updateNameprod(json.filter(pre => {
          return pre.category.name === checked
        }))
      }
      else {
        updateNameprod(json)
      }
    })

  const Loading = () => {
    let items = [];
    for (let index = 0; index < 20; index++) {
      items.push(<Skeleton variant="rectangular" width={310} height={218} />)
    }
    return (items)
  }


  return (
    <>
      <Appbar />

      <Stack direction='column' sx={{ marginTop: 15 }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ p: 2, border: '1px solid grey' }}>
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
            {QueryProduct.isLoading ?
              <Loading />
              :
              <CardsP results={nameprod} />
            }
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}