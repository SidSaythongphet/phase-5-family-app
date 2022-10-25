import { Grid, Stack } from '@mui/material'
import React from 'react'
import CalendarModule from '../calendar/CalendarModule'
import EventListModule from '../calendar/EventListModule'
import DatePickerModule from '../event/DatePickerModule'
import UserLogin from '../session/UserLogin'

const Home = ({ user, family, familyMembers, setUser, onAddMember, events, onAddEvent }) => {
  return (
    <>
      { family ? <UserLogin user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ onAddMember }/> : null }
      <Grid container spacing={2}>
        <Grid item xs={3} container>
          <Stack justifyContent="space-evenly">
            <EventListModule events={ events } />
            <DatePickerModule onAddEvent={ onAddEvent } />
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <CalendarModule events={ events } />
        </Grid>
        <Grid item xs={1}>
          <div>Family</div>
        </Grid>
      </Grid>
    </>
  )
}

export default Home