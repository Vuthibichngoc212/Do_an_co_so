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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { IMenuItem } from "../../../../types/menu";
import EditIcon from "@mui/icons-material/Edit";
import EditMenuItem from "./EditMenuItem";
import CustomSnackbar from "../../../../components/organisms/snashbarMessage/CustomSnackbar";
import {
  useGetMenuQuery,
  useDeleteMenuMutation,
} from "../../../../redux/api/api.caller";
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
    label: "Item Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },

  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
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
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: "33.3%", textAlign: "center", bgcolor: "#F9FAFB" }}
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
          sx={{ width: "33.3%", textAlign: "center", bgcolor: "#F9FAFB" }}
        >
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function MenuTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IMenuItem>("category");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, error, isLoading } = useGetMenuQuery();
  const [rows, setRows] = useState<IMenuItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
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
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleSave = (item: IMenuItem) => {
    // Cập nhật menu item trong state
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === item.id ? item : row))
    );
    setOpenDialog(false);
    setSnackbarMessage("Updated successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
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
    return <Typography>Loading...</Typography>;
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
        console.log("Deleting menu item with id:", selectedId);
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
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" onClick={() => handleDelete(row)}>
                        <IconButton>
                          <DeleteIcon />
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
      <EditMenuItem
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        item={selectedItem}
        onSave={handleSave}
      />
      <Dialog
        open={confirmDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this menu item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            sx={{
              backgroundColor: "#FFF",
              textTransform: "none",
              color: "#4E8D7C",
              borderColor: "#4E8D7C",
              "&:hover": {
                backgroundColor: "#3A6B5D",
                color: "#FFF",
                borderColor: "#3A6B5D",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#4E8D7C",
              textTransform: "none",
              "&:hover": { backgroundColor: "#3A6B5D" },
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
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
