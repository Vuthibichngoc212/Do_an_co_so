import { Card, Box, Typography, Divider } from "@mui/material";
import React from "react";

interface BasicCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
}

const BasicCard: React.FC<BasicCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 7,
        boxShadow: "#00000014 0px 3px 14px 0px",
        border: "1px solid #eee",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            boxShadow: "#00000014 0px 3px 14px 0px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 2,
            width: 50,
            height: 50,
          }}
        >
          {/* Ensure Icon is used correctly, it should be a component */}
          <Icon />
        </Box>
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" color="initial">
          {subtitle}
        </Typography>
      </Box>
    </Card>
  );
};

export default BasicCard;
