import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import React from "react";
import "./styles.css";

export const CustomTable = ({ header, data, handleClick, extraCell }) => (
  <Table className="custom-table">
    <TableHead>
      <TableRow>
        {header.map((item, index) => (
          <TableCell align="left" key={index}>
            <span>{item}</span>
          </TableCell>
        ))}
        {extraCell && <TableCell>{extraCell.title}</TableCell>}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index} onClick={() => handleClick && handleClick(index)}>
          {Object.keys(row).map((item, index) => (
            <TableCell align="left" key={index}>{row[item]}</TableCell>
          ))}
          {extraCell && (
            <TableCell align="left" key='appendix'>{extraCell.content}</TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
