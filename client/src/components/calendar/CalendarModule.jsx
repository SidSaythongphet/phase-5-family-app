import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const CalendarModule = () => {

  return (
    <div>
      CalendarModule
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    </div>
  )
}

export default CalendarModule