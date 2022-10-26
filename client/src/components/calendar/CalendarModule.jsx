import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Paper } from '@mui/material'
import timeGridPlugin from '@fullcalendar/timegrid';




const CalendarModule = ({ events, onSelectEvent }) => {
  let colors = ["grey", "red", "orange", "green", "blue", "purple", "brown"]


  const edit = events.map(ev => {
    ev["color"] = colors[ev.user_id]
    if (new Date(ev.start).toDateString() !== new Date(ev.end).toDateString()) {
      ev["textColor"] = "black"
      ev["display"] = "background"
    }
    return ev
  })


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
        events={ edit }
        eventDisplay="block"
        eventClick={ onSelectEvent }
      />
    </Paper>
  )
}

export default CalendarModule