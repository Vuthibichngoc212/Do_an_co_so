import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_URL}/${
  import.meta.env.VITE_REACT_APP_API_VERSION
}/`;

const customBaseQuery = () => {
  const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
  return async (args: string | FetchArgs, api: BaseQueryApi) => {
    const token = localStorage.getItem("token");

    if (typeof args === "string") {
      args = { url: args } as FetchArgs;
    }

    if (!args.headers) {
      args.headers = new Headers();
    }

    if (token) {
      if (args.headers instanceof Headers) {
        args.headers.set("Authorization", `Bearer ${token}`);
      } else {
        (args.headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${token}`;
      }
    }

    const response = await baseQuery(args, api, {});
    if (response.error?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin";
    }
    return response;
  };
};

export default customBaseQuery;
