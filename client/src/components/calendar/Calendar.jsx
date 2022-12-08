import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Paper, Skeleton } from '@mui/material'
import timeGridPlugin from '@fullcalendar/timegrid';
import { useContext } from 'react';
import { FamilyContext } from '../context/family';

const Calendar = ({ left='prev,next today', right='dayGridMonth,timeGridWeek,timeGridDay', allEvents, filteredEvents, eventInfo, setEventInfo, pastEvents, hidePast }) => {
  const { members } = useContext(FamilyContext)

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

  if (!allEvents || allEvents.errors ) return <Skeleton height="100%" width="90%"/>

  const renderEvents = () => {
    if (hidePast) {
      return [...filteredEvents]
    } else {
      return [...filteredEvents, ...pastEvents]
    }
  }

  return (
    <Paper elevation={2} sx={{ height: "100%", width: "100%" }}>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin  ]}
        initialView="dayGridMonth"
        views={{
          dayGrid: {
            dayMaxEventRows: true,
            fixedWeekCount: false,
            height: "auto",
            contentHeight: 1000
          }
        }}
        headerToolbar={{
          left: left,
          center: 'title',
          right: right
        }}
        allDaySlot={ false }
        events={  renderEvents() }
        eventDisplay="block"
        eventClick={ handleSelectEvent }
        height="100%"
      />
    </Paper>
  )
}

export default Calendar