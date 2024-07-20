import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  textField: {
    "& .MuiOutlinedInput-root": {
      padding: "0px",
      "& fieldset": {
        borderColor: "#4E8D7C",
      },
      "&:hover fieldset": {
        borderColor: "#4E8D7C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4E8D7C",
      },
      "& .MuiOutlinedInput-input": {
        color: "black",
        padding: "10px 14px",
      },
    },
  },
}));

export default useStyles;
