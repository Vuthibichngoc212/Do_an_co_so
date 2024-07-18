import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IEmployee } from "../../../../types/employee";
import { useCreateUsersMutation } from "../../../../redux/api/api.caller";

export interface Props {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  product: IEmployee | null;
}

const EmployeesDialog = ({ open, onClose, mode }: Props) => {
  const [addEmployees] = useCreateUsersMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEmployee>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      role: 1,
    },
  });
  const title = mode === "add" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm";

  const onSubmit = async (employeeData: IEmployee) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await addEmployees(employeeData).then((data: any) => {
      if (data?.data) {
        toast.success("Thêm nhân viên thành công", {
          position: "bottom-right",
          autoClose: 1000,
          theme: "colored",
        });
        reset();
        onClose();
      } else {
        toast.error("Thêm nhân viên thất bại", {
          theme: "colored",
          autoClose: 1000,
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              placeholder="User Name"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              {...register("username", { required: "User Name là bắt buộc" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              placeholder="Password"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              {...register("password", { required: "Password là bắt buộc" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              placeholder="Name"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              {...register("name", { required: "Tên nhân viên là bắt buộc" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              placeholder="Email"
              margin="dense"
              fullWidth
              variant="outlined"
              {...register("email", { required: "Email là bắt buộc" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              placeholder="Phone Number"
              margin="dense"
              fullWidth
              variant="outlined"
              {...register("phoneNumber", {
                required: "Số điện thoại là bắt buộc",
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
            <TextField
              placeholder="Adress"
              margin="dense"
              fullWidth
              variant="outlined"
              {...register("address", {
                required: "Địa chỉ là bắt buộc",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <DialogActions>
              <Button onClick={onClose}>Đóng</Button>
              <Button type="submit" variant="contained" color="primary">
                Đồng ý
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeesDialog;
