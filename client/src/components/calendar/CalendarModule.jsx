import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';


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
      CalendarModule
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={ events }
        eventClick={ e => console.log(e.event) }
      />
    </div>
  )
}

export default CalendarModule