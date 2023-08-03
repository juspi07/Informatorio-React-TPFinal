import { useState, useContext } from "react";
import UserContext from '../components/context'


const CarritoItem = () => {
    const { carrito, setCarrito } = useContext(UserContext);
    
    const DeleteItem = (id) => {
        setCarrito((current) =>
            carrito.filter((element) => {
            return element.id !== id;
            }))
    }
       
    let display
    if (carrito) {
        display = carrito.map((x) => {
            let { id, title, cant, image, price } = x;
            let total = (cant * price)
            return (
                <>
                <div class="summary_card">
                    <div class="card_item">
                        <div class="product_img">
                            <img src={image} alt="" />
                        </div>
                        <div class="product_info">
                            <h1>{title}</h1>

                            <div class="close-btn">
                                <i class="fa fa-close"></i>
                            </div>
                            <div class="product_rate_info" style={{ marginTop: '40px' }}>
                                <h1>$ {price}</h1>
                                <span onClick={() => {
                                    if ((cant - 1) > 0) {
                                        setCarrito(carrito.map(element => {
                                            if (element.id === id) {
                                                return { ...element, cant: --cant };
                                            } else {
                                                return element;
                                            }
                                        }))}
                                }} class="pqt-minus">-</span>
                                <span class="pqt">{cant}</span>
                                <span onClick={() => {
                                    setCarrito(carrito.map(element => {
                                        
                                        if (element.id === id) {
                                            return { ...element, cant: ++cant };
                                        } else {
                                            return element;
                                        }
                                    }))
                                }} class="pqt-plus">+</span>
                                <span onClick={() => { DeleteItem(id)                                   
                                }} class="pqt-plus2">Eliminar</span>
                            </div>
                        </div>
                    </div>
                </div> 

  </>
            )
        })
        return <>{display}</>;
    }
}
export default CarritoItem;


