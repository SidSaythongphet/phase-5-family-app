import React from 'react'
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Grid, Paper, Skeleton } from '@mui/material';
import { useContext } from 'react';
import { EventContext } from '../context/event';
import { UserContext } from '../context/user';

const EventListContainer = () => {
  const { allEvents } = useContext(EventContext)
  const { user } = useContext(UserContext)

  if (!user) return <Skeleton />

  const userEvents = allEvents.filter(evnt => evnt.user_id === user.id)

  return (
    <Grid item container alignContent="center" xs={12} sx={{ height: "100%", borderRadius: 4 }}>
      <Paper elevation={2} sx={{ width: "100%", height: "100%", borderRadius: 4 }} >
        <Grid item sx={{ height: "100%", marginTop: 1.7 }}>
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
            height="90%"
            contentHeight="100%"
          />
        </Grid>
      </Paper>
    </Grid>
  )
}

export default EventListContainer