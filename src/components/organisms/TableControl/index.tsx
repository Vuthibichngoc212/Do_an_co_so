import React, { ReactNode } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

interface Props {
  columns: string[];
  children: ReactNode;
  columnWidths?: string[];
  onClickAddProduct?: () => void;
}

const ReusableTable: React.FC<Props> = ({
  columns,
  children,
  columnWidths = [],
  onClickAddProduct,
}) => {
  return (
    <Box sx={{ width: "100%", mt: 3, overflow: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={onClickAddProduct}
          sx={{ backgroundColor: "#4E8D7C", textTransform: "none" }}
        >
          Thêm nhân viên
        </Button>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="customizable table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "bold",
                      width: columnWidths[index] || "auto",
                    }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReusableTable;
