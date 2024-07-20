/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { IMenuItem } from "../../../../types/menu";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomSnackbar from "../../../../components/organisms/snashbarMessage/CustomSnackbar";
import {
  useGetMenuQuery,
  useDeleteMenuMutation,
} from "../../../../redux/api/api.caller";
import LazyLoading from "../../../../components/LazyLoading";
function createData(
  id: number,
  itemName: string,
  price: number,
  image: string,
  category: string
): IMenuItem {
  return { id, itemName, price, image, category };
}

const headCells: {
  id: keyof IMenuItem;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}[] = [
  {
    id: "itemName",
    numeric: false,
    disablePadding: false,
    label: "Tên món ăn",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Giá",
  },

  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Phân loại",
  },
];

type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IMenuItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof IMenuItem>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string }
      ) => descendingComparator(a, b, orderBy)
    : (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string }
      ) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IMenuItem) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        bgcolor: "#F9FAFB",
        borderRadius: "16px",
      }}
    >
      <TableRow
        sx={{
          bgcolor: "#F9FAFB",
          borderRadius: "16px",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: "30%",
              textAlign: "center",
              bgcolor: "#F9FAFB",
              fontWeight: "bold",
            }}
          >
            {headCell.id === "category" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
        <TableCell
          sx={{
            textAlign: "center",
            bgcolor: "#F9FAFB",
            fontWeight: "bold",
          }}
        >
          Thao tác
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface MenuTableProps {
  onEditItem: (menuItem: IMenuItem) => void;
}

export default function MenuTable({ onEditItem }: MenuTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IMenuItem>("category");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, error, isLoading } = useGetMenuQuery();
  const [rows, setRows] = useState<IMenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);
  const [deleteMenuMutation] = useDeleteMenuMutation();
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    if (data && data.data && Array.isArray(data.data.menuItemResponseList)) {
      const tableRows = data.data.menuItemResponseList.map((item: IMenuItem) =>
        createData(
          item.id,
          item.itemName,
          item.price,
          item.image,
          item.category
        )
      );
      setRows(tableRows);
    } else if (error) {
      console.error("Failed to fetch tables:", error);
    }
  }, [data, error]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IMenuItem
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = (item: IMenuItem) => {
    onEditItem(item);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  if (isLoading) {
    return <LazyLoading />;
  }

  if (error) {
    return <Typography>Error loading tables</Typography>;
  }
  const handleDelete = (item: IMenuItem) => {
    setSelectedItem(item);
    setConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const selectedId = selectedItem?.id;
      if (selectedId !== undefined) {
        await deleteMenuMutation({ menuId: selectedId });
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedId));
        setSnackbarMessage("Deleted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        console.error("No item selected for deletion.");
      }
    } catch (error) {
      setSnackbarMessage("Error deleting menu item.");
      setSnackbarSeverity("error");
    }
    setConfirmDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteDialog(false);
  };

  return (
    <Box sx={{ width: "100%", borderRadius: 1 }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "16px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        <TableContainer
          sx={{
            borderRadius: "16px",
          }}
        >
          <Table
            sx={{
              minWidth: 750,
              "& thead th": {
                backgroundColor: "#4E8D7C",
                color: "#FFFFFF",
                fontWeight: "bold",
              },
              "& tbody td": {
                border: "1px solid #E0E0E0",
                color: "#333",
              },
              "& tbody tr": {
                backgroundColor: "linear-gradient(to right, #f8f8f8, #e7e9ed)",
              },
              "& tbody tr:hover": {
                backgroundColor: "#f0f7f0",
              },
            }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                      >
                        <Box
                          component="img"
                          src={row.image}
                          alt={row.itemName}
                          sx={{
                            width: "130px",
                            height: "84px",
                            mr: 2,
                            objectFit: "cover",
                            borderRadius: "16px",
                            border: "1px solid #E0E0E0",
                          }}
                        ></Box>
                        {row.itemName}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.price}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.category}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {/* <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip> */}
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
                            onClick={() => handleEdit(row)}
                          />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Delete" onClick={() => handleDelete(row)}>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip> */}
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
                            onClick={() => handleDelete(row)}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={confirmDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ padding: "24px" }}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              textAlign: "center",
              padding: "0px 0px 16px 0px",
              fontWeight: "bold",
            }}
          >
            {"Xóa thực đơn"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "black" }}
            >
              Bạn có chắc chắn muốn xóa thực đơn này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancelDelete}
              variant="outlined"
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
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{
                backgroundColor: "#4E8D7C",
                "&.MuiButton-root": {
                  marginLeft: "20px",
                  textTransform: "none",
                },
                "&:hover": { backgroundColor: "#3A6B5D" },
              }}
              autoFocus
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
