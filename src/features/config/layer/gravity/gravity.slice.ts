import { combineReducers } from "@reduxjs/toolkit";
import angleReducer from "./angle.slice";
import strengthReducer from "./strength.slice";

export const gravityReducer = combineReducers({
  angle: angleReducer,
  strength: strengthReducer
})