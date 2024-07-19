import { Box, Button, Typography } from "@mui/material";
import TableOfTable from "./TableOfTable";
import { useState } from "react";
import AddTableDialog from "./AddTableDialog/AddTableDialog";

export default function Table() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" color="initial">
          Table
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: "#4E8D7C",
            textTransform: "none",
            "&:hover": { backgroundColor: "#3A6B5D" },
          }}
        >
          Thêm bàn
        </Button>
      </Box>
      <TableOfTable />
      <AddTableDialog open={openDialog} onClose={handleCloseDialog} />
    </Box>
  );
}
