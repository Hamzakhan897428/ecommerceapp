import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import cardReducer from './cardSlice'

export const store = configureStore({
    reducer: {
        counterStore: counterReducer,
        cardStore: cardReducer,
    },
})