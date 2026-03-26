import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from "./rootReducer"

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  migrate: (state) => {
    if (!state) return Promise.resolve(state);
    const newState = { ...state };
    if (typeof newState.cart?.products === "string") {
      newState.cart.products = [];
    }
    return Promise.resolve(newState);
  },
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const persistor = persistStore(store)

export { store, persistor }