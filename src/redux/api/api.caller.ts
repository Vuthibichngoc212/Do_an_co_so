import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./fetchBase";
import { IUserResponse } from "../../types/users";
import { IMenuResponse } from "../../types/menu";
// import { AxiosConfigRequest } from "../../types/axios.types";

export const apiCaller = createApi({
  reducerPath: "apiCaller",
  refetchOnMountOrArgChange: 30,
  baseQuery: customBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    settingUser: builder.query<IUserResponse, void>({
      query: () => ({
        url: `/web-settings`,
        method: "GET",
      }),
    }),
    getMenu: builder.query<IMenuResponse, void>({
      query: () => ({
        url: `/menu?page=0&size=5`,
        method: "GET",
      }),
    }),
    filterMenu: builder.query<IMenuResponse, { category: string }>({
      query: ({ category }) => ({
        url: `/menu/${category}?page=0&limit=5`,
        method: "GET",
      }),
      // query: ({ category }) => {
      //   console.log("Category:", category);
      //   return {
      //     url: `/menu/${category}?page=0&limit=5`,
      //     method: "GET",
      //   };
      // },
    }),
  }),
});

export const { useSettingUserQuery, useGetMenuQuery, useFilterMenuQuery } =
  apiCaller;
