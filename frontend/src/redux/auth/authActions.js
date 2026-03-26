import { createAsyncThunk } from "@reduxjs/toolkit";
import { login,signUp } from "@/apis/auth.api";

/*
    Thunk Actions has 3 states:
       * Pending (loading)
       * Fulfilled (success)
       * Rejected (failed)
*/
export const loginUser = createAsyncThunk('login', async (data, {rejectWithValue}) => {
    try {
        const result = await login(data);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("accessToken", result.data.accessToken);
        return result;
    } catch (error) {
        if (error.response) {
            // console.log("Server error message:", error.response.data);
            return rejectWithValue(error.response.data)
        } else {
            // console.log("Axios config error:", error.message);
            return rejectWithValue(error.message)
        }
    }
})


export const signUpUser = createAsyncThunk('signUp', async (data, {rejectWithValue}) => {
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