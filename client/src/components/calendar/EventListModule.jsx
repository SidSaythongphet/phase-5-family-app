import React from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Paper } from '@mui/material';

const EventListModule = ({ events }) => {
  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <FullCalendar 
        plugins={[ listPlugin ]}
        headerToolbar='false'
        initialView="listWeek"
        events={ events }
        eventClick={ e => console.log(e.event) }
      />
    </Paper>
  )
}

export default EventListModule