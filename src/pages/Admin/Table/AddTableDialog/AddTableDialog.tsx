import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useAddTableMutation } from "../../../../redux/api/api.caller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";

interface AddTableDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddTableDialog: React.FC<AddTableDialogProps> = ({ open, onClose }) => {
  const [numberOfTables, setNumberOfTables] = useState(1);
  const [addTableMutation] = useAddTableMutation();

  const handleAddTables = () => {
    addTableMutation({ numberOfTable: numberOfTables })
      .unwrap()
      .then(() => {
        toast.success(`${numberOfTables} bàn đã được thêm thành công!`, {
          position: "bottom-right",
          autoClose: 1000,
          theme: "colored",
        });
        onClose();
      })
      .catch(() => {
        toast.error("Thêm bàn thất bại. Vui lòng thử lại sau.", {
          position: "bottom-right",
          autoClose: 1000,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ padding: "24px" }}>
          <DialogTitle
            sx={{
              textAlign: "center",
              padding: "0px 0px 16px 0px",
              fontWeight: "bold",
            }}
          >
            Thêm bàn
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
            <TextField
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
              autoFocus
              margin="dense"
              id="numberOfTables"
              label="Số lượng bàn"
              type="number"
              fullWidth
              value={numberOfTables}
              onChange={(e) => setNumberOfTables(parseInt(e.target.value, 10))}
            />
          </DialogContent>
          <DialogActions sx={{ padding: "0px" }}>
            <Button
              onClick={onClose}
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
              onClick={handleAddTables}
              sx={{
                backgroundColor: "#4E8D7C",
                color: "#fff",
                "&.MuiButton-root": {
                  marginLeft: "20px",
                  textTransform: "none",
                },
                "&:hover": { backgroundColor: "#3A6B5D" },
              }}
            >
              Lưu
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AddTableDialog;
