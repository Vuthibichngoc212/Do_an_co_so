/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { useState } from "react";
import MenuTable from "./components/MenuTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddMenuItem from "./components/AddMenuItemDialog/AddMenuItem";
import {
  useAddMenuMutation,
  useUpdateMenuMutation,
} from "../../../redux/api/api.caller";
import CustomSnackbar from "../../../components/organisms/snashbarMessage/CustomSnackbar";
import { useGetMenuQuery } from "../../../redux/api/api.caller";
import { IMenuItem } from "../../../types/menu";

export default function Menu() {
  const [openDialog, setOpenDialog] = useState(false);
  const { refetch } = useGetMenuQuery();
  const [selectedMenuItem, setSelectedMenuItem] = useState<any | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
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
    setMode("add");
    setSelectedMenuItem(null);
    setOpenDialog(true);
  };

  const [addMenuMutation] = useAddMenuMutation();
  const [editMenuMutation] = useUpdateMenuMutation();

  const handleSaveMenuItem = (menuItem: IMenuItem) => {
    const menuItemData = {
      itemName: menuItem.itemName,
      price: menuItem.price,
      image: menuItem.image,
      categoryName: menuItem.category,
    };

    if (mode === "add") {
      addMenuMutation(menuItemData)
        .then(() => {
          setSnackbarMessage("Thêm thành công!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          handleCloseDialog();
          refetch();
        })
        .catch((error) => {
          setSnackbarMessage("Lỗi khi thêm thực đơn!");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          console.error("Error adding menu item:", error);
        });
    } else {
      const editPayload = { ...menuItemData, id: menuItem.id };
      editMenuMutation(editPayload)
        .then(() => {
          setSnackbarMessage("Chỉnh sửa thành công!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          handleCloseDialog();
          refetch();
        })
        .catch((error) => {
          setSnackbarMessage("Lỗi khi chỉnh sửa thực đơn!");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          console.error("Error editing menu item:", error);
        });
    }
  };

  const handleEditMenuItem = (menuItem: IMenuItem) => {
    setSelectedMenuItem(menuItem);
    setMode("edit");
    setOpenDialog(true);
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
          Thêm thực đơn
        </Button>
      </Box>
      <MenuTable onEditItem={handleEditMenuItem} />
      <AddMenuItem
        open={openDialog}
        onClose={handleCloseDialog}
        mode={mode}
        onSave={handleSaveMenuItem}
        menuItem={selectedMenuItem}
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
