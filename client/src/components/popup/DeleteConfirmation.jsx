import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteConfirmation = ({ id, onDeleteEvent }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDelete = async () => {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE"
    })

    const data = await response.json()
    if (response.ok) {
      onDeleteEvent(id)
      setOpen(false)
    } else {
      console.log(data.error)
      setOpen(false)
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Cancel Event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-delete-confirmation-title"
        aria-describedby="alert-dialog-delete-confirmation-description"
      >
        <DialogTitle id="alert-dialog-delete-confirmation-title">
          Would you like to cancel this event?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete-confirmation-description">
            Event will be deleted. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Keep Event</Button>
          <Button variant="contained" onClick={ handleDelete }>
            Cancel Event
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteConfirmation