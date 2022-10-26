import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Paper } from '@mui/material'


const CalendarModule = ({ events, onSelectEvent }) => {
  let colors = ["grey", "red", "orange", "green", "blue", "purple", "brown"]

  const edit = events.map(ev => {
    ev["color"] = colors[ev.user_id]
    return ev
  })

  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={ edit }
        eventDisplay="block"
        eventClick={ onSelectEvent }
      />
    </Paper>
  )
}

export default CalendarModule