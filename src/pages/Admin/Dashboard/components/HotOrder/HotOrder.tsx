import { Card, Typography, Box } from "@mui/material";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import Divider from "@mui/material/Divider";
import HotOrderCard from "../HotOrderCard/HotOrderCard";
export default function HotOrder() {
  return (
    <Card
      sx={{
        borderRadius: 7,
        boxShadow: "#00000014 0px 3px 14px 0px",
        border: "1px solid #eee",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
      >
        <WhatshotOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="initial">
          Trending Order
        </Typography>
      </Box>
      <HotOrderCard />
      <Divider></Divider>
      <HotOrderCard />
      <Divider></Divider>

      <HotOrderCard />
      <Divider></Divider>

      <HotOrderCard />
      <Divider></Divider>

      <HotOrderCard />
    </Card>
  );
}
