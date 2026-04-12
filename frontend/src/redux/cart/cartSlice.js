import { createSlice } from "@reduxjs/toolkit";

const calculateTotals = (state) => {
  const total = state.products.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0,
  );

  state.totalPrice = total;

  state.discount = Math.ceil(total * 0.05); // 5 %
  state.tax = Math.ceil(total * 0.13); // 13 %

  state.finalPrice = total - state.discount + state.tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
    finalPrice: 0,
    totalCount: 0,
    discount: 0,
    tax: 0,
    deliveryPrice: 0,
    shipping_details: {}
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.products.find(
        (item) => item._id === product._id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
        state.totalCount += 1;
      }

      calculateTotals(state); // ✅ recalc everything
    },

    removeFromCart: (state, action) => {
      const product = action.payload;

      state.products = state.products.filter(
        (item) => item._id !== product._id,
      );

      state.totalCount -= 1;

      calculateTotals(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find((p) => p._id === action.payload._id);

      if (item && item.quantity < 10) {
        item.quantity += 1;
      }

      calculateTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.products.find((p) => p._id === action.payload._id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      calculateTotals(state);
    },

    addDeliveryPrice : (state, action)=>{
            state.deliveryPrice =  state.deliveryPrice + action.payload;
    },

    shippingDetails: (state, action)=>{
            state.shipping_details = action.payload;
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.finalPrice = 0;
      state.totalCount = 0;
      state.discount = 0;
      state.tax = 0;
      state.deliveryPrice = 0;
      state.shipping_details = {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addDeliveryPrice,
  shippingDetails
} = cartSlice.actions;

export default cartSlice.reducer;














// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         totalPrice: 0.00,
//         totalCount: 0,
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const product = action.payload;

//             const existingProduct = state.products?.find(
//                 (item) => item._id == product._id
//             );

//             if (existingProduct) {
//                 state.products = state.products.map(item => {
//                     if (item._id != product._id) return item;

//                     return {
//                         ...item,
//                         quantity: item.quantity + 1
//                     }
//                 });
//             } else {
//                 state.products?.push({ ...product, quantity: 1 })
//                 state.totalCount += 1
//             }

//             state.totalPrice = state.products.reduce((total, item) => {
//                 total = item.productPrice + state.totalPrice;
//                 return total;
//             }, 0)
//         },
//         removeFromCart: (state, action) => {
//             const product = action.payload;
//             state.products = state.products.filter(item => item._id != product._id);

//             state.totalPrice = state.totalPrice - product.productPrice * product.quantity;
//             state.totalCount -= 1
//         },
//         // increaseQuantity: (state, action) => {
//         //     const product = action.payload;

//         //     if (product.quantity >= 10) return false;

//         //    state.products = state.products.map(item => {
//         //         if (item._id != product._id) return item;

//         //         return {
//         //             ...item,
//         //             quantity: item.quantity + 1
//         //         }
//         //     });
//         // },
//         increaseQuantity: (state, action) => {
//             const product = action.payload;

//             const item = state.products.find(p => p._id === product._id);

//             if (item && item.quantity < 10) {
//                 item.quantity += 1;
//             }
//             state.totalPrice = state.totalPrice + item.productPrice;
//         },
//         // decreaseQuantity: (state, action) => {
//         //     const product = action.payload;

//         //     if (product.quantity <= 1) return false;

//         //     state.products = state.products.map(item => {
//         //         if (item._id != product._id) return item;

//         //         return {
//         //             ...item,
//         //             quantity: item.quantity - 1
//         //         }
//         //     });
//         // },
//         decreaseQuantity: (state, action) => {
//             state.products = state.products.map(item => {
//                 if (item._id !== action.payload._id) return item;

//                 if (item.quantity <= 1) return item;

//                 state.totalPrice = state.totalPrice - item.productPrice;
//                 return {
//                     ...item,
//                     quantity: item.quantity - 1
//                 };
//             });
//         },
//         cartTotalPrice: (state, action) => {
//             console.log(action.payload)
//             state.totalPrice = state.totalPrice + action.payload;
//         },
//         clearCart: (state) => {
//             state.products = [];
//             state.totalPrice = 0.00;
//             state.totalCount = 0;
//         }
//     }
// })

// export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotalPrice, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;
