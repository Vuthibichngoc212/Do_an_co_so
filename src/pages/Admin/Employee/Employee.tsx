import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../../redux/api/api.caller";
import { IEmployee } from "../../../types/employee";
import ReusableTable from "../../../components/organisms/TableControl";
import EmployeesDialog from "./EmployeesDialog/EmployeesDialog";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Employees = () => {
  const { data: response, refetch } = useGetUsersQuery();
  const [deleteUsers] = useDeleteUsersMutation();
  const employees: IEmployee[] = response?.data.userResponses || [];

  const [openDialog, setOpenDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedUsers, setSelectedUsers] = useState<IEmployee | null>(null);

  const handleAddProduct = () => {
    setMode("add");
    setSelectedUsers(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (users: IEmployee) => {
    setMode("edit");
    setSelectedUsers(users);
    setOpenDialog(true);
  };

  const handleDeleteProduct = async (userId: string) => {
    try {
      await deleteUsers(userId).unwrap();
      toast.success("Xóa nhân viên thành công", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
      });
      refetch();
    } catch (error) {
      toast.error("Xóa nhân viên thất bại", {
        theme: "colored",
        autoClose: 1000,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
        onClickAddProduct={handleAddProduct}
        columnWidths={["20px", "200px", "200px", "200px", "200px", "100px"]}
      >
        {employees.length > 0 &&
          employees.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon onClick={() => handleEditProduct(user)} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton>
                    <Delete onClick={() => handleDeleteProduct(user.id)} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
      </ReusableTable>
      <EmployeesDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        mode={mode}
        users={selectedUsers}
      />
    </>
  );
};

export default Employees;
