import {createSlice} from '@reduxjs/toolkit'
import {PayloadAction} from '@reduxjs/toolkit'


interface cartState {
    title : string;
    price : number;
    image : string;
    description : string;
    id : number;
    disabled : boolean;
    totalItem: number,
    quantity: number
  }

const initialState: Array<cartState> = [];

export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        
        add : (state, action:PayloadAction<any>) => {
            state.push(...action.payload)
        },

        isDisabled : (state, action:PayloadAction<number>) =>{
            const productIndex = state.findIndex((item) =>
                item.id === action.payload
            )
            const product = state[productIndex];
            const updatedProduct = {...product, disabled: !product.disabled};
            const updatedProducts = state.slice();
            updatedProducts.splice(productIndex, 1, updatedProduct)
            return updatedProducts
        },

        increment : (state, action:PayloadAction<number>) =>{
            const productIndex = state.findIndex((item) =>
                item.id === action.payload
            )
            const product = state[productIndex]
            const updatedProduct = {...product, quantity : product.quantity + 1 , totalItem: (product.quantity + 1) * product.price}
            const updatedProducts = state.slice();
            updatedProducts.splice(productIndex, 1, updatedProduct)
            return updatedProducts
        },

        decrement : (state, action:PayloadAction<number>) =>{
            const productIndex = state.findIndex((item) =>
                item.id === action.payload
            )
            const product = state[productIndex]
            const updatedProduct = {...product, quantity : product.quantity - 1, totalItem: (product.quantity - 1) * product.price}
            const updatedProducts = state.slice();
            updatedProducts.splice(productIndex, 1, updatedProduct)
            return updatedProducts
        },

        resetQuantity : (state, action:PayloadAction<number>) =>{
            const productIndex = state.findIndex((item) =>
                item.id === action.payload
            )
            const product = state[productIndex]
            const updatedProduct = {...product, quantity : 1, totalItem: product.price}
            const updatedProducts = state.slice();
            updatedProducts.splice(productIndex, 1, updatedProduct)
            return updatedProducts
        }
    }
})

export const { add, isDisabled, increment, decrement, resetQuantity} = cartSlice.actions

export default cartSlice.reducer