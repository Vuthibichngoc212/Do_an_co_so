import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  sidebarFooter: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: "25px",
    right: 0,
    width: "100%",
    minHeight: "48px",
    backgroundColor: "#4E8D7C",
    boxShadow:
      "0px 0px 1px 0px rgb(244, 244, 244), 0px 2px 6px 2px rgb(60, 64, 67, 0.15)",
  },
  iconButtonRoot: {
    "&.MuiIconButton-root": {
      position: "absolute",
      padding: "3px",
      backgroundColor: "#4E8D7C",
      color: "#FFFFFF",
      bottom: "5.5rem",
      right: 0,
      transform: "translateX(50%)",
      zIndex: 999,
      "&:hover": {
        backgroundColor: "#4E8D7C",
      },
    },
  },
}));
