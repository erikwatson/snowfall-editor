import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScheduleState = {
  enabled: boolean;
  from: { day: number | null; month: number | null };
  to: { day: number | null; month: number | null };
};

const initialState: ScheduleState = {
  enabled: false,
  from: { day: null, month: null },
  to: { day: null, month: null },
};

const scheduleSlice = createSlice({
  name: "userSchedule",
  initialState,
  reducers: {
    setScheduleEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
    setStartMonth: (state, action: PayloadAction<number | null>) => {
      state.from.month = action.payload;
      state.from.day = null;
      state.to = { day: null, month: null };
    },
    setStartDay: (state, action: PayloadAction<number | null>) => {
      state.from.day = action.payload;
    },
    setEndMonth: (state, action: PayloadAction<number | null>) => {
      state.to.month = action.payload;
      state.to.day = null;
    },
    setEndDay: (state, action: PayloadAction<number | null>) => {
      state.to.day = action.payload;
    },
    resetSchedule: () => initialState,
  },
});

export const {
  setScheduleEnabled,
  setStartMonth,
  setStartDay,
  setEndMonth,
  setEndDay,
  resetSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;