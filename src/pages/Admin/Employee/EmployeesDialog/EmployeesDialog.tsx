import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IEmployee } from "../../../../types/employee";
import {
  useCreateUsersMutation,
  useUpdateUsersMutation,
} from "../../../../redux/api/api.caller";
import { useEffect } from "react";
import { Box, Divider } from "@mui/material";

export interface Props {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  users: IEmployee | null;
}

const EmployeesDialog = ({ open, onClose, mode, users }: Props) => {
  const [addEmployees] = useCreateUsersMutation();
  const [updateEmployees] = useUpdateUsersMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IEmployee>({
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      email: "",
      phoneNumber: "",
      address: "",
      role: 1,
    },
  });

  const title = mode === "add" ? "Thêm nhân viên" : "Chỉnh sửa nhân viên";

  useEffect(() => {
    if (mode === "edit" && users) {
      setValue("username", users.username);
      setValue("password", users.password);
      setValue("fullname", users.fullname);
      setValue("email", users.email);
      setValue("phoneNumber", users.phoneNumber);
      setValue("address", users.address);
    } else {
      reset();
    }
  }, [mode, users, setValue, reset]);

  const onSubmit = async (employeeData: IEmployee) => {
    if (mode === "add") {
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
    } else if (mode === "edit" && users) {
      await updateEmployees({ userId: users.id, ...employeeData }).then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
          if (data?.data) {
            toast.success("Chỉnh sửa nhân viên thành công", {
              position: "bottom-right",
              autoClose: 1000,
              theme: "colored",
            });
            reset();
            onClose();
          } else {
            toast.error("Chỉnh sửa nhân viên thất bại", {
              theme: "colored",
              autoClose: 1000,
              position: "bottom-right",
            });
          }
        }
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ padding: "24px" }}>
          <DialogTitle
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              padding: "0px 0px 16px 0px",
            }}
          >
            {title}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: "10px 0px 0px" }}>
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
              {mode === "edit" && (
                <TextField
                  placeholder="retypePassword"
                  margin="dense"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...register("retypePassword", {
                    required: "retypePassword là bắt buộc",
                  })}
                  error={!!errors.retypePassword}
                  helperText={errors.retypePassword?.message}
                />
              )}
              <TextField
                placeholder="FullName"
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                {...register("fullname", {
                  required: "Tên nhân viên là bắt buộc",
                })}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
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
                placeholder="Address"
                margin="dense"
                fullWidth
                variant="outlined"
                {...register("address", {
                  required: "Địa chỉ là bắt buộc",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <DialogActions sx={{ padding: "10px 0px 0px" }}>
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
                  type="submit"
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
            </form>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default EmployeesDialog;
