import { DEFAULT_MASS_MAX } from '@erikwatson/snowfall'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: number = DEFAULT_MASS_MAX;

export const maxSlice = createSlice({
  name: 'max',
  initialState,
  reducers: {
    setMax: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMax } = maxSlice.actions

export default maxSlice.reducer