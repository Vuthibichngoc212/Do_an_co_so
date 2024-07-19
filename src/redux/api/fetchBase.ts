import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_URL}/${
  import.meta.env.VITE_REACT_APP_API_VERSION
}/`;

const refreshToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const customBaseQuery = () => {
  const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
  return async (args: string | FetchArgs, api: BaseQueryApi) => {
    let token = localStorage.getItem("token");

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

    let response = await baseQuery(args, api, {});
    if (response.error?.status === 401) {
      try {
        token = await refreshToken();
        if (token) {
          if (args.headers instanceof Headers) {
            args.headers.set("Authorization", `Bearer ${token}`);
          } else {
            (args.headers as Record<string, string>)[
              "Authorization"
            ] = `Bearer ${token}`;
          }
          response = await baseQuery(args, api, {});
        }
      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/admin";
      }
    }

    return response;
  };
};

export default customBaseQuery;
