import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import TaskItem from './TaskItem'
import DoneIcon from '@mui/icons-material/Done';


const TaskListContainer = ({ tasks, type, onDeleteTask }) => {

  return (
    <Paper elevation={2} sx={{ border: 4, borderColor: "primary.light" , minHeight: "50vh", maxHeight: "75vh", borderRadius: 4, padding: "2%", width: "100%" }}>
      <Grid container justifyContent="space-between">
        <Grid item md={10} xs={6}>
          <Typography>{ type } Tasks:</Typography>
        </Grid>
        <Grid item container md={2} xs={6} textAlign="right">
          <Grid item md={6}><DoneIcon/></Grid>
        </Grid>
      </Grid>
        {
          tasks.map((task) => {
            return (
              <TaskItem key={task.id} task={task} onDeleteTask={ onDeleteTask }/>
            )
          })
        }
    </Paper>
  )
}

export default TaskListContainer