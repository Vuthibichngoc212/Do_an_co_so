import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routerPath";
import LazyLoading from "../components/LazyLoading";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.label} path={route.path} element={<route.layout />}>
            {route.children ? (
              route.children.map((child) => (
                <Route
                  key={child.label}
                  path={child.path}
                  element={
                    <Suspense fallback={<LazyLoading />}>
                      <child.component />
                    </Suspense>
                  }
                />
              ))
            ) : (
              <Route
                index
                element={
                  <Suspense fallback={<LazyLoading />}>
                    <route.component />
                  </Suspense>
                }
              />
            )}
            <Route
              index
              element={
                <Suspense fallback={<LazyLoading />}>
                  <route.component />
                </Suspense>
              }
            />
          </Route>
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
