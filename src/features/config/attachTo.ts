import { DEFAULT_CONTAINER_ID } from '@erikwatson/snowfall'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = DEFAULT_CONTAINER_ID

export const attachToSlice = createSlice({
  name: 'attachTo',
  initialState,
  reducers: {
    reset: (state) => {
      return DEFAULT_CONTAINER_ID
    },
    setAttachTo: (state, action: PayloadAction<string>) => {
      return action.payload
    },
  },
})

export const { setAttachTo } = attachToSlice.actions // Exporting actions consistently

export default attachToSlice.reducer // Exporting reducer

