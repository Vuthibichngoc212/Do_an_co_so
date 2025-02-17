import { Box, Button } from "@mui/material";
import TableOfTable from "./TableOfTable";
import { useState } from "react";
import AddTableDialog from "./AddTableDialog/AddTableDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
      <Box sx={{ my: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          startIcon={<AddCircleOutlineIcon />}
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
