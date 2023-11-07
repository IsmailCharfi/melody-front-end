import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Event from "src/model/Event";
import type { AppThunk } from "src/store";

interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [
    { id: 1, name: "test" },
    { id: 1, name: "test" },
    { id: 1, name: "test" },
    { id: 1, name: "test" },
  ],
};

const slice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents(state: EventState, action: PayloadAction<{ events: Event[] }>) {
      state.events = action.payload.events;
    },
  },
});

export const reducer = slice.reducer;

export const setEvents =
  (events: Event[]): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.setEvents({ events }));
  };

export default slice;
