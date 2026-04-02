import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        totalPrice: 0.00,
        totalCount: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;

            const existingProduct = state.products?.find(
                (item) => item._id == product._id
            );

            if (existingProduct) {
                state.products = state.products.map(item => {
                    if (item._id != product._id) return item;

                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                });
            } else {
                state.products?.push({ ...product, quantity: 1 })
            }

            state.totalPrice = state.products.reduce((total, item) => {
                total = item.productPrice + state.totalPrice;
                return total;
            }, 0)
        },
        removeFromCart: (state, action) => {
            const product = action.payload;
            state.products = state.products.filter(item => item._id != product._id);

            state.totalPrice = state.totalPrice - product.productPrice * product.quantity;
        },
        // increaseQuantity: (state, action) => {
        //     const product = action.payload;

        //     if (product.quantity >= 10) return false;

        //    state.products = state.products.map(item => {
        //         if (item._id != product._id) return item;

        //         return {
        //             ...item,
        //             quantity: item.quantity + 1
        //         }
        //     });
        // },
        increaseQuantity: (state, action) => {
            const product = action.payload;

            const item = state.products.find(p => p._id === product._id);

            if (item && item.quantity < 10) {
                item.quantity += 1;
            }
            state.totalPrice = state.totalPrice + item.productPrice;
        },
        // decreaseQuantity: (state, action) => {
        //     const product = action.payload;

        //     if (product.quantity <= 1) return false;

        //     state.products = state.products.map(item => {
        //         if (item._id != product._id) return item;

        //         return {
        //             ...item,
        //             quantity: item.quantity - 1
        //         }
        //     });
        // },
        decreaseQuantity: (state, action) => {
            state.products = state.products.map(item => {
                if (item._id !== action.payload._id) return item;

                if (item.quantity <= 1) return item;

                state.totalPrice = state.totalPrice - item.productPrice;
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            });
        },
        clearCart: (state) => {
                state.products = [];
                state.totalPrice = 0.00;
                state.totalCount = 0;
        }
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;