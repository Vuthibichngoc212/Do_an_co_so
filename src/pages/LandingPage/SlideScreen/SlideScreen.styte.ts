import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  iconButton: {
    "&.MuiButtonBase-root": {
      position: "absolute",
      left: 0,
      marginLeft: "30px",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      },
      "&:focus": {
        outline: "none",
      },
    },
  },
}));

export default useStyles;
