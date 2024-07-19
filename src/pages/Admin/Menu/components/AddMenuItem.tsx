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

interface AddMenuItemProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: IMenuItem) => void;
}

const AddMenuItem: React.FC<AddMenuItemProps> = ({ open, onClose, onSave }) => {
  const initialFormData: IMenuItem = {
    id: 0,
    itemName: "",
    price: 0,
    image: "",
    category: "",
  };

  const [formData, setFormData] = React.useState<IMenuItem>(initialFormData);
  const { data: categoryData } = useGetCategoryQuery();
  const categories = categoryData?.data.categories || [];
  console.log(categories);
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

  const handleSave = () => {
    // Basic validation, you can add more validation as needed
    if (formData.itemName && formData.price && formData.category) {
      onSave(formData); // Call onSave callback with formData
      setFormData(initialFormData); // Reset form data after saving
      onClose(); // Close the dialog after saving
    } else {
      // Handle validation errors (e.g., show error message)
      alert("Please fill out all required fields.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Menu Item</DialogTitle>
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
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            backgroundColor: "#FFF",
            textTransform: "none",
            color: "#4E8D7C",
            borderColor: "#4E8D7C",
            "&:hover": {
              backgroundColor: "#3A6B5D",
              color: "#FFF",
              borderColor: "#3A6B5D",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#4E8D7C",
            textTransform: "none",
            "&:hover": { backgroundColor: "#3A6B5D" },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMenuItem;
