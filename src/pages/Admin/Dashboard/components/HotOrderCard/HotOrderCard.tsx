import { Card, Box, Typography } from "@mui/material";

const HotOrderCard: React.FC = () => {
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
          #1
        </Typography>
      </Box>
      <Box
        component="img"
        src="https://plus.unsplash.com/premium_photo-1683121324230-2702ea6b47be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzdCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
        sx={{
          width: 70,
          height: 70,
          borderRadius: "30%",
          ml: "auto",
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
          Apple Juice
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="initial">
            $30
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ display: "flex", justifyContent: "space-betweens" }}
          >
            Order{" "}
            <Typography variant="body1" color="initial" ml={1}>
              30
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default HotOrderCard;
