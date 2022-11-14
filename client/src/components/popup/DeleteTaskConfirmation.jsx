import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TaskContext } from '../context/task';

const DeleteTaskConfirmation = ({ task, open, setOpen }) => {
  const { familyTasks, setFamilyTasks, userTasks, setUserTasks } = useContext(TaskContext)

  const handleDelete = async () => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE"
    })

    const data = await response.json()
    if (response.ok) {
      if (task.task_for_type === "Family") {
        const filterFamilyTasks = familyTasks.filter(tsk => tsk.id !== task.id)
        setFamilyTasks(filterFamilyTasks)
      } else if (task.task_for_type === "User") {
        const filterUserTasks = userTasks.filter(tsk => tsk.id !== task.id)
        setUserTasks(filterUserTasks)
      }
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
          <Button variant="contained" onClick={ () => setOpen(false) }>Keep Task</Button>
          <Button variant="contained" onClick={ handleDelete }>
            Cancel Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteTaskConfirmation