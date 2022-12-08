import React from 'react'
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { Grid, Paper, Skeleton, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { FamilyContext } from '../context/family';

const EventListContainer = ({ events, header, eventInfo, setEventInfo }) => {
  const { user } = useContext(UserContext)
  const { members } = useContext(FamilyContext)

  if (!user) return <Skeleton />

  const handleSelectEvent = (e) => {
    const selectedId = e.event.id
    if (eventInfo && parseInt(eventInfo.id) === parseInt(selectedId)) {
      setEventInfo(null)
      return
    }
    // if (pastEvents.find(evnt => parseInt(evnt.id) === parseInt(selectedId))) return
    const selectedEvent = events.find(evnt => parseInt(evnt.id) === parseInt(selectedId))
    const eventsUser = members.find(user => user.id === selectedEvent.user_id)
    selectedEvent.user = eventsUser.name
    setEventInfo({...selectedEvent})
  }


  return (
    <Grid item container xs={12} sx={{ height: "100%", borderRadius: 4  }}>
      <Paper elevation={2} sx={{ width: "100%", height: "100%", borderRadius: 4, border: 4, borderColor: "primary.light" }} >
        <Typography textAlign="center" >{ header }</Typography>
        <Grid item sx={{ height: "90%", marginTop: 1.7 }}>
          <FullCalendar 
            plugins={[ listPlugin ]}
            headerToolbar=''
            initialView="timeline"
            views={{
              timeline: {
                type: "list",
                duration: { days: 5 }
              }}}
            events={ events }
            eventClick={ handleSelectEvent }
            height="100%"
          />
        </Grid>
      </Paper>
    </Grid>
  )
}

export default EventListContainer