import { createSlice } from "@reduxjs/toolkit";
// import { fetchProduct, rateProduct } from "./starReviewActions";
import { rateProduct } from "./starReviewActions";


const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        loading: false,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // fetch
            // .addCase(fetchProduct.pending, (state) => {
            //     state.product = null;
            //     state.loading = true;
            // })

            // .addCase(fetchProduct.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.product = action.payload;
            // })

            // rate
            .addCase(rateProduct.fulfilled, (state, action) => {
                state.product = action.payload; // auto update UI
            });
    },
});

export default productSlice.reducer;



