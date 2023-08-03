import React, { useContext, useState } from 'react';

import Appbar from '../components/appbar'
import UserContext from '../components/context'
import CarritoItem from '../components/carritoitem'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/carrito.css'



export default function Carrito() {
    const { carrito, setCarrito } = useContext(UserContext);
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const [bandera, setBandera] = useState(true)

    useEffect(() => {
        setTotal(0)
        carrito.map(elem => {
            setTotal(e => e + (elem.cant * elem.price))
        })
        if (carrito.length > 0) {
            setBandera(false)
        } else {
            setBandera(true)
        }
    }, [carrito])

    return (
        <>
            <Appbar />
            <div class="container2">
                <h2 style={{ marginLeft: '300px', marginTop: '100px' }}> CARRITO DE COMPRAS</h2>
                <CarritoItem></CarritoItem>
                <span />
                {carrito.length != 0 ?
                    <div>
                        <div class="order_total">
                            <p>Total:</p>
                            <h4>${total}</h4>
                        </div>
                        <button onClick={() => { navigate(`/success`) }}

                            style={{ maxWidth: '300px', marginLeft: '300px' }}> Realizar compra</button>
                    </div> : null}
            </div>
        </>
    )
}