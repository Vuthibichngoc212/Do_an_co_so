import { Card, Typography, Box, CircularProgress } from "@mui/material";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import Divider from "@mui/material/Divider";
import HotOrderCard from "../HotOrderCard/HotOrderCard";
import { useGetHotMenuQuery } from "../../../../../redux/api/api.caller";

export default function HotOrder() {
  const { data, error, isLoading } = useGetHotMenuQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load data</Typography>;
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

      {data?.data.menuItemResponseList?.slice(0, 5).map((item, index) => (
        <div key={item.id}>
          <HotOrderCard
            name={item.itemName}
            price={item.price}
            image={item.image}
            orderCount={10}
            rank={index + 1}
          />
          <Divider />
        </div>
      ))}
    </Card>
  );
}
