import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: '15px',
    width: 200,
  },
  saveButton: {
    backgroundColor: '#4eb6ee',
    color: 'white'
  },
  cancelButton: {
    backgroundColor: '#fffdfc',
    color: 'black'
  },
  modalBody: {
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function CustomModal({ isOpen, defaultTitle, onSave, onCancel }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [title, setTitle] = React.useState(defaultTitle);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onCancel();
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    onSave(title);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Input File Name</h2>
          <div className={classes.modalBody}>
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              value={title}
              onChange={handleChangeTitle}
              margin="normal"
            />
            <div className={classes.modalContainer}>
              <Button
                variant="contained"
                className={classes.saveButton}
                onClick={handleSave}
              >
                SAVE
              </Button>
              <Button
                variant="contained"
                className={classes.cancelButton}
                onClick={handleClose}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}