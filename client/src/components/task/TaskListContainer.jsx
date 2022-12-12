import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import TaskItem from './TaskItem'
import DoneIcon from '@mui/icons-material/Done';


const TaskListContainer = ({ tasks, type, onDeleteTask, targetMember }) => {
  const typeStyle = type === "Family" 
    ? { border: 4, borderColor: "black" , height: "100%", borderRadius: 4, borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: "2%", width: "100%" }
    : { border: 4, borderColor: "primary.light" , height: "100%", borderRadius: 4, padding: "2%", width: "100%" }

  const header = () => {
    return (
      <>
        <Grid item md={10} xs={6}>
          <Typography>{ type === "Family" ? targetMember.name : type } Tasks:</Typography>
        </Grid>
        <Grid item container md={2} xs={6} textAlign="right">
          <Grid item md={6}><DoneIcon/></Grid>
        </Grid>
      </>
    )
  }

  return (
    <Paper elevation={2} sx={ typeStyle }>
      <Grid container justifyContent="space-between">
        { tasks.length === 0 ? null : header() }
      </Grid>
        {
          tasks.map((task) => {
            return (
              <TaskItem key={task.id} task={task} onDeleteTask={ onDeleteTask } type={ type }/>
            )
          })
        }
    </Paper>
  )
}

export default TaskListContainer