import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EventContext } from '../context/event';

const DeleteConfirmation = ({ id }) => {
  const { allEvents, setAllEvents, filteredEvents, setFilteredEvents, setEventInfo } = useContext(EventContext)
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
      const familyList = allEvents.filter(evnt => evnt.id !== id)
      setAllEvents(familyList)
      const filteredList = filteredEvents.filter(evnt => evnt.id !== id)
      setFilteredEvents(filteredList)
      setEventInfo(false)
      setOpen(false)
    } else {
      console.log(data.error)
      setOpen(false)
    }
  }

  return (
    <>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
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