import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#4E8D7C",
    color: "#fff",
    padding: "3rem 0",
  },
  colTitle: {
    textTransform: "uppercase",
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#fde8e9",
  },
  contentColTitle1: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    "&:last-child": {
      marginBottom: "0px",
    },
  },
  col2Box: {
    background: "rgba(26, 3, 4, .28)",
    borderRadius: "8px",
    marginBottom: "15px",
    padding: "10px",
    textAlign: "center",
    maxWidth: "200px",
    "&:last-child": {
      marginBottom: "0px",
    },
  },
  col2Title: {
    textTransform: "uppercase",
    marginBottom: "5px",
    color: "#fff",
  },
}));

export default useStyles;
