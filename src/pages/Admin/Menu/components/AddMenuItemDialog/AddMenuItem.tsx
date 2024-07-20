/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import useStyles from "./AddMenuItem.style";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  useGetCategoryQuery,
  useGetURLImageMutation,
} from "../../../../../redux/api/api.caller";
import { IMenuItem } from "../../../../../types/menu";
import { useEffect, useState } from "react";

interface AddMenuItemProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  mode: "add" | "edit";
  menuItem?: IMenuItem | null;
}

const AddMenuItem: React.FC<AddMenuItemProps> = ({
  open,
  onClose,
  onSave,
  mode,
  menuItem,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: "",
      price: 0,
      image: "",
      category: "",
    },
  });

  const { data: categoryData } = useGetCategoryQuery();
  const categories = categoryData?.data.categories || [];

  const [getURLImage] = useGetURLImageMutation();
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (menuItem) {
      setValue("itemName", menuItem.itemName);
      setValue("price", menuItem.price);
      setValue("image", menuItem.image);
      setValue("category", menuItem.category);
      setImageURL(menuItem.image);
    } else {
      reset({
        itemName: "",
        price: 0,
        image: "",
        category: "",
      });
      setImageURL("");
    }
    console.log("menuItem", menuItem);
  }, [menuItem, reset, setValue, categories]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await getURLImage(formData).unwrap();
        const url = response.data;

        setImageURL(url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const onSubmit = (data: any) => {
    if (menuItem && menuItem.id) {
      data.id = menuItem.id;
    }
    data.image = imageURL;
    onSave(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ padding: "24px" }}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            padding: "0px 0px 16px 0px",
          }}
        >
          {mode === "add" ? "Thêm thực đơn" : "Chỉnh sửa thực đơn"}
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
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <div className={classes.imageSection}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-file-input"
                type="file"
                onChange={handleFileChange}
              />
              <label
                htmlFor="upload-file-input"
                className={classes.uploadLabel}
              >
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt="Selected"
                    className={classes.selectedImage}
                  />
                ) : (
                  <div className={classes.uploadPlaceholder}>
                    <CloudUploadIcon sx={{ fontSize: 48, color: "#4E8D7C" }} />
                    <Typography variant="body1" sx={{ marginTop: "8px" }}>
                      Upload Photos
                    </Typography>
                  </div>
                )}
              </label>
            </div>
            <Box className={classes.formSection}>
              {imageURL && (
                <TextField
                  className={classes.textField}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={imageURL}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
              <TextField
                className={classes.textField}
                label="Tên thực đơn"
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                {...register("itemName", {
                  required: "Tên thực đơn không được bỏ trống",
                })}
                error={!!errors.itemName}
                helperText={errors.itemName?.message}
              />
              <TextField
                className={classes.textField}
                label="Giá tiền"
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                {...register("price", {
                  required: "Giá tiền không được bỏ trống",
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <FormControl
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                error={!!errors.category}
              >
                <InputLabel id="category-label">Loại thực đơn</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Loại thực đơn không được bỏ trống" }}
                  render={({ field }) => (
                    <Select
                      labelId="category-label"
                      {...field}
                      label="Loại thực đơn"
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category.id}
                          value={category.categoryName}
                        >
                          {category.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontSize: "13px",
                      margin: "5px 0px 0px  14px",
                    }}
                  >
                    {errors.category.message}
                  </p>
                )}
              </FormControl>
            </Box>
          </form>
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
            onClick={handleSubmit(onSubmit)}
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
            {mode === "add" ? "Lưu" : "Xác nhận"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddMenuItem;
