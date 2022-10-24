import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const CalendarModule = ({ events }) => {
  // const events = [
  //   {
  //     id: 1,
  //     title: 'The Title', // a property!
  //     start: '2022-10-02T00:00:00', // a property!
  //     end: '2022-10-05T00:00:00', // a property! 
  //     allDay: false,

  //   }
  // ]

  return (
    <div>
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
    </div>
  )
}

export default CalendarModule