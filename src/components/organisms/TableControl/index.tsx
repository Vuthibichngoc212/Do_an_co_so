import React, { ReactNode } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';

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
  onClickAddProduct
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ pb: 1 }}>
        <Button variant="contained" color="primary" onClick={onClickAddProduct}>
          Thêm sản phẩm
        </Button>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="customizable table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    // align={index === 0 ? 'left' : 'right'}
                    sx={{
                      fontWeight: 'bold',
                      width: columnWidths[index] || 'auto'
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
