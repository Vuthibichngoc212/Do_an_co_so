import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../types/users";
import { IMenu } from "../../types/menu";

export interface IDashboardState {
  users: IUser[];
  menus: IMenu[];
}

const initialState: IDashboardState = {
  users: [],
  menus: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.users = [...state.users, action.payload];
    },
    setMenu: (state, action: PayloadAction<IMenu>) => {
      state.menus = [...state.menus, action.payload];
    },
  },
});

export const { setUser, setMenu } = dashboardSlice.actions;

export const userSelector = (state: RootState) => state.dashboard.users;

export default dashboardSlice.reducer;
