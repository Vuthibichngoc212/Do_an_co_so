import { Box } from "@mui/material";
import logoRes from "../../../assets/logoRes.png";

interface Props {
  isMini?: boolean;
}

const CopyrightMini = ({ isMini }: Props) => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 0 auto",
        color: "#fff",
        fontSize: "0.8rem",
        fontWeight: "bold",
        fontFamily: "Inter-Bold",
        lineHeight: 1.43,
      }}
    >
      {!isMini && <img src={logoRes} height={20} width={25} />}
      <span>©{currentYear}</span>
    </Box>
  );
};

export default CopyrightMini;
