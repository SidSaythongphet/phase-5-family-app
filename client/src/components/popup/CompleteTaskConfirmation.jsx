import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CompleteTaskConfirmation = ({ open, setOpen, task }) => {

  const taskTypeTitle = () => {
    if (task.task_for_type === "Family") {
      return "Complete this family task?"
    } else if (task.task_for_type === "User") {
      return "Complete your task?"
    } else {
      return null
    }
  }

  const handleSubmit = async () => {

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({completed: true})
    })

    const data = await response.json()
    if (response.ok) {
      console.log(data)
    } else {
      console.log(data)
    }
  }
  
  return (
    <Dialog
      open={open}

      aria-labelledby="alert-dialog-delete-confirmation-title"
      aria-describedby="alert-dialog-delete-confirmation-description"
    >
      <DialogTitle id="alert-dialog-delete-confirmation-title">
        { taskTypeTitle() }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-delete-confirmation-description">
          { task.title }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={ () => setOpen(false) }>Cancel</Button>
        <Button variant="contained" onClick={ handleSubmit }>
          Complete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CompleteTaskConfirmation