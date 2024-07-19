import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useGetTableQuery } from "../../../redux/api/api.caller";
import { ITableItem } from "../../../types/table";
import LazyLoading from "../../../components/LazyLoading";

interface Data {
  stt: number;
  id: number;
  status: string;
}

function createData(stt: number, id: number, status: string): Data {
  return { stt, id, status };
}

const headCells: {
  id: keyof ITableItem;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}[] = [
  {
    id: "stt",
    numeric: true,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ITableItem
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

function getComparator<Key extends keyof ITableItem>(
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
    (property: keyof ITableItem) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        borderRadius: "16px",
        bgcolor: "#F9FAFB",
      }}
    >
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: "33.3%", textAlign: "center", bgcolor: "#F9FAFB" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableOfTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("stt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, error, isLoading } = useGetTableQuery();
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    if (data && data.data && Array.isArray(data.data)) {
      const tableRows = data.data.map((table: ITableItem, index: number) =>
        createData(index + 1, table.id, table.status)
      );
      setRows(tableRows);
    } else if (error) {
      console.error("Failed to fetch tables:", error);
    }
  }, [data, error]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  return (
    <Box sx={{ width: "100%", borderRadius: "16px" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "16px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        <TableContainer sx={{ borderRadius: "16px" }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ textAlign: "center" }}
                    >
                      {row.stt}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{row.id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.status}
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
    </Box>
  );
}
