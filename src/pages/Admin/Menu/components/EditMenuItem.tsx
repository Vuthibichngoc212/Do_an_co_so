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
  IconButton,
  Divider,
} from "@mui/material";
import { IMenuItem } from "../../../../types/menu";
import { useGetCategoryQuery } from "../../../../redux/api/api.caller";
import { ICategoryItem } from "../../../../types/category";
import { SelectChangeEvent } from "@mui/material";
import CustomSnackbar from "../../../../components/organisms/snashbarMessage/CustomSnackbar";
import { useUpdateMenuMutation } from "../../../../redux/api/api.caller";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./AddMenuItemDialog/AddMenuItem.style";

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

  const classes = useStyles();
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
        const menuItemData = {
          itemName: formData.itemName,
          price: formData.price,
          image: formData.image,
          categoryName: formData.category,
        };
        await updateMenu({
          menuId: formData.id,
          menuItem: menuItemData,
        }).unwrap();
        onSave(formData);
        setSnackbarMessage("Updated successfully!");
        setSnackbarSeverity("success");
        onClose();
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
        <Box sx={{ padding: "24px" }}>
          <DialogTitle
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              padding: "0px 0px 16px 0px",
            }}
          >
            Chỉnh sửa thực đơn
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 15,
                color: "black",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: "20px 0px" }}>
            <Box component="form">
              <TextField
                className={classes.textField}
                margin="dense"
                placeholder="Item Name"
                name="itemName"
                fullWidth
                value={formData.itemName}
                onChange={handleChange}
              />
              <TextField
                className={classes.textField}
                margin="dense"
                placeholder="Price"
                name="price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={handleChange}
              />
              <TextField
                className={classes.textField}
                margin="dense"
                placeholder="Image URL"
                name="image"
                fullWidth
                value={formData.image}
                onChange={handleChange}
              />
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0px",
                    "& fieldset": {
                      borderColor: "#4E8D7C",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4E8D7C",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4E8D7C",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "black",
                      padding: "10px 14px",
                    },
                  },
                }}
              >
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
          <DialogActions sx={{ padding: "0px" }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                border: "1px solid #4E8D7C",
                color: "#4E8D7C",
                "&.MuiButton-root": {
                  textTransform: "none",
                },
                "&:hover": { backgroundColor: "#f7f7f7" },
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                backgroundColor: "#4E8D7C",
                "&.MuiButton-root": {
                  marginLeft: "20px",
                  textTransform: "none",
                },
                "&:hover": { backgroundColor: "#3A6B5D" },
              }}
            >
              {isAddMode ? "Add" : "Xác nhận"}
            </Button>
          </DialogActions>
        </Box>
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
