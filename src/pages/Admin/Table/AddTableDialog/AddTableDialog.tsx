import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useAddTableMutation } from "../../../../redux/api/api.caller";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            sx={{ textAlign: "center", padding: "0px 0px 16px 0px" }}
          >
            Thêm bàn
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: "20px 0px" }}>
            <TextField
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
                backgroundColor: "#4E8D7C",
                color: "#fff",
                "&.MuiButton-root": {
                  textTransform: "none",
                },
                "&:hover": { backgroundColor: "#3A6B5D" },
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
