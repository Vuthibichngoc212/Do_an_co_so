import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./fetchBase";
import { IUserResponse } from "../../types/users";
import { IMenuResponse } from "../../types/menu";
import { IEmployeeResponse } from "../../types/employee";
import { ITableResponse } from "../../types/table";
export const apiCaller = createApi({
  reducerPath: "apiCaller",
  refetchOnMountOrArgChange: 30,
  baseQuery: customBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (users) => ({
        url: "/users/login?isAdmin=true",
        method: "POST",
        body: users,
      }),
    }),
    getUsers: builder.query<IEmployeeResponse, void>({
      query: () => ({
        url: `/users/all?page=0&limit=10`,
        method: "GET",
      }),
    }),
    createUsers: builder.mutation({
      query: (users) => ({
        url: "/users/create",
        method: "POST",
        body: users,
      }),
    }),
    updateUsers: builder.mutation({
      query: ({ userId, ...users }) => ({
        url: `/users/update/${userId}`,
        method: "PUT",
        body: users,
      }),
    }),
    deleteUsers: builder.mutation({
      query: (userId: string) => ({
        url: `/users/delete/${userId}`,
        method: "DELETE",
      }),
    }),
    settingUser: builder.query<IUserResponse, void>({
      query: () => ({
        url: `/web-settings`,
        method: "GET",
      }),
    }),
    getMenu: builder.query<IMenuResponse, void>({
      query: () => ({
        url: `/menu/all?page=0&limit=10`,
        method: "GET",
      }),
    }),
    filterMenu: builder.query<IMenuResponse, { category: string }>({
      query: ({ category }) => ({
        url: `/menu/${category}?page=0&limit=10`,
        method: "GET",
      }),
    }),
    getTable: builder.query<ITableResponse, void>({
      query: () => ({
        url: `/tables/all?page=0&limit=10`,
        method: "GET",
      }),
    }),
    deleteTable: builder.mutation<void, { tableId: number }>({
      query: ({ tableId }) => ({
        url: `/tables/${tableId}`,
        method: "DELETE",
      }),
    }),
    addTable: builder.mutation<void, { numberOfTable: number }>({
      query: ({ numberOfTable }) => ({
        url: `/tables/add?numberOfTables=${numberOfTable}`,
        method: 'POST',
      }),
    }),
    
  }),
});

export const {
  useGetUsersQuery,
  useCreateUsersMutation,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
  useLoginMutation,
  useSettingUserQuery,
  useGetMenuQuery,
  useFilterMenuQuery,
  useGetTableQuery,
  useDeleteTableMutation,
  useAddTableMutation,
} = apiCaller;
