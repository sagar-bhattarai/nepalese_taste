import { combineReducers } from '@reduxjs/toolkit'
import userPreferencesReducer from './userPreference/userPreferencesSlice';
import authReducer from "./auth/authSlice";
import cartReucer from "./cart/cartSlice"

const rootReducer = combineReducers({
    userPreferences: userPreferencesReducer,
    auth: authReducer,
    cart: cartReucer
})

export default rootReducer;