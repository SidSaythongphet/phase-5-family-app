import React, { useState, useEffect, useContext } from 'react'
import Grid from '@mui/material/Grid'
import TaskListContainer from '../task/TaskListContainer'
import NewTaskButton from '../task/NewTaskButton'
import { UserContext } from '../context/user'
import { createTheme, ThemeProvider } from '@mui/material'
import NewTaskForm from './NewTaskForm'

const TaskContainer = () => {
  const { user } = useContext(UserContext)
  const [familyTasks, setFamilyTasks] = useState([])
  const [userTasks, setUserTasks] = useState([])
  const [open, setOpen] = useState(false)

  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks')
      const data = await response.json()
      // if (response.ok) {
        setFamilyTasks(data.family_tasks)
        setUserTasks(data.user_tasks)
        // }
      }
    fetchTasks()
  }, [user])
    
  if (!user) return null

  console.log("Family Tasks:", familyTasks)
  console.log("User Tasks", userTasks)

  const theme = createTheme({
    palette: {
      primary: {
        main: user.color,
      },
    },
  })

  const handleAddTask = (newTask) => {
    if (newTask.task_for_type === "Family") {
      setFamilyTasks([...familyTasks, newTask])
    } else if (newTask.task_for_type === "User") {
      setUserTasks([...userTasks, newTask])
    }
  }

  const handleDeleteTask = (deletedTask) => {
    if (deletedTask.task_for_type === "Family") {
      const filterFamilyTasks = familyTasks.filter(tsk => tsk.id !== deletedTask.id)
      setFamilyTasks(filterFamilyTasks)
    } else if (deletedTask.task_for_type === "User") {
      const filterUserTasks = userTasks.filter(tsk => tsk.id !== deletedTask.id)
      setUserTasks(filterUserTasks)
    }
  }

  return (
    <>
      <ThemeProvider theme={ theme }>
        <Grid item xs={12} container justifyContent="center" height="50%" alignContent="flex-start">
          <Grid item xs={6} container justifyContent="center" height="10%" sx={{ margin: .5 }}>
            <NewTaskButton setOpen={ setOpen }/>
          </Grid>
          <Grid container item xs={12}  sx={{ margin: .5, marginTop: 0, marginBottom: 0, height: "50vh" }}>
            <Grid item xs={6} sx={{ paddingRight: .5 }}>
              <TaskListContainer type="User" tasks={ userTasks } onDeleteTask={ handleDeleteTask }/>
            </Grid>
            <Grid item xs={6} sx={{ paddingLeft: .5 }}>
              <TaskListContainer type="Family" tasks={ familyTasks } onDeleteTask={ handleDeleteTask }/>
            </Grid>
          </Grid>
        </Grid>
        <NewTaskForm open={ open } setOpen={ setOpen } onAddTask={ handleAddTask }/>
      </ThemeProvider>
    </>
  )
}

export default TaskContainer