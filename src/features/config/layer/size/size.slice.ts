import { combineReducers } from "@reduxjs/toolkit";
import maxReducer from "./max.slice";
import minReducer from "./min.slice";

export const sizeReducer = combineReducers({
  max: maxReducer,
  min: minReducer
})