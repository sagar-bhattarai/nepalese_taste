import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById } from "@/apis/product.api";
import { rateTheProduct } from "@/modules/starReviews/apis/starRate.api";

/*
    Thunk Actions has 3 states:
       * Pending (loading)
       * Fulfilled (success)
       * Rejected (failed)
*/


//  fetch product
// export const fetchProduct = createAsyncThunk("getProductById", async (productId, { rejectWithValue }) => {
//     try {
//         const res = await getProductById(productId);
//         return res;
//     } catch (error) {
//         if (error.response) {
//             return rejectWithValue(error.response.data)
//         } else {
//             return rejectWithValue(error.message)
//         }
//     }
// });

//  rate product
export const rateProduct = createAsyncThunk("rateTheProduct", async (data, { rejectWithValue }) => {
    try {
        await rateTheProduct(data);
        // const res = await getProductById(productId);
        // return res;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
});



