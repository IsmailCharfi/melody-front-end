import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LocalstorageKeys } from "src/misc/enums/LocalStorage/LocalstorageKeys";
import User from "src/model/User";
import type { AppThunk } from "src/store";

interface AppState {
  isInitialized: boolean;
  isLoaderOn: boolean;
  isSidebarOpen: boolean;
  isLoginModalOpen: boolean;
  requestCount: number;
  user: User | null;
  token: string | null;
}

const initialState: AppState = {
  isInitialized: false,
  isLoaderOn: false,
  isSidebarOpen: false,
  isLoginModalOpen: false,
  requestCount: 0,
  user: null,
  token: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsInitialized: (
      state: AppState,
      action: PayloadAction<{ isInitialized: boolean }>
    ) => {
      state.isInitialized = action.payload.isInitialized;
    },
    loaderOn: (state: AppState) => {
      state.requestCount++;
      state.isLoaderOn = true;
    },
    loaderOff: (state: AppState) => {
      state.requestCount--;
      state.isLoaderOn = state.requestCount === 0;
    },
    openSidebar: (state: AppState) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state: AppState) => {
      state.isSidebarOpen = false;
    },
    openLoginModal: (state: AppState) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state: AppState) => {
      state.isLoginModalOpen = false;
    },
    setUser(state: AppState, action: PayloadAction<{ user: User | null }>) {
      state.user = action.payload.user;
    },
    setToken(state: AppState, action: PayloadAction<{ token: string | null }>) {
      state.token = action.payload.token;
      if (state.token) {
        localStorage.setItem(LocalstorageKeys.TOKEN, state.token);
      } else {
        localStorage.removeItem(LocalstorageKeys.TOKEN);
      }
    },
  },
});

export const reducer = slice.reducer;

export const setIsInitialized =
  (isInitialized: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.setIsInitialized({ isInitialized }));
  };

export const loaderOn = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.loaderOn());
};

export const loaderOff = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.loaderOff());
};

export const openSidebar = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.openSidebar());
};

export const closeSidebar = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.closeSidebar());
};

export const openLoginModal = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.openLoginModal());
};

export const closeLoginModal = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.closeLoginModal());
};

export const setUser =
  (user: User | null): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.setUser({ user }));
  };

export const setToken =
  (token: string | null): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.setToken({ token }));
  };

export default slice;
