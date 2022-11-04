import React, { useEffect } from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Paper, Skeleton } from '@mui/material';

const EventListContainer = ({ user, events }) => {
  if (!events) return <Skeleton />

  return (
    <Paper elevation={2} sx={{ margin: 1, width: "100%", height: "20vh"}} >
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
          height="20vh"
          contentHeight="100%"
        />
    </Paper>
  )
}

export default EventListContainer