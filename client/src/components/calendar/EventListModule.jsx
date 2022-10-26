import React from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Paper } from '@mui/material';

const EventListModule = ({ user, events }) => {
  // filter events to current user
  const myEvents = events.filter(event => event.user_id === user.id)
  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <h1>My Events</h1>
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
    </Paper>
  )
}

export default EventListModule