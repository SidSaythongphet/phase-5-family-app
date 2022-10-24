import React from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';

const EventListModule = ({ events }) => {
  return (
    <div>
      <FullCalendar 
        plugins={[ listPlugin ]}
        headerToolbar='false'
        initialView="listWeek"
        events={ events }
        eventClick={ e => console.log(e.event) }
      />
    </div>
  )
}

export default EventListModule