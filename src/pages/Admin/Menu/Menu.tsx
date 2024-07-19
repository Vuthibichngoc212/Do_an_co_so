import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import MenuTable from "./components/MenuTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddMenuItem from "./components/AddMenuItem";
import { IMenuItem } from "../../../types/menu";
import { useAddMenuMutation } from "../../../redux/api/api.caller";
import CustomSnackbar from "../../../components/organisms/snashbarMessage/CustomSnackbar";
import { useGetMenuQuery } from "../../../redux/api/api.caller";

export default function Menu() {
  const [openDialog, setOpenDialog] = useState(false);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const { data: menuData, refetch } = useGetMenuQuery();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const [addMenuMutation, { isLoading }] = useAddMenuMutation();

  const handleAddMenuItem = (newMenuItem: {
    itemName: string;
    price: number;
    image: string;
    category: string;
  }) => {
    const menuItemData = {
      itemName: newMenuItem.itemName,
      price: newMenuItem.price,
      image: newMenuItem.image,
      categoryName: newMenuItem.category,
    };
    console.log("Adding menu item:", menuItemData);
    addMenuMutation(menuItemData)
      .then(() => {
        setSnackbarMessage("Added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        handleCloseDialog();
        refetch();
      })
      .catch((error) => {
        setSnackbarMessage("Error adding menu item!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Error adding menu item:", error);
        // Handle error as needed
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" color="initial">
          Menu
        </Typography>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="contained"
          onClick={handleOpenDialog}
        >
          Add
        </Button>
      </Box>
      <MenuTable />
      <AddMenuItem
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleAddMenuItem}
      />
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
