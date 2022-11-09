import React from 'react'
import Grid from '@mui/material/Grid'
import CalendarContainer from '../calendar/CalendarContainer'
import EventListContainer from '../event/EventListContainer'
import EventInfoContainer from '../event/EventInfoContainer'
import FamilyContainer from '../family/FamilyContainer'
import NewEventButton from '../event/NewEventButton'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom'



const FamilyHome = ({ }) => {
  
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: user.color,
  //     },
  //   },
  // })

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
        <Grid container maxHeight="100vh" spacing={1}>
          <Grid item xs={3} container maxHeight="100vh">

            <Grid item xs={12} container alignContent="start" justifyContent="center">
              <Grid item xs={12} container justifyContent="center">
                <NewEventButton />
              </Grid>
              <Grid item xs={12}>
                <EventListContainer />
              </Grid>
              <Grid item xs={12}>
                <EventInfoContainer />
              </Grid>
            </Grid>

            <Grid item xs={12} container alignItems="flex-end">
              Tasks
            </Grid>

          </Grid>
          <Grid item xs={8} >
            <CalendarContainer />
          </Grid>
          <Grid item xs={1} container maxHeight="90vh" justifyContent="center" alignContent="center">
            <FamilyContainer />
          </Grid>
        </Grid>
        <Outlet />
      {/* </ThemeProvider> */}
    </>
  )
}

export default FamilyHome