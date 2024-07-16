import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  imgHeader: {
    width: "100%",
    height: "220px",
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginBottom: "16px",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "48px",
    textAlign: "center",
    lineHeight: "140%",
  },
  textContent: {
    textAlign: "center",
    paddingBottom: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    lineHeight: 2,
  },
  textContentImg: {
    width: "70%",
    paddingBottom: "40px",
    lineHeight: "200%",
    fontSize: "18px",
    textAlign: "center",
    color: "#fff",
    margin: "0 auto",
    backgroundColor: "grey",
  },
}));

export default useStyles;
