import { Grid, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { TaskContext } from '../context/task'
import TaskItem from './TaskItem'
import DoneIcon from '@mui/icons-material/Done';


const TaskContainer = () => {
  const { familyTasks, userTasks } = useContext(TaskContext)

  return (
    <Paper elevation={2} sx={{ border: 4, height: "96%", borderRadius: 4, padding: "2%" }}>
      <Grid container justifyContent="space-between">
        <Grid item md={10} xs={6}>
          <Typography>Family Tasks:</Typography>
        </Grid>
        <Grid item container md={2} xs={6} textAlign="right">
          <Grid item md={6}><DoneIcon/></Grid>
        </Grid>
      </Grid>
        {
          familyTasks.map((task) => {
            return (
              <TaskItem key={task.id} task={task}/>
            )
          })
        }
      <Typography>My Tasks:</Typography>
        {
          userTasks.map((task) => {
            return (
              <TaskItem key={task.id} task={task}/>
            )
          })
        }
    </Paper>
  )
}

export default TaskContainer