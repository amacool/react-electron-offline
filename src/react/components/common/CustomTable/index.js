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
import {
  faSortAmountUp,
  faSortAmountDown,
  faSort,
  faTrashAlt,
  faEye,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Draggable from 'react-draggable';
import "./styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    marginTop: '-33px',
    right: 0,
    height: '33px',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}));

export const CustomTable = ({
  header,
  data,
  handleClick,
  handleRemove,
  getExtraCell,
  updateOrigin,
  originalData,
  sortable = true,
  sortDirection = true,
  selectable = false,
  rowDraggable = false
}) => {
  const [tableItems, setTableItems] = React.useState(data);
  const [isAscending, setIsAscending] = React.useState(sortDirection);
  const [sortBy, setSortBy] = React.useState('');
  const [selected, setSelected] = React.useState([...Array(data.length)].map(() => false));
  const [selectedAll, setSelectedAll] = React.useState(false);
  const [removable, setRemovable] = React.useState(false);
  const [draggable, setDraggable] = React.useState(rowDraggable);

  // drag
  const [positionArr, setPositionArr] = React.useState([]);
  const [newOrder, setNewOrder] = React.useState(-1);
  const [curOrder, setCurOrder] = React.useState(-1);
  const rowHeight = 48;
  const getInitialPosition = (len) => {
    return [...Array(len)].map((item) => ({
      x: 0,
      y: 0
    }));
  };
  React.useEffect(() => {
    setPositionArr(getInitialPosition(tableItems.length));
  }, [tableItems]);
  const onDragStart = (index) => {
    setCurOrder(index);
  };
  const onDragStop = (index) => {
    if (index !== newOrder) {
      let newItems = [...tableItems];
      const firstItem = newItems.splice(index, 1);
      newItems = [...newItems.slice(0, newOrder), firstItem[0], ...newItems.slice(newOrder)];

      // update order property as well!
      newItems.map((item, index) => ({
        ...item,
        order: index + 1
      }));
      setTableItems(newItems);
    }
    // initialize delta position
    setPositionArr(getInitialPosition(tableItems.length));
    setNewOrder(-1);
    setCurOrder(-1);
  };
  const handleDrag = (e, ui, index) => {
    const newPosition = {
      x: 0,
      y: ui.lastY,
    };
    let newPositionArr = [...positionArr];
    newPositionArr[index] = newPosition;

    // monitor order change, update order
    const newOrder = index + (
      newPosition.y >= 0
        ? Math.floor((newPosition.y + 30) / 60.0)
        : -Math.floor((Math.abs(newPosition.y) + 30) / 60.0)
    );
    if (newOrder >= 0 && newOrder < tableItems.length) {
      setNewOrder(newOrder);
    }
    setPositionArr(newPositionArr);
  };

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

    if (updateOrigin) {
      let sortedArr = [...originalData];
      sortedArr.sort((a, b) => {
        return isAscending ? (a[sortBy] > b[sortBy] ? 1 : -1) : (a[sortBy] <= b[sortBy] ? 1 : -1);
      });
      updateOrigin(sortedArr);
    }
  };

  // get index of row in data
  const getOriginalIndex = (row) => {
    return data.findIndex((item) => !Object.keys(row).some(key => row[key] !== item[key]));
  };

  const onChangeSelected = (val, index) => {
    setSelected(selected.map((item, key) => key === index ? val : item));
  };

  const onChangeSelectedAll = (val) => {
    setSelectedAll(val);
    setSelected(selected.map(() => val));
  };

  const onRemoveItems = () => {
    const arr = [];
    selected.forEach((item, index) => {
      if (item) {
        arr.push(index);
      }
    });
    handleRemove(arr);
  };

  const getRowContent = ({ row, index, selectable, selected, isDragPosition }) => (
    <>
      {selectable && (
        <TableCell align="left" key="select-item" style={{ borderBottom: isDragPosition ? 'solid 1px red' : 'solid 1px #e0e0e0' }}>
          <Checkbox
            color="primary"
            onChange={(e) => onChangeSelected(e.target.checked, index)}
            onClick={(e) => e.stopPropagation()}
            value="check"
            checked={selected}
          />
        </TableCell>
      )}
      {Object.keys(row).map((item, index) => (
        <TableCell align="left" key={index} style={{ borderBottom: isDragPosition ? 'solid 1px red' : 'solid 1px #e0e0e0' }}>
          {row[item]}
        </TableCell>
      ))}
      {getExtraCell && (
        <TableCell
          className="drag-disable"
          align="right"
          key='appendix'
          style={{ borderBottom: isDragPosition ? 'solid 1px red' : 'solid 1px #e0e0e0', transform: 'translate(0px, 0px)' }}
        >
          {getExtraCell(getOriginalIndex(row)).content}
        </TableCell>
      )}
    </>
  );

  React.useEffect(() => setTableItems(data), [data]);
  React.useEffect(() => setSelected([...Array(data.length)].map(() => false)), [data]);
  React.useEffect(() => {
    // check if all selected or not
    if (selected.some((item) => !item) || selected.length === 0) {
      setSelectedAll(false);
      setRemovable(false);
    } else {
      setSelectedAll(true);
    }
    // show remove button if more than one is selected
    if (selected.some((item) => item)) {
      setRemovable(true);
    }
  }, [selected]);

  return (
    <Table className="custom-table">
      <TableHead>
        <TableRow>
          {selectable && (
            <TableCell align="left" key="select-all">
              <Checkbox
                color="primary"
                onChange={(e) => onChangeSelectedAll(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                value="check"
                checked={selectedAll}
              />
              {removable && <FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={onRemoveItems} />}
            </TableCell>
          )}
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
          <>
            <Draggable
              axis="y"
              cancel=".drag-disable"
              disabled={!draggable}
              onStart={() => onDragStart(index)}
              onStop={() => onDragStop(index)}
              onDrag={(e, ui) => handleDrag(e, ui, index)}
              position={positionArr[index] ? positionArr[index] : {}}
            >
              <TableRow
                style={{
                  backgroundColor: curOrder === index ? '#d2d2d2' : 'unset',
                  opacity: curOrder === index ? '0.7' : '1'
                }}
                key={row.order}
                onClick={() => handleClick && handleClick(getOriginalIndex(row))}
                onMouseDown={(e) => console.log(e.pageX)}
              >
                {getRowContent({ row, index, selectable, selected: selected[index], isDragPosition: newOrder === index })}
              </TableRow>
            </Draggable>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export const TableBtnEditItem = ({
  onEdit,
  onPreview,
  label1 = "Edit",
  label2 = "Remove",
  label3 = "Preview"
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickAway = () => {
    open && setOpen(false);
  };

  const getIcon = (label) => {
    if (label === 'Edit') {
      return <FontAwesomeIcon icon={faEdit} size="lg" />;
    } else if (label === 'Remove') {
      return <FontAwesomeIcon icon={faTrashAlt} size="lg" />;
    } else if (label === 'Preview') {
      return <FontAwesomeIcon icon={faEye} size="lg" />;
    }
  };

  return (
    <div className='table-btn-edit-item'>
      <div className={classes.root}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Button onClick={(e) => {
              setOpen((open) => !open);
            }}>
              <ThreeDots color='#4eb6ee'/>
            </Button>
            {open ? (
              <Paper className={classes.paper}>
                <div className="dropdown-item" onClick={() => onEdit('edit')}>{getIcon(label1)}</div>
                <div className="dropdown-item" onClick={() => onEdit('remove')}>{getIcon(label2)}</div>
                <div className="dropdown-item" onClick={onPreview}>{getIcon(label3)}</div>
              </Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};
