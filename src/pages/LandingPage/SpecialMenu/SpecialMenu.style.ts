import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#e91a22",
    "&.MuiTypography-root": {
      marginBottom: "32px",
      fontWeight: "bold",
    },
  },
  button: {
    "&.MuiButtonBase-root": {
      borderRadius: "8px",
      fontSize: "16px",
      color: "#620b0e",
      border: "none",
      margin: "0px 8px",
      textTransform: "none",
      backgroundColor: "#f9eccb",
      "&:hover": {
        outline: "none",
        backgroundColor: "#e0b686",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "#e91a22",
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
