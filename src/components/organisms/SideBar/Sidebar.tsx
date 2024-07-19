import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableBarIcon from "@mui/icons-material/TableBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import logoRes from "../../../assets/logoRes.png";
import CopyrightMini from "../../layouts/Copyright/MiniCopyright";
import { useStyles } from "./Sidebar.styles";

const drawerWidth = 267;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const activeClassName = "nav-item-active";

const StyledNavLink = styled(NavLink)(() => ({
  textDecoration: "none",
  color: "inherit",
  borderRadius: "16px",
  "&.active": {
    "& .first-icon": {
      display: "block",
    },
    "& .second-icon": {
      display: "none",
    },
  },
  "& .first-icon": {
    display: "none",
  },
  "& .second-icon": {
    display: "block",
  },
}));

const SideBar: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const is425px = useMediaQuery("(max-width:425px)");
  const [open, setOpen] = useState(() => (!is425px ? true : false));
  const [selectedItem, setSelectedItem] = useState<string>("");

  const menuItems = [
    { id: "dashboard", label: "Tổng quan", Icon: DashboardIcon },
    { id: "employee", label: "Nhân viên", Icon: PeopleIcon },
    { id: "menu", label: "Thực đơn", Icon: MenuBookIcon },
    { id: "table", label: "Bàn", Icon: TableBarIcon },
  ];

  useEffect(() => {
    setOpen(!is425px);
  }, [is425px]);

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setSelectedItem(path || "dashboard");
  }, [location]);

  const handleDrawer = () => {
    setOpen(!open);
  };
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Box>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "&.MuiDrawer-root": {
            position: "relative",
            "& > .MuiPaper-root": {
              overflow: "visible",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              border: "none",
              padding: open ? "24px 24px 0px 24px" : 0,
              width: open ? "200px" : "65px",
              "& > div:first-of-type": {
                display: "flex",
                justifyContent: "center !important",
                alignItems: "center",
                width: "100%",
                marginBottom: open ? "2.2rem" : 0,
                "& .MuiBox-root": {
                  width: "66%",
                  "& img": {
                    width: "100%",
                  },
                },
              },
            },
          },
        }}
      >
        <DrawerHeader>
          <Box onClick={handleDrawer}>
            <img
              src={logoRes}
              alt="logo"
              style={{ width: open ? "120px" : "30px" }}
            />
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          <Box sx={{ marginTop: "10px" }}>
            {menuItems.map((item) => (
              <ListItem
                button
                component={StyledNavLink}
                activeClassName={activeClassName}
                to={`/admin/${item.id}`}
                onClick={() => handleSelectItem(item.id)}
                sx={{
                  borderRadius: "0.8rem",
                  backgroundColor:
                    selectedItem === item.id ? "#4E8D7C" : "transparent",
                  color: selectedItem === item.id ? "#fff" : "black",
                  "&:hover": {
                    backgroundColor:
                      selectedItem === item.id ? "#4E8D7C" : "e0e0e0",
                  },
                  mb: 1,
                }}
              >
                <ListItemIcon>
                  <item.Icon fontSize="small" />{" "}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItem>
            ))}
          </Box>
        </List>
        <Box className={classes.sidebarFooter}>
          <CopyrightMini />
        </Box>
        <DrawerHeader>
          <IconButton className={classes.iconButtonRoot} onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </Box>
  );
};

export default SideBar;
