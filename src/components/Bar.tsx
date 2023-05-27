import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/bar.module.css'
import { RootState } from '../reducer/store'
import {useDispatch, useSelector} from 'react-redux'
import { add,  isDisabled, increment, decrement, resetQuantity} from '../reducer/cartReducer';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID, APP_SECRET } from '../config/config'



interface props{
    controlBar : () => void;
    barHeight : number;
    setBarHeight: React.Dispatch<React.SetStateAction<number>>;
    setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface items {
    title : string,
    price : number,
    image : string,
    description : string,
    id : number,
    disabled : boolean,
    totalItem: number,
    quantity: number
};
  

const Bar:React.FC<props> = ({controlBar, setBarHeight, setSideBar}) => {


    const containerRef = useRef<HTMLDivElement>(null);

    const products = useSelector((state : RootState) => state.cart)
    const productsSelected: Array<items> = products.filter((product) => product.disabled)

    useEffect(() => {
        if (containerRef.current){
            const containerHeight = containerRef.current.clientHeight;
            setBarHeight(containerHeight);
        }
    },[productsSelected.length])


    const dispatch = useDispatch();

    const deleteItem = (id: number) =>{
        dispatch(isDisabled(id));
        dispatch(resetQuantity(id));
    }

    useEffect(() => {
        if(productsSelected.length === 0){
            setSideBar(false)
        }
    },[productsSelected.length])


    const incrementQuantity = (id: number) =>{
        dispatch(increment(id))
    }
    
    const decrementQuantity = (id: number) =>{
        dispatch(decrement(id))
    }

    const totalItems: any = productsSelected.reduce((sum, product) => sum + product.totalItem, 0).toFixed(2)



  return (

    <div className={styles.container} ref={containerRef} data-aos="fade-left" data-aos-delay="100">
        <div className={styles.heading}>
            <h2 className={styles.header}>Cart</h2>
            <button className={styles.close} onClick={controlBar}>x</button>
        </div>
        <div className={styles.boxes}>

            <>
                {
                    productsSelected.length > 0 && productsSelected.map((item, index) => {
                        
                        let title = item.title;
                        let price = item.price;
                        let image = item.image;
                        let id = item.id;
                        let quantity = item.quantity;
                        let totalItem = item.totalItem;
                                    

                        return (
                            <div className={styles.box} key={id}>
                                <img src={image} alt="icon" className={styles.img}/>
                                <div className={styles.info}>
                                    <div className={styles.item1}>
                                        <h4 className={styles.title}>{title.split(" ").slice(0,3).join(" ")+ '..'}</h4>
                                        <div className={styles.item4}>
                                            <h5 className={styles.price}>${Number(totalItem.toFixed(2))}</h5>
                                            <button className={styles.delete} onClick={() => deleteItem(id)}>x</button>
                                        </div>
                                    </div>
                                    <div className={styles.item2}>
                                        <button className={styles.decrement} onClick={() => decrementQuantity(id)} disabled={quantity <= 1}>-</button>
                                        <h5 className={styles.quantity}>{quantity}</h5>
                                        <button className={styles.increment} onClick={() => incrementQuantity(id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </>

        </div>
        <h3 className={styles.total}>
            Total: <span className={styles.span}>${totalItems}</span>
        </h3>
        <div className={styles.buttons}>
            <PayPalScriptProvider options={{ "client-id": CLIENT_ID }} > 
                <PayPalButtons
                className={styles.paypal}
                style={{ layout: "horizontal" }} 
                createOrder={(data, actions) => { return actions.order.create({ purchase_units: [ { amount: { value: totalItems } } ] }); }}
                />
            </PayPalScriptProvider>
            <button className={styles.delivery}>Pay on delivery</button>
        </div>
    </div>
  )
}

export default Bar