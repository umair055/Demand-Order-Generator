import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const TableOfDemandedProducts = ({ DemandedProducts }) => {
  return (
    <Table sx={{ mt: 8 }}>
      <TableHead>
        <TableRow>
          <TableCell>Sr. No.</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>UOM</TableCell>
          <TableCell>Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {DemandedProducts.map((item, index) => (
          <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.Name}</TableCell>
            <TableCell>{item.Unit}</TableCell>
            <TableCell>{item.Quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableOfDemandedProducts;
