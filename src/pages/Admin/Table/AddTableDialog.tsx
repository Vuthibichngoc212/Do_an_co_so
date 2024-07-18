import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddTableDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { id: number; status: string }) => void;
}

const AddTableDialog: React.FC<AddTableDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [id, setId] = React.useState<number>(0);
  const [status, setStatus] = React.useState<string>("");

  const handleSubmit = () => {
    onSubmit({ id, status });
    setId(0);
    setStatus("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Table</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="id"
          label="ID"
          type="number"
          fullWidth
          value={id}
          onChange={(e) => setId(parseInt(e.target.value))}
        />
        <TextField
          margin="dense"
          id="status"
          label="Status"
          type="text"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTableDialog;
