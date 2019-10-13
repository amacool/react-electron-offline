import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  heading: {
    padding: '5px',
    borderBottom: 'solid 1px grey'
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
    height: '75%',
    marginBottom: '20px',
    whiteSpace: 'pre-line',
    overflowY: 'auto',
    padding: '0 5px'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export const CustomModal = ({
  isOpen,
  title,
  labelConfirm = "Confirm",
  labelClose = "Close",
  children,
  singleButton,
  onConfirm,
  onClose,
  size = "lg"
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const width = size === "sm" ? "45%" : (size === "md" ? "60%" : "80%");
  const height = size === "sm" ? "45%" : (size === "md" ? "60%" : "80%");

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
        <div className={classes.paper} style={{ width, height }}>
          <h2 className={classes.heading} id="transition-modal-title">{title}</h2>
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