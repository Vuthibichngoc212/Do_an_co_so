import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "black",
    "&.MuiTypography-root": {
      marginBottom: "32px",
      fontWeight: "bold",
    },
  },
  button: {
    "&.MuiButtonBase-root": {
      borderRadius: "8px",
      fontSize: "16px",
      color: "#4B2C20",
      border: "none",
      margin: "0px 8px",
      textTransform: "none",
      backgroundColor: "#D5BBA2",
      "&:hover": {
        outline: "none",
        backgroundColor: "#B89574",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "#4B2C20",
        color: "#fff",
      },
    },
  },
  image: {
    "&.MuiGrid-item": {
      paddingLeft: "30px !important",
      paddingRight: "30px",
      paddingTop: "10px !important",
    },
  },
}));

export default useStyles;
