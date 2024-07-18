import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useGetUsersQuery } from "../../../redux/api/api.caller";
import { IEmployee } from "../../../types/employee";
import ReusableTable from "../../../components/organisms/TableControl";
import EmployeesDialog from "./EmployeesDialog/EmployeesDialog";
import { useState } from "react";

const AdProductsPage = () => {
  const { data: response } = useGetUsersQuery();
  const employees: IEmployee[] = response?.data.userResponses || [];

  const [openDialog, setOpenDialog] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedProduct, setSelectedProduct] = useState<IEmployee | null>(
    null
  );

  const handleAddProduct = () => {
    setMode("add");
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  // const handleEditProduct = (product: IEmployee) => {
  //   setMode('edit');
  //   setSelectedProduct(product);
  //   setOpenDialog(true);
  // };

  return (
    <>
      <ReusableTable
        columns={[
          "STT",
          "UserName",
          "Name",
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
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton>
                    <Delete />
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
        product={selectedProduct}
      />
    </>
  );
};

export default AdProductsPage;
