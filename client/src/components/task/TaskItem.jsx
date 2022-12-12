import React, { useState } from 'react'
import { IconButton, Checkbox, Grid, Typography } from '@mui/material'
import CompleteTaskConfirmation from '../popup/CompleteTaskConfirmation'
import DeleteTaskConfirmation from '../popup/DeleteTaskConfirmation'
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onDeleteTask, type }) => {
  const [openConfirm, setOpenConfirm]= useState(false)
  const [openDelete, setOpenDelete]= useState(false)

  const disableFamilyTasks = type === "Family" ? true : false

  return (
    <Grid container item xs={12} alignItems="center" justifyContent="space-between" >
      <Grid item xs={10}>
        <Typography sx={{ marginLeft: 2 }}>- { task.title }</Typography>
      </Grid>
      <Grid container item xs={2} justifyContent="flex-end">
        <Grid item xs={6}>
          <Checkbox disabled={ disableFamilyTasks } checked={ task.completed === true ? true : openConfirm } onChange={ () => setOpenConfirm(true) }/>
        </Grid>
        <Grid item xs={6}>
          { disableFamilyTasks ? null : <IconButton onClick={ () => setOpenDelete(true) } sx={{ color: "white", ":hover": {color: "lightgray"} }} disableRipple><DeleteIcon/></IconButton> }
        </Grid>
      </Grid>
      <CompleteTaskConfirmation open={ openConfirm } setOpen={ setOpenConfirm } task={ task } />
      <DeleteTaskConfirmation open={ openDelete } setOpen={ setOpenDelete } task={ task } onDeleteTask={ onDeleteTask } /> 
    </Grid>
  )
}

export default TaskItem