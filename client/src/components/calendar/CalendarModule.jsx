import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Paper } from '@mui/material'


const CalendarModule = ({ events }) => {
  // const edit = events.map(ev => {
  //   if (ev.title === "test1") {
  //     ev["backgroundColor"] = "brown"
  //     return ev
  //   } else {
  //     return ev
  //   }
  // })

  // console.log(edit)

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
        events={ events }
        eventClick={ e => console.log(e.event) }
      />
    </Paper>
  )
}

export default CalendarModule