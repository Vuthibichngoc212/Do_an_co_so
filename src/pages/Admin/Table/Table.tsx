import { Box, Typography } from "@mui/material";
import TableOfTable from "../../../components/organisms/Table/TableOfTable";

export default function Table() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" color="initial">
          Table
        </Typography>
      </Box>
      <TableOfTable />
    </Box>
  );
}
