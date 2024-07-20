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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  columns: string[];
  children: ReactNode;
  columnWidths?: string[];
  columnAlignments?: ("left" | "center" | "right")[];
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
  columnAlignments = [],
  onClickAddEmployees,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  count,
}) => {
  return (
    <Box sx={{ width: "100%", mt: 3, overflow: "auto" }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          startIcon={<AddCircleOutlineIcon />}
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
      <Box
        sx={{
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <Paper
          sx={{
            mb: 2,
            border: "1px solid #ddd",
            borderRadius: "16px",
          }}
        >
          <TableContainer
            sx={{
              borderRadius: "16px",
            }}
          >
            <Table
              sx={{
                borderRadius: "16px",
                "& thead th": {
                  backgroundColor: "#4E8D7C",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                },
                "& tbody td": {
                  border: "1px solid #E0E0E0",
                },
                "& tbody tr": {
                  backgroundColor:
                    "linear-gradient(to right, #f8f8f8, #e7e9ed)",
                },
                "& tbody tr:hover": {
                  backgroundColor: "#e0efe0",
                },
              }}
              aria-label="customizable table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        fontWeight: "bold",
                        width: columnWidths[index] || "auto",
                        textAlign: columnAlignments[index] || "left",
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
