import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../types/users";
import { IMenuItem } from "../../types/menu";

export interface IDashboardState {
  users: IUser[];
  menus: IMenuItem[];
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
    setMenu: (state, action: PayloadAction<IMenuItem>) => {
      state.menus = [...state.menus, action.payload];
    },
  },
});

export const { setUser, setMenu } = dashboardSlice.actions;

export const userSelector = (state: RootState) => state.dashboard.users;

export default dashboardSlice.reducer;
