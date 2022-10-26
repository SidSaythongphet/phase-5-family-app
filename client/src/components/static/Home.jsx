import { Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import CalendarModule from '../calendar/CalendarModule'
import EventListModule from '../calendar/EventListModule'
import DatePickerModule from '../event/DatePickerModule'
import EventInfoContainer from '../event/EventInfoContainer'
import FamilyContainer from '../family/FamilyContainer'
import UserLogin from '../session/UserLogin'

const Home = ({ user, family, familyMembers, setUser, onAddMember, events, onAddEvent }) => {
  const [eventInfo, setEventInfo] = useState(null)

  const handleSelectEvent = (e) => {
    const selectedId = e.event.id
    const selectedEvent = events.find(event => event.id == selectedId)
    const eventsUser = familyMembers.find(user => user.id === selectedEvent.user_id)
    selectedEvent.user = eventsUser.name
    setEventInfo({...selectedEvent})
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
          <CalendarModule events={ events } onSelectEvent={ handleSelectEvent } />
        </Grid>
        <Grid item xs={1}>
          <FamilyContainer familyMembers={ familyMembers }/>
        </Grid>
      </Grid>
    </>
  )
}

export default Home