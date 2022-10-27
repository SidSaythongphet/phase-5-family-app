import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Paper } from '@mui/material'
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarContainer = ({ events, onSelectEvent }) => {

  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin  ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        allDaySlot={ false }
        events={ events }
        eventDisplay="block"
        eventClick={ onSelectEvent }
      />
    </Paper>
  )
}

export default CalendarContainer