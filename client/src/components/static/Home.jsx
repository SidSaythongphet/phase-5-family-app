import { Button, Grid, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CalendarContainer from '../calendar/CalendarContainer'
import EventListContainer from '../event/EventListContainer'
import NewEventContainer from '../event/NewEventContainer'
import EventInfoContainer from '../event/EventInfoContainer'
import FamilyContainer from '../family/FamilyContainer'
import UserLogin from '../session/UserLogin'


const Home = ({ user, family, familyMembers, setUser, onAddMember, events, setEvents, onAddEvent, openUserSelect, onOpenUsers }) => {
  const [eventInfo, setEventInfo] = useState(null)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [open, setOpen] = useState(false)

  const handleSelectEvent = (e) => {
    const selectedId = e.event.id
    if (eventInfo && parseInt(eventInfo.id) === parseInt(selectedId)) {
      setEventInfo(null)
      return
    }
    const selectedEvent = events.find(event => event.id == selectedId)
    const eventsUser = familyMembers.find(user => user.id === selectedEvent.user_id)
    selectedEvent.user = eventsUser.name
    setEventInfo({...selectedEvent})
  }

  const handleFilter = (e) => {
    // define the target tabs ID
    const targetUserId = e.target.id
    // Find if the array has a user_id that is equal to the target id
    // if true, then filter those events out
    // if false, then add those events back in
    if (filteredEvents.find(event => parseInt(event.user_id) === parseInt(targetUserId))) {
      const filtered = filteredEvents.filter(event => parseInt(event.user_id) !== parseInt(targetUserId))
      setFilteredEvents(filtered)
    } else {
      const unfiltered = events.filter(event => parseInt(event.user_id) === parseInt(targetUserId))
      setFilteredEvents([...filteredEvents, ...unfiltered])
    }
    
    if (eventInfo && parseInt(eventInfo.user_id) === parseInt(targetUserId)) {
      setEventInfo(null)
    }
  }

  const newEvent = () => {
    if (open) {
      return(
        <NewEventContainer user={ user } onAddEvent={ onAddEvent } />
      )
    } else {
      return(
        <Button>Add New Event</Button>
      )
    } 
  }

  return (
    <>
      <UserLogin openUserSelect={ openUserSelect } onOpenUsers={ onOpenUsers } user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ onAddMember }/>
      <Grid container maxHeight="100vh" spacing={1}>
        <Grid item xs={3} container maxHeight="100vh">
          <Stack justifyContent="space-between">
            <Stack>
              {user ? <EventListContainer user={ user } events={ events } /> : null}
              {user ? <NewEventContainer user={ user } onAddEvent={ onAddEvent } /> : null}
            </Stack>
            {eventInfo ? <EventInfoContainer eventInfo={ eventInfo }/> : null}
          </Stack>
        </Grid>
        <Grid item xs={8} >
          <CalendarContainer events={ filteredEvents } onSelectEvent={ handleSelectEvent } />
        </Grid>
        <Grid item xs={1} container maxHeight="90vh">
          <FamilyContainer familyMembers={ familyMembers } onHandleFilter={ handleFilter }/>
        </Grid>
      </Grid>
    </>
  )
}

export default Home