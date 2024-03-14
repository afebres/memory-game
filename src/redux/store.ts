import { configureStore } from '@reduxjs/toolkit'


import { useDispatch } from "react-redux";
import dataReducer from '../redux/reducers/dataReducer/index'

export const store = configureStore({
  reducer: {
    dataReducer: dataReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()