import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IMenuItem } from "../../../../types/menu";
import { useGetCategoryQuery } from "../../../../redux/api/api.caller";
import { ICategoryItem } from "../../../../types/category";
import { SelectChangeEvent } from "@mui/material";
import CustomSnackbar from "../../../../components/organisms/snashbarMessage/CustomSnackbar";
import { useUpdateMenuMutation } from "../../../../redux/api/api.caller";
import { useState, useEffect } from "react";

interface EditMenuItemProps {
  open: boolean;
  onClose: () => void;
  item: IMenuItem | null;
  onSave: (item: IMenuItem) => void;
  isAddMode?: boolean;
}

const EditMenuItem: React.FC<EditMenuItemProps> = ({
  open,
  onClose,
  item,
  onSave,
  isAddMode = false,
}) => {
  const initialFormData: IMenuItem = item || {
    id: 0,
    itemName: "",
    price: 0,
    image: "",
    category: "",
  };

  const [formData, setFormData] = React.useState<IMenuItem>(initialFormData);
  const { data: categoryData } = useGetCategoryQuery();
  const categories = categoryData?.data.categories || [];

  const [updateMenu] = useUpdateMenuMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setFormData(item || initialFormData);
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      category: e.target.value as string,
    });
  };

  const handleSave = async () => {
    if (isAddMode) {
      onSave(formData);
    } else {
      try {
        let menuItemData = {
          itemName: formData.itemName,
          price: formData.price,
          image: formData.image,
          categoryName: formData.category,
        };
        await updateMenu({
          menuId: formData.id,
          menuItem: menuItemData,
        }).unwrap();
        onSave(formData); // Call the onSave function from props for updating
        setSnackbarMessage("Updated successfully!");
        setSnackbarSeverity("success");
        onClose(); // Close dialog after successful update
      } catch (error) {
        setSnackbarMessage("Failed to update.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {isAddMode ? "Add Menu Item" : "Edit Menu Item"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              label="Item Name"
              name="itemName"
              fullWidth
              value={formData.itemName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Image URL"
              name="image"
              fullWidth
              value={formData.image}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={handleSelectChange}
                fullWidth
              >
                {categories.map((category: ICategoryItem) => (
                  <MenuItem key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isAddMode ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default EditMenuItem;
