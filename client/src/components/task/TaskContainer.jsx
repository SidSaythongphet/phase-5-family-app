import React, { useState, useEffect, useContext } from 'react'
import Grid from '@mui/material/Grid'
import TaskListContainer from '../task/TaskListContainer'
import NewTaskButton from '../task/NewTaskButton'
import { UserContext } from '../context/user'
import NewTaskForm from './NewTaskForm'
import { FamilyContext } from '../context/family'
import TabContainer from './TabContainer'

const TaskContainer = () => {
  const { user } = useContext(UserContext)
  const { members } = useContext(FamilyContext)
  const [targetMember, setTargetMember] = useState([])
  const [targetTasks, setTargetTasks] = useState([])
  const [userTasks, setUserTasks] = useState([])
  const [open, setOpen] = useState(false)

  
  useEffect(() => {
    if (!user) return
    const fetchUserTasks = async () => {
      const response = await fetch(`/api/users/${user.id}/tasks`)
      const data = await response.json()
      setUserTasks(data)
      }
    fetchUserTasks()
  }, [user])

  useEffect(() => {
    if (!targetMember.id) return
    const fetchTargetTasks = async () => {
      const response = await fetch(`/api/users/${targetMember.id}/tasks`)
      const data = await response.json()
      setTargetTasks(data)
      }
    fetchTargetTasks()
  }, [targetMember])
    
  if (!user) return null

  const handleAddTask = (newTask) => {
    if (newTask.users.find(u => u.id === user.id)) {
      setUserTasks([...userTasks, newTask])
    }
    if (newTask.users.find(u => u.id === targetMember.id)) {
      setTargetTasks([...targetTasks, newTask])
    }
  }

  const handleDeleteTask = (deletedTask) => {
    const filterUserTasks = userTasks.filter(tsk => tsk.id !== deletedTask.id)
    setUserTasks(filterUserTasks)
  }

  return (
    <>
      <Grid container justifyContent="center" height="100%" alignContent="flex-start"sx={{ padding: .5 }}>
        <Grid item xs={6} container justifyContent="center" sx={{ height: "6vh", padding: .5 }}>
          <NewTaskButton setOpen={ setOpen }/>
        </Grid>
        <Grid item xs={6} container justifyContent="center" sx={{ height: "6vh", padding: .5, paddingBottom: 0 }}>
          <TabContainer targetMember={ targetMember } setTargetMember={ setTargetMember }/>
        </Grid>
        <Grid container item xs={12}  sx={{ margin: .5, marginTop: 0, marginBottom: 0, height: "80vh" }} justifyContent="center">
          <Grid item xs={6} sx={{ paddingRight: .5 }} >
            <TaskListContainer type="My" tasks={ userTasks } onDeleteTask={ handleDeleteTask }/>
          </Grid>
          <Grid item xs={6} sx={{ paddingLeft: .5 }} >
            { members.length < 2 ? null : <TaskListContainer type="Family" targetMember={ targetMember } tasks={ targetTasks } onDeleteTask={ handleDeleteTask }/> }
          </Grid>
        </Grid>
      </Grid>
      <NewTaskForm open={ open } setOpen={ setOpen } onAddTask={ handleAddTask }/>
    </>
  )
}

export default TaskContainer