import React from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Paper, Typography, Stack } from '@mui/material';

const EventListContainer = ({ user, events }) => {
  // filter events to current user
  const myEvents = events.filter(event => event.user_id === user.id)
  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <Stack sx={{ margin: 1 }}>
        <Typography textAlign="center">My Events</Typography>
        <FullCalendar 
          plugins={[ listPlugin ]}
          headerToolbar='false'
          initialView="timeline"
          views={{
            timeline: {
            type: "list",
            duration: { days: 10 }
          }}}
          events={ myEvents }
          eventClick={ e => console.log(e.event) }
        />
      </Stack>
    </Paper>
  )
}

export default EventListContainer