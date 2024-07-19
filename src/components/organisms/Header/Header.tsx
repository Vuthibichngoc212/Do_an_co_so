import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import flag_uk from "../../../assets/Flag_of_the_United_Kingdom.svg";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import avt from "../../../assets/avt.jpg";
import styled from "@mui/system/styled";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: "0 0 0 2px #fff",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const StyledIconButton = styled(IconButton)(() => ({
  borderRadius: "10px",
}));
export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "6px 16px",
        borderBottom: "1px solid #e0e0e0",
        borderRadius: "10px",
      }}
    >
      <StyledIconButton aria-label="search" size="medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="#000"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </StyledIconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <StyledIconButton aria-label="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="#000"
            viewBox="0 0 256 256"
          >
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
          </svg>
        </StyledIconButton>
        <StyledIconButton aria-label="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="#000"
            viewBox="0 0 256 256"
          >
            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
          </svg>
        </StyledIconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <StyledIconButton>
          <img src={flag_uk} alt="" style={{ width: "24px", height: "24px" }} />
        </StyledIconButton>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={avt} />
        </StyledBadge>
      </Box>
    </Box>
  );
}
