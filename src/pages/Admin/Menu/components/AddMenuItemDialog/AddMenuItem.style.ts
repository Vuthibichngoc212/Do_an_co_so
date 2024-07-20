import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  },
  imageSection: {
    flex: 1.1,
    display: "flex",
    justifyContent: "center",
  },
  formSection: {
    flex: 2,
  },
  uploadLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    width: "150px",
    height: "150px",
  },
  uploadPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #4E8D7C",
    borderRadius: "50%",
    padding: "16px",
    width: "100%",
    height: "100%",
  },
  selectedImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
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
