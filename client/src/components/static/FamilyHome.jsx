import React from 'react'
import Grid from '@mui/material/Grid'
import CalendarContainer from '../calendar/CalendarContainer'
import EventListContainer from '../event/EventListContainer'
import EventInfoContainer from '../event/EventInfoContainer'
import FamilyContainer from '../family/FamilyContainer'
import NewEventButton from '../event/NewEventButton'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom'
import NewTaskForm from '../task/NewTaskForm'
import { TaskProvider } from '../context/task'
import { Button } from '@mui/material'
import TaskContainer from '../task/TaskContainer'
import NewTaskButton from '../task/NewTaskButton'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { UserContext } from '../context/user'



const FamilyHome = () => {
  const { user } = useContext(UserContext)
  
  const theme = () => {
    if (user) {
      const theme = createTheme({
        palette: {
          primary: {
            main: user.color,
          },
        },
      })
      return theme
    } else {
      const theme = createTheme({
        palette: {
          primary: {
            main: "#212121",
          },
        },
      })
      return theme
    }
  }

  return (
    <>
      <ThemeProvider theme={ theme() }>
        <Grid container >
          <Grid container item xs={12} sx={{ height: "93vh" }}>
            <Grid item xs={3} container sx={{ bgcolor: "primary.dark" }} alignContent="flex-start">

              <Grid item xs={12} container justifyContent="center" height="50%" alignContent="flex-start" >
                <Grid item xs={12} container justifyContent="center" height="10%" sx={{ margin: 1, marginTop: 0 }}>
                  <NewEventButton />
                </Grid>
                <Grid item xs={12} height="55%" sx={{ margin: 1, marginTop: 0 }}>
                  <EventListContainer />
                </Grid>
                <Grid item xs={12} height="30%" sx={{ margin: 1, marginTop: 0 }}>
                  <EventInfoContainer />
                </Grid>
              </Grid>

              <Grid item xs={12} container justifyContent="center" height="50%" alignContent="flex-start">
                <Grid item xs={12} container justifyContent="center" height="10%" sx={{ margin: 1 }}>
                  <NewTaskButton />
                </Grid>
                <Grid item xs={12} height="85%" sx={{ margin: 1, marginTop: 0, marginBottom: 0 }}>
                  <TaskProvider>
                    {/* <NewTaskForm /> */}
                    <TaskContainer />
                  </TaskProvider>
                </Grid>
              </Grid>

            </Grid>
            <Grid item container xs={8}>
              <Grid item xs={12} sx={{ margin: 1 }}>
                <CalendarContainer />
              </Grid>
            </Grid>
            <Grid item xs={1} container maxHeight="90vh" justifyContent="center" alignContent="center">
              <FamilyContainer />
            </Grid>
          </Grid>
          <Grid container item xs={12} sx={{ height: "1vh" }}>
            <Box sx={{ height: "1vh", width: "100%", bgcolor: "primary.dark" }} />
          </Grid>
          <Outlet />
        </Grid>
      </ThemeProvider>
    </>
  )
}

export default FamilyHome