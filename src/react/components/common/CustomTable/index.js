import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { ThreeDots } from "../Icons/ThreeDots";
import "./styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    width: '100px',
    zIndex: 1
  }
}));

export const CustomTable = ({ header, data, handleClick, getExtraCell }) => (
  <Table className="custom-table">
    <TableHead>
      <TableRow>
        {header.map((item, index) => (
          <TableCell align="left" key={index}>
            <span>{item}</span>
          </TableCell>
        ))}
        {getExtraCell && <TableCell>{getExtraCell(0).title}</TableCell>}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index} onClick={() => handleClick && handleClick(index)}>
          {Object.keys(row).map((item, index) => (
            <TableCell align="left" key={index}>{row[item]}</TableCell>
          ))}
          {getExtraCell && (
            <TableCell align="right" key='appendix'>{getExtraCell(index).content}</TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const TableBtnEditItem = ({ onEdit }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className='table-btn-edit-item' onClick={() => setOpen(!open)}>
      <div className={classes.root}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Button onClick={() => setOpen(!open)}><ThreeDots color='#4eb6ee'/></Button>
            {open ? (
              <Paper className={classes.paper}>
                <div className="dropdown-item" onClick={() => onEdit('edit')}>Edit</div>
                <div className="dropdown-item" onClick={() => onEdit('remove')}>Remove</div>
              </Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};
