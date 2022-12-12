import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserContext } from '../context/user';

const DeleteTaskConfirmation = ({ task, open, setOpen, onDeleteTask }) => {
  const { user } = useContext(UserContext)

  const handleDelete = async () => {
    const response = await fetch(`/api/users/${ user.id }/user_tasks/${task.id}`, {
      method: "DELETE"
    })

    const data = await response.json()
    if (response.ok) {
      onDeleteTask(task)
    } else {
      console.log(data.error)
      setOpen(false)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={ () => setOpen(false) }
        aria-labelledby="alert-dialog-delete-confirmation-title"
        aria-describedby="alert-dialog-delete-confirmation-description"
      >
        <DialogTitle id="alert-dialog-delete-confirmation-title">
          Would you like to cancel this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete-confirmation-description">
            Task will be deleted. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={ () => setOpen(false) }>Keep Task</Button>
          <Button variant="contained" color="error" onClick={ handleDelete }>Cancel Task For Self</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteTaskConfirmation