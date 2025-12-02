import { combineReducers } from "@reduxjs/toolkit";
import amplitudeReducer from './amplitude.slice'
import frequencyReducer from './frequency.slice'

export const swayReducer = combineReducers({
  amplitude: amplitudeReducer,
  frequency: frequencyReducer
})