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
    exact: true,
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
    label: "Admin",
    path: ROUTE_PATH.ADMIN.INDEX,
    layout: BlankLayout,
    component: React.lazy(() => import("../pages/Admin/Login/Login")),
    exact: true,
  },
  {
    label: "Admin Dashboard",
    path: ROUTE_PATH.ADMIN.INDEX,
    layout: ProtectedLayout,
    children: [
      {
        label: "Admin list",
        path: ROUTE_PATH.ADMIN.DASHBOARD,
        component: React.lazy(
          () => import("../pages/Admin/Dashboard/Dashboard")
        ),
      },
      {
        label: "Employee",
        path: ROUTE_PATH.ADMIN.EMPLOYEE,
        component: React.lazy(() => import("../pages/Admin/Employee/Employee")),
      },
      {
        label: "Menu",
        path: ROUTE_PATH.ADMIN.MENU,
        component: React.lazy(() => import("../pages/Admin/Menu/Menu")),
      },
      {
        label: "table",
        path: ROUTE_PATH.ADMIN.TABLE,
        component: React.lazy(() => import("../pages/Admin/Table/Table")),
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
