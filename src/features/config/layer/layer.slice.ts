import { combineReducers } from "@reduxjs/toolkit";
import { gravityReducer } from './gravity/gravity.slice'
import { sizeReducer } from './size/size.slice'

export const layerReducer = combineReducers({
  gravity: gravityReducer,
  size: sizeReducer,
});