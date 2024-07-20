import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../../redux/api/api.caller";
import { IEmployee } from "../../../types/employee";
import ReusableTable from "./TableControl";
import EmployeesDialog from "./EmployeesDialog/EmployeesDialog";
import { toast, ToastContainer } from "react-toastify";
import { Box, Divider } from "@mui/material";
import LazyLoading from "../../../components/LazyLoading";

const Employees = () => {
  const { data: response, refetch, isLoading } = useGetUsersQuery();
  const [deleteUsers] = useDeleteUsersMutation();
  const employees: IEmployee[] = response?.data.userResponses || [];

  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedUsers, setSelectedUsers] = useState<IEmployee | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleAddEmployees = () => {
    setMode("add");
    setSelectedUsers(null);
    setOpenDialog(true);
  };

  const handleEditEmployees = (users: IEmployee) => {
    setMode("edit");
    setSelectedUsers(users);
    setOpenDialog(true);
  };

  const handleDeleteEmployees = async () => {
    if (!selectedUserId) return;
    try {
      await deleteUsers(selectedUserId).unwrap();
      toast.success("Xóa nhân viên thành công", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
      });
      refetch();
      setOpenDeleteDialog(false);
    } catch (error) {
      toast.error("Xóa nhân viên thất bại", {
        theme: "colored",
        autoClose: 1000,
        position: "bottom-right",
      });
    }
  };

  const handleOpenDeleteDialog = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUserId(null);
    setSelectedUserName(null);
    setOpenDeleteDialog(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEmployees = employees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <LazyLoading />
      ) : (
        <ReusableTable
          columns={[
            "STT",
            "UserName",
            "Full Name",
            "Email",
            "Phone",
            "Adress",
            "Thao tác",
          ]}
          onClickAddEmployees={handleAddEmployees}
          columnWidths={["5%", "10%", "20%", "20%", "15%", "20%", "10%"]}
          columnAlignments={[
            "center",
            "center",
            "center",
            "center",
            "center",
            "center",
            "center",
          ]}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          count={employees.length}
        >
          {paginatedEmployees.length > 0 &&
            paginatedEmployees.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {user.username}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {user.fullname}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {user.phoneNumber}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {user.address}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Tooltip title="Edit">
                    <IconButton
                      sx={{
                        color: "#4E8D7C",
                        "&:hover": {
                          color: "#3A6B5D",
                        },
                        "&:active": {
                          color: "#4E8D7C",
                        },
                      }}
                    >
                      <BorderColorOutlinedIcon
                        onClick={() => handleEditEmployees(user)}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      sx={{
                        color: "rgb(219, 40, 40)",
                        "&:hover": {
                          color: "rgb(179, 33, 33)",
                        },
                        "&:active": {
                          color: "rgb(219, 40, 40)",
                        },
                      }}
                    >
                      <DeleteOutlineIcon
                        onClick={() =>
                          handleOpenDeleteDialog(user.id, user.fullname)
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </ReusableTable>
      )}
      <EmployeesDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        mode={mode}
        users={selectedUsers}
      />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <Box sx={{ padding: "24px" }}>
          <DialogTitle
            sx={{
              textAlign: "center",
              padding: "0px 0px 16px 0px",
              fontWeight: "bold",
            }}
          >
            Xóa nhân viên
            <IconButton
              aria-label="close"
              onClick={handleCloseDeleteDialog}
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
          <DialogContent>
            <DialogContentText sx={{ color: "black" }}>
              Bạn có chắc chắn muốn xóa nhân viên{" "}
              <strong>{selectedUserName}</strong> này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: "10px 0px 0px" }}>
            <Button
              onClick={handleCloseDeleteDialog}
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
              onClick={handleDeleteEmployees}
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
              Xác nhận
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default Employees;
