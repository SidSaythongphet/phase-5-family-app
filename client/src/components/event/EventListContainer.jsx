import React from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Paper, Skeleton } from '@mui/material';
import { useContext } from 'react';
import { EventContext } from '../context/event';
import { UserContext } from '../context/user';

const EventListContainer = () => {
  const { allEvents } = useContext(EventContext)
  const { user } = useContext(UserContext)

  if (!user) return <Skeleton />

  const userEvents = allEvents.filter(evnt => evnt.user_id === user.id)

  return (
    <Paper elevation={2} sx={{ margin: 1, width: "100%", height: "25vh"}} >
        <FullCalendar 
          plugins={[ listPlugin ]}
          headerToolbar=''
          initialView="timeline"
          views={{
            timeline: {
            type: "list",
            duration: { days: 7 }
          }}}
          events={ userEvents }
          // eventClick={ e => console.log(e.event) }
          height="25vh"
          contentHeight="100%"
        />
    </Paper>
  )
}

export default EventListContainer