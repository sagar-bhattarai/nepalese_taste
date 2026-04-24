import { combineReducers } from '@reduxjs/toolkit'
import userPreferencesReducer from './userPreference/userPreferencesSlice';
import authReducer from "./auth/authSlice";
import cartReucer from "./cart/cartSlice";
import timeReucer from "./commentTime/timeSlice";
import productReducer from "./forStarReviews/starReviewSlice";

const rootReducer = combineReducers({
    userPreferences: userPreferencesReducer,
    auth: authReducer,
    cart: cartReucer,
    time: timeReucer,
    product: productReducer,
})

export default rootReducer;