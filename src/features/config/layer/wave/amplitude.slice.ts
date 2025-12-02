import { DEFAULT_AMPLITUDE } from '@erikwatson/snowfall'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: number = DEFAULT_AMPLITUDE;

export const amplitudeSlice = createSlice({
  name: 'amplitude',
  initialState,
  reducers: {
    setMax: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMax } = amplitudeSlice.actions

export default amplitudeSlice.reducer