import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./fetchBase";
import { IUserResponse } from "../../types/users";
import { IMenuResponse, IMenuItem } from "../../types/menu";
import { IEmployeeResponse } from "../../types/employee";
import { ITableResponse } from "../../types/table";
import { ICategoryResponse } from "../../types/category";
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
        url: `/users/all?page=0&limit=100`,
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
        url: `/menu/all?page=0&limit=200`,
        method: "GET",
      }),
    }),
    addMenu: builder.mutation<void, IMenuItem>({
      query: (menuItem) => ({
        url: `/menu/createItem`,
        method: "POST",
        body: menuItem,
      }),
    }),
    deleteMenu: builder.mutation<void, { menuId: number }>({
      query: ({ menuId }) => ({
        url: `/menu/deleteItem/${menuId}`,
        method: "DELETE",
      }),
    }),
    updateMenu: builder.mutation<void, { menuId: number; menuItem: IMenuItem }>(
      {
        query: ({ menuId, menuItem }) => ({
          url: `/menu/updateItem/${menuId}`,
          method: "PUT",
          body: menuItem,
        }),
      }
    ),
    filterMenu: builder.query<IMenuResponse, { category: string }>({
      query: ({ category }) => ({
        url: `/menu/${category}?page=0&limit=100`,
        method: "GET",
      }),
    }),
    getTable: builder.query<ITableResponse, void>({
      query: () => ({
        url: `/tables/all?page=0&limit=100`,
        method: "GET",
      }),
    }),
    addTable: builder.mutation<void, { numberOfTable: number }>({
      query: ({ numberOfTable }) => ({
        url: `/tables/add?numberOfTables=${numberOfTable}`,
        method: "POST",
      }),
    }),
    getCategory: builder.query<ICategoryResponse, void>({
      query: () => ({
        url: "/categories/all?page=0&limit=50",
        method: "GET",
      }),
    }),
    getHotMenu: builder.query<IMenuResponse, void>({
      query: () => ({
        url: `/menu/all?page=0&limit=5`,
        method: "GET",
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
  useAddTableMutation,
  useDeleteMenuMutation,
  useAddMenuMutation,
  useGetCategoryQuery,
  useUpdateMenuMutation,
  useGetHotMenuQuery,
} = apiCaller;
