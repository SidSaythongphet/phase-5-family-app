import { Grid, Stack } from '@mui/material'
import React from 'react'
import CalendarModule from '../calendar/CalendarModule'
import EventListModule from '../calendar/EventListModule'
import DatePickerModule from '../event/DatePickerModule'

const Home = ({ events, onAddEvent }) => {
  return (
    <div>
      Home
      <Grid container>
        <Grid item xs={3} container>
          <Stack>
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
    </div>
  )
}

export default Home