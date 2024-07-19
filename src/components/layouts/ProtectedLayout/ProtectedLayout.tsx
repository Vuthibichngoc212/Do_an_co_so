import { useEffect } from "react";
import { useOutlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import SideBar from "../../organisms/SideBar/Sidebar";
import Header from "../../organisms/Header/Header";

function ProtectedLayout() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminPath) {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin");
      }
    }
  }, [location.pathname, navigate, isAdminPath]);

  const isAdminDashboardPath =
    location.pathname.startsWith("/admin/dashboard") ||
    location.pathname.startsWith("/admin/employee") ||
    location.pathname.startsWith("/admin/menu") ||
    location.pathname.startsWith("/admin/table");

  return (
    <Box sx={{ display: "flex" }}>
      {isAdminDashboardPath && (
        <>
          <SideBar />
          <Stack
            sx={{
              width: "100%",
              padding: 2,
            }}
          >
            <Header />
            <Stack
              sx={{
                paddingBottom: "4.4rem",
                width: "97%",
              }}
            >
              {outlet}
            </Stack>
          </Stack>
        </>
      )}
      {!isAdminDashboardPath && (
        <Stack
          sx={{
            width: "100%",
          }}
        >
          {outlet}
        </Stack>
      )}
    </Box>
  );
}

export default ProtectedLayout;
