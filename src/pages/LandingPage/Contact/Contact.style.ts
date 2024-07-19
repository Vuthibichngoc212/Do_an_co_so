import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  iconButton: {
    "& svg": {
      fontSize: "2.5rem",
    },
    "&.MuiButtonBase-root": {
      backgroundColor: "#D5BBA2",
      color: "#4B2C20",
      borderRadius: "50%",
      padding: "20px",
      marginBottom: "20px",
    },
  },
  title: {
    fontWeight: "bold",
    color: "#625b5b",
    marginBottom: "15px",
  },
}));

export default useStyles;
