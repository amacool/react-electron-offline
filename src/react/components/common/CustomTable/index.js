import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import React from "react";

export const CustomTable = ({ header, data }) => (
  <Table className="custom-table">
    <TableHead>
      <TableRow>
        {header.map((item, index) => (
          <TableCell align="left" key={index}>{item}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          {Object.keys(row).map((item, index) => (
            <TableCell align="left" key={index}>{row[item]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);