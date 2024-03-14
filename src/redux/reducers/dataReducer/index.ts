import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../helpers/config/config'

export const getData = createAsyncThunk('data/getData', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(API_URL)

    return data.entries.slice(0, 4)
  } catch (err) {
    return thunkAPI.rejectWithValue({
      errorMessage: err,
    })
  }
})

interface DataState {
  data: Array<any>
  fetchingData: string
  error: string | null | undefined
}

const initialState: DataState = {
  data: [],
  fetchingData: 'NO_DATA',
  error: null,
}

export const data = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.fetchingData = 'NO_DATA'
        state.data = initialState.data
        state.error = null
      })
      .addCase(getData.fulfilled, (state: DataState, action) => {
        state.fetchingData = 'FETCHED'
        state.data = action.payload
        state.error = null
      })
      .addCase(getData.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default data.reducer
