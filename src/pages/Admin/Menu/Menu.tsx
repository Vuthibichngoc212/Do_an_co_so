import { Box, Typography } from "@mui/material";
import MenuTable from "./components/Table/MenuTable";
export default function Menu() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" color="initial">
          Menu
        </Typography>
      </Box>
      <MenuTable />
    </Box>
  );
}
