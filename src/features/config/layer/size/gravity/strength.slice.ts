import { DEFAULT_GRAVITY_STRENGTH } from '@erikwatson/snowfall'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: number = DEFAULT_GRAVITY_STRENGTH;

export const strengthSlice = createSlice({
  name: 'strength',
  initialState,
  reducers: {
    setStrength: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setStrength } = strengthSlice.actions

export default strengthSlice.reducer