import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ThreeDots } from "../Icons/ThreeDots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountUp, faSortAmountDown, faSort } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    width: '125px',
    zIndex: 1
  }
}));

export const CustomTable = ({ header, data, handleClick, getExtraCell, sortable = true, sortDirection = true }) => {
  const [tableItems, setTableItems] = React.useState(data);
  const [isAscending, setIsAscending] = React.useState(sortDirection);
  const [sortBy, setSortBy] = React.useState('');

  const sortTable = (sortByIndex) => {
    if (!tableItems || tableItems.length === 0) return;

    const sortBy = Object.keys(tableItems[0])[sortByIndex];
    setSortBy(sortByIndex);
    let sortedArr = [...tableItems];
    sortedArr.sort((a, b) => {
      return isAscending ? (a[sortBy] > b[sortBy] ? 1 : -1) : (a[sortBy] <= b[sortBy] ? 1 : -1);
    });
    setTableItems(sortedArr);
    setIsAscending(!isAscending);
  };

  // get index of row in data
  const getOriginalIndex = (row) => {
    return data.findIndex(item => !Object.keys(row).some(key => row[key] !== item[key]));
  };

  React.useEffect(() => setTableItems(data), [data]);

  return (
    <Table className="custom-table">
      <TableHead>
        <TableRow>
          {header.map((item, index) => (
            <TableCell align="left" key={index} onClick={() => sortable && sortTable(index)}>
              <span>{item}</span>
              {sortable && sortBy === index
                ? (
                  isAscending
                    ? <FontAwesomeIcon icon={faSortAmountUp} size="sm" />
                    : <FontAwesomeIcon icon={faSortAmountDown} size="sm" />
                )
                : <FontAwesomeIcon icon={faSort} size="sm" />
              }
            </TableCell>
          ))}
          {getExtraCell && <TableCell>{getExtraCell(0).title}</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableItems.map((row, index) => (
          <TableRow key={index} onClick={() => handleClick && handleClick(getOriginalIndex(row))}>
            {Object.keys(row).map((item, index) => (
              <TableCell align="left" key={index}>{row[item]}</TableCell>
            ))}
            {getExtraCell && (
              <TableCell align="right" key='appendix'>{getExtraCell(getOriginalIndex(row)).content}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const TableBtnEditItem = ({ onEdit, label1 = "Edit", label2 = "Remove" }) => {
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
                <div className="dropdown-item" onClick={() => onEdit('edit')}>{label1}</div>
                <div className="dropdown-item" onClick={() => onEdit('remove')}>{label2}</div>
              </Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};
