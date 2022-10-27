import { Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import CalendarModule from '../calendar/CalendarModule'
import EventListModule from '../calendar/EventListModule'
import DatePickerModule from '../event/DatePickerModule'
import EventInfoContainer from '../event/EventInfoContainer'
import FamilyContainer from '../family/FamilyContainer'
import UserLogin from '../session/UserLogin'

const Home = ({ user, family, familyMembers, setUser, onAddMember, events, setEvents, onAddEvent }) => {
  const [eventInfo, setEventInfo] = useState(null)
  const [filteredEvents, setFilteredEvents] = useState(events)

  const handleSelectEvent = (e) => {
    const selectedId = e.event.id
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
  }


  return (
    <>
      { family ? <UserLogin user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ onAddMember }/> : null }
      <Grid container>
        <Grid item xs={3} container>
          <Stack>
            {user ? <EventListModule user={ user } events={ events } /> : null}
            {eventInfo ? <EventInfoContainer eventInfo={ eventInfo }/> : null}
            {user ? <DatePickerModule user={ user } onAddEvent={ onAddEvent } /> : null}
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <CalendarModule events={ filteredEvents } onSelectEvent={ handleSelectEvent } />
        </Grid>
        <Grid item xs={1}>
          <FamilyContainer familyMembers={ familyMembers } onHandleFilter={ handleFilter }/>
        </Grid>
      </Grid>
    </>
  )
}

export default Home