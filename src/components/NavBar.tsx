import React, { useState } from 'react'
import styles from '../styles/navbar.module.css'
import { Cart3 } from 'react-bootstrap-icons';
import { RootState } from '../reducer/store'
import {useDispatch, useSelector} from 'react-redux'




interface prop{
  controlBar: () => void
}

interface items {
  title : string,
  price : number,
  image : string,
  description : string,
  id : number,
  disabled : boolean,
}


const NavBar:React.FC<prop> = ({ controlBar}) => {


  const products = useSelector((state : RootState) => state.cart)
  const productsSelected: Array<items> = products.filter((product) => product.disabled)
  const counter = productsSelected.length


  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          Shop House
        </h1>

        <div className={styles.list}>
          <h5 className={styles.listItem}>Home</h5>
          <h5 className={styles.listItem}>About</h5>
          <h5 className={styles.listItem}>Contact</h5>
          <h5 className={styles.listItem}>FAQ</h5>
        
          <div className={styles.item3}>
            <h6 className={styles.cart} onClick={controlBar}>
              <Cart3 color="royalblue" size={35} className={styles.icon}/>
              <span className={styles.counter}>{counter}</span>
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar