import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signUp , logoutFromServer} from "@/apis/auth.api";

/*
    Thunk Actions has 3 states:
       * Pending (loading)
       * Fulfilled (success)
       * Rejected (failed)
*/
export const loginUser = createAsyncThunk('login', async (data, { rejectWithValue }) => {

    try {
        const result = await login(data);
        localStorage.setItem("accessToken", result.accessToken);
        document.cookie = `userId=${result.userData._id}; path=/`;
        return result;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const logOutUser = createAsyncThunk('logoutFromServer', async (_, { rejectWithValue }) => {
    try {
        const test  = await logoutFromServer(); 
        localStorage.removeItem("accessToken"); 
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const signUpUser = createAsyncThunk('signUp', async (data, { rejectWithValue }) => {
    try {
        const result = await signUp(data);

        return result;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
})





























// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { login,signUp } from "@/apis/auth.api";

// /*
//     Thunk Actions has 3 states:
//        * Pending (loading)
//        * Fulfilled (success)
//        * Rejected (failed)
// */
// export const loginUser = createAsyncThunk('login', async (data, {rejectWithValue}) => {

//     try {
//         const result = await login(data);
//         localStorage.setItem("accessToken", result.data.accessToken);
//         // localStorage.setItem("refreshToken", result.data.refreshToken);
//         // document.cookie = `refreshToken=${result.data.refreshToken}; path=/`;
//         document.cookie = `accessToken=${result.data.accessToken}; path=/`;
//         document.cookie = `userId=${result.data.loggedInUser._id}; path=/`;
//         return result;
//     } catch (error) {
//         if (error.response) {
//             // console.log("Server error message:", error.response.data);
//             return rejectWithValue(error.response.data)
//         } else {
//             // console.log("Axios config error:", error.message);
//             return rejectWithValue(error.message)
//         }
//     }
// })


// export const signUpUser = createAsyncThunk('signUp', async (data, {rejectWithValue}) => {
//     try {
//         const result = await signUp(data);
//         return result;
//     } catch (error) {
//         if (error.response) {
//             return rejectWithValue(error.response.data)
//         } else {
//             return rejectWithValue(error.message)
//         }
//     }
// })