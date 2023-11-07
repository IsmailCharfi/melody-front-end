import { combineReducers } from "@reduxjs/toolkit";
import { reducer as appReducer } from "src/slices/app";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
