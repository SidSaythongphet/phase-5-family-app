import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Paper, Skeleton } from '@mui/material'
import timeGridPlugin from '@fullcalendar/timegrid';
import { useContext } from 'react';
import { EventContext } from '../context/event';
import { FamilyContext } from '../context/family';

const CalendarContainer = () => {
  const { allEvents, filteredEvents, eventInfo, setEventInfo, pastEvents } = useContext(EventContext)
  const { members } = useContext(FamilyContext)

  const test = [{
    title: "test",
    start: "2022-11-02T20:00:00.000Z",
    end: "2022-11-03T20:00:00.000Z", 
    color: "#008000"
  }]

  const handleSelectEvent = (e) => {
    const selectedId = e.event.id
    if (eventInfo && parseInt(eventInfo.id) === parseInt(selectedId)) {
      setEventInfo(null)
      return
    }
    if (pastEvents.find(evnt => parseInt(evnt.id) === parseInt(selectedId))) return
    const selectedEvent = allEvents.find(evnt => parseInt(evnt.id) === parseInt(selectedId))
    const eventsUser = members.find(user => user.id === selectedEvent.user_id)
    selectedEvent.user = eventsUser.name
    setEventInfo({...selectedEvent})
  }

  if (!allEvents || allEvents.errors ) return <Skeleton height="90vh"/>

  return (
    <Paper elevation={2} sx={{ height: "100%", marging: 1 }}>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin  ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        allDaySlot={ false }
        events={  [...filteredEvents, ...pastEvents, ...test] }
        eventDisplay="block"
        eventClick={ handleSelectEvent }
        height="100%"
      />
    </Paper>
  )
}

export default CalendarContainer