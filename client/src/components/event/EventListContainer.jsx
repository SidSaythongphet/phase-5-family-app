import React from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Paper, Typography, Stack } from '@mui/material';

const EventListContainer = ({ user, events }) => {
  // filter events to current user
  const myEvents = events.filter(event => event.user_id === user.id)
  return (
    <Paper elevation={2} sx={{ margin: 1, height: "40vh"}} >
        <FullCalendar 
          plugins={[ listPlugin ]}
          headerToolbar=''
          initialView="timeline"
          views={{
            timeline: {
            type: "list",
            duration: { days: 10 }
          }}}
          events={ myEvents }
          eventClick={ e => console.log(e.event) }
          height="40vh"
          contentHeight="100%"
        />
    </Paper>
  )
}

export default EventListContainer