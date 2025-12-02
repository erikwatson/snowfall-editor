import { DEFAULT_FREQUENCY } from '@erikwatson/snowfall'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: number = DEFAULT_FREQUENCY;

export const frequencySlice = createSlice({
  name: 'frequency',
  initialState,
  reducers: {
    setMax: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMax } = frequencySlice.actions

export default frequencySlice.reducer