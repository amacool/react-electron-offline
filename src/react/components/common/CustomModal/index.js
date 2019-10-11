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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '70%',
    height: '80%'
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
    height: '85%',
    marginBottom: '20px'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export const CustomModal = ({
  isOpen,
  title,
  labelConfirm,
  labelClose,
  children,
  singleButton,
  onConfirm,
  onClose
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
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
          <h2 id="transition-modal-title">{title}</h2>
          <div className={classes.modalBody}>
            {children}
          </div>
          <div className={classes.modalFooter} style={singleButton && { justifyContent: 'flex-end' }}>
            {!singleButton && (
              <Button
                variant="contained"
                className={classes.saveButton}
                onClick={handleConfirm}
              >
                {labelConfirm}
              </Button>
            )}
            <Button
              variant="contained"
              className={classes.cancelButton}
              onClick={handleClose}
            >
              {labelClose}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};