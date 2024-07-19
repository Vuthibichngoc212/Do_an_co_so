import { Card, Box, Typography } from "@mui/material";

interface HotOrderCardProps {
  name: string;
  price: number;
  image: string;
  orderCount: number;
  rank: number;
}

const HotOrderCard: React.FC<HotOrderCardProps> = ({
  name,
  price,
  image,
  orderCount,
  rank,
}) => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 7,
        boxShadow: "none",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{ bgcolor: "#eee", p: 1, borderRadius: 2, mr: 2 }}
        >
          #{rank}
        </Typography>
      </Box>
      <Box
        component="img"
        src={image}
        sx={{
          width: 70,
          height: 70,
          borderRadius: "30%",
          ml: "auto",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "space-between",
          gap: 2,
          ml: 2,
          flex: 1,
        }}
      >
        <Typography variant="h6" sx={{ color: "initial", fontWeight: "bold" }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="initial">
            ${price}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            Order{" "}
            <Typography variant="body1" color="initial" ml={1}>
              {orderCount}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default HotOrderCard;
