import { DEFAULT_MASS_MIN } from '@erikwatson/snowfall'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: number = DEFAULT_MASS_MIN;

export const minSlice = createSlice({
  name: 'min',
  initialState,
  reducers: {
    setMin: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMin } = minSlice.actions

export default minSlice.reducer