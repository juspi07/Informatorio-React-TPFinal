import React, { useContext, useEffect, useState } from 'react';
import Appbar from '../components/appbar'
import { useNavigate } from 'react-router';
import UserContext from '../components/context'



export default function Exito() {
    let [counter, setCounter] = useState(5);
    const navigate = useNavigate()
    const { carrito, setCarrito } = useContext(UserContext);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        if (counter == 0) {
            setCarrito([])
            navigate('/')
        }
    }, [counter])


    return (
        <>
            <Appbar />
            <div style={{marginLeft:'300px'}}>
                <h4>SU COMPRA FUE REALIZADA CON EXITO</h4>
                <span />
                <h8>Se enviará a la pagina principal en... {counter}</h8>
            </div>
        </>
    )



}