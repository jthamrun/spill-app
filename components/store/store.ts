import { configureStore } from "@reduxjs/toolkit";

import expensesReducer from "./expenses/expenseSlice"

export const store = configureStore({
    reducer: {
        expenses: expensesReducer
    },
})

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

