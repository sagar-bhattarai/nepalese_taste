import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signUpUser } from "./authActions";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: null,
        user: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.setItem("accessToken","");
            localStorage.setItem("refreshToken","");
        }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })        
            // register
            .addCase(signUpUser.pending, (state, action) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {logout} = authSlice.actions

export default authSlice.reducer;