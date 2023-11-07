import { combineReducers } from "@reduxjs/toolkit";
import { reducer as appReducer } from "src/slices/app";
import { reducer as eventReducer } from "src/slices/event";

const rootReducer = combineReducers({
  app: appReducer,
  event: eventReducer,
});

export default rootReducer;
