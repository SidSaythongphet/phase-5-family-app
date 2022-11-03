import React, { useEffect } from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Paper, Skeleton } from '@mui/material';

const EventListContainer = ({ user, events }) => {
  if (!events) return <Skeleton />

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
          events={ events }
          eventClick={ e => console.log(e.event) }
          height="40vh"
          contentHeight="100%"
        />
    </Paper>
  )
}

export default EventListContainer