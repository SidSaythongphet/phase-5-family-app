import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Paper, Skeleton } from '@mui/material'
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarContainer = ({ events, onSelectEvent }) => {
  const test = [{
    title: "test",
    start: "2022-11-02T20:00:00.000Z",
    end: "2022-11-03T20:00:00.000Z"
  }]
  console.log(events)
  if (!events) return <Skeleton height="90vh"/>

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
        events={  [...test, ...events] }
        eventDisplay="block"
        eventClick={ onSelectEvent }
      />
    </Paper>
  )
}

export default CalendarContainer