import { DEFAULT_GRAVITY_ANGLE } from '@erikwatson/snowfall'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: number = DEFAULT_GRAVITY_ANGLE;

export const angleSlice = createSlice({
  name: 'angle',
  initialState,
  reducers: {
    setAngle: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAngle } = angleSlice.actions

export default angleSlice.reducer