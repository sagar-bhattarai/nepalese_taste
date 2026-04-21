import { combineReducers } from '@reduxjs/toolkit'
import userPreferencesReducer from './userPreference/userPreferencesSlice';
import authReducer from "./auth/authSlice";
import cartReucer from "./cart/cartSlice"
import timeReucer from "./commentTime/timeSlice"

const rootReducer = combineReducers({
    userPreferences: userPreferencesReducer,
    auth: authReducer,
    cart: cartReucer,
    time: timeReucer
})

export default rootReducer;