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
  TablePagination,
} from "@mui/material";

interface Props {
  columns: string[];
  children: ReactNode;
  columnWidths?: string[];
  onClickAddEmployees?: () => void;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  count: number;
}

const ReusableTable: React.FC<Props> = ({
  columns,
  children,
  columnWidths = [],
  onClickAddEmployees,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  count,
}) => {
  return (
    <Box sx={{ width: "100%", mt: 3, overflow: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={onClickAddEmployees}
          sx={{
            backgroundColor: "#4E8D7C",
            textTransform: "none",
            "&:hover": { backgroundColor: "#3A6B5D" },
          }}
        >
          Thêm nhân viên
        </Button>
      </Box>
      <Box>
        <Paper
          sx={{
            mb: 2,
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
          }}
        >
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ReusableTable;
