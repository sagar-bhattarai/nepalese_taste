import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        totalPrice: 0,
        totalCount: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find(
                (item) => item._id == product._id
            );

            if (existingProduct) {
                state.products.map(item=>{
                    if(item._id != product._id) return item;

                    return{
                        ... item,
                        quantity: item.quantity + 1
                    }
                });
            }else{
                state.products.push({ ...product, quantity: 1 })
            }
        },
        removeFromCart: state => { },
        increaseQuantity: state => { },
        decreaseQuantity: state => { },
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;