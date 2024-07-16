import { ROUTE_PATH } from "../constants/routePath.constant";
import React from "react";
import ProtectedLayout from "../components/layouts/ProtectedLayout/ProtectedLayout";
import BlankLayout from "../components/layouts/BlankLayout/BlankLayout";

export const routes = [
  {
    label: "Landing",
    path: ROUTE_PATH.ROOT.INDEX,
    layout: ProtectedLayout,
    component: React.lazy(
      () => import("../pages/LandingPage/LandingPageScreen")
    ),
    children: [
      {
        label: "About Detail",
        path: "about",
        component: React.lazy(
          () => import("../pages/LandingPage/AboutUs/AboutDetail/AboutDetail")
        ),
      },
    ],
  },
  {
    label: "Not Found",
    path: ROUTE_PATH.NOTFOUND.INDEX,
    layout: BlankLayout,
    component: React.lazy(
      () => import("../components/layouts/NotFoundPage/NotFoundPage")
    ),
  },
];
