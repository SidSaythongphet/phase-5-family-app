import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import CalendarContainer from '../calendar/CalendarContainer'
import EventListContainer from '../event/EventListContainer'
import NewEventContainer from '../event/NewEventContainer'
import EventInfoContainer from '../event/EventInfoContainer'
import FamilyContainer from '../family/FamilyContainer'
import UserLogin from '../session/UserLogin'
import Fab from '@mui/material/Fab';
import NewEventButton from '../event/NewEventButton'

const FamilyHome = ({ user, family, familyMembers, familyEvents, setUser, onAddMember, openUserSelect, onOpenUsers, setFamilyEvents }) => {
  const [eventInfo, setEventInfo] = useState(null)
  const [open, setOpen] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState(familyEvents)
  const [userEvents, setUserEvents] = useState(null)

  useEffect(() => {
    if (!filteredEvents) return setFilteredEvents(familyEvents)
    if (user && !userEvents) return setUserEvents(familyEvents.filter(event => event.user_id === user.id))
    console.log("rendered")
  }, [familyEvents])

  // console.log("Current Users Events:", userEvents)

  const handleAddEvent = (newEvent) => {
    newEvent["color"] = newEvent.user.color
    setFilteredEvents([...filteredEvents, newEvent])
    setFamilyEvents([...familyEvents, newEvent])
    if (newEvent.user_id === user.id) return setUserEvents([...userEvents, newEvent])
  }

  const handleDeleteEvent = (deletedEvent) => {
    const familyList = familyEvents.filter(event => event.id !== deletedEvent)
    setFamilyEvents(familyList)
    const filteredList = filteredEvents.filter(event => event.id !== deletedEvent)
    setFilteredEvents(filteredList)
    if (deletedEvent === user.id) {
      const userList = userEvents.filter(event => event.id !== deletedEvent)
      setUserEvents(userList)
    }
  }

  const handleSelectEvent = (e) => {
    const selectedId = e.event.id
    if (eventInfo && parseInt(eventInfo.id) === parseInt(selectedId)) {
      setEventInfo(null)
      return
    }
    const selectedEvent = familyEvents.find(event => event.id == selectedId)
    const eventsUser = familyMembers.find(user => user.id === selectedEvent.user_id)
    selectedEvent.user = eventsUser.name
    setEventInfo({...selectedEvent})
  }

  const handleFilter = (e) => {
    // define the target tabs ID
    const targetUserId = e.target.id
    if (!filteredEvents) return setFilteredEvents(familyEvents)
    // Find if the array has a user_id that is equal to the target id
    // if true, then filter those events out
    // if false, then add those events back in
    if (filteredEvents.find(event => parseInt(event.user_id) === parseInt(targetUserId))) {
      const filtered = filteredEvents.filter(event => parseInt(event.user_id) !== parseInt(targetUserId))
      setFilteredEvents(filtered)
    } else {
      const unfiltered = familyEvents.filter(event => parseInt(event.user_id) === parseInt(targetUserId))
      setFilteredEvents([...filteredEvents, ...unfiltered])
    }
    
    if (eventInfo && parseInt(eventInfo.user_id) === parseInt(targetUserId)) {
      setEventInfo(null)
    }
  }

  // const newEvent = () => {
  //   if (open) {
  //     return(
  //       <NewEventContainer user={ user } onAddEvent={ handleAddEvent } setOpen={ setOpen }/>
  //     )
  //   } else {
  //     return(
  //       <Fab variant="extended" size='medium' onClick={ () => setOpen(true) }>
  //         New Event
  //       </Fab>
  //     )
  //   } 
  // }

  return (
    <>
      <UserLogin openUserSelect={ openUserSelect } onOpenUsers={ onOpenUsers } user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ onAddMember }/>
      <Grid container maxHeight="100vh" spacing={1}>
        <Grid item xs={3} container maxHeight="100vh">
          {
            user 
            ?
            <>
              <Grid item xs={12} container justifyContent="space-between">
                <Grid item xs={12} container alignContent="start" justifyContent="center">
                  <Grid item xs={12} container justifyContent="center">
                    <NewEventButton  user={ user } onAddEvent={ handleAddEvent } />
                  </Grid>
                  <Grid item xs={12}>
                    <EventListContainer user={ user } events={ userEvents } />
                  </Grid>
                  <Grid item xs={12} >
                    {/* { newEvent() } */}
                  </Grid>
                </Grid>
                <Grid item xs={12} container alignItems="flex-end">
                  {eventInfo ? <EventInfoContainer eventInfo={ eventInfo } currentUser={ user } onDeleteEvent={ handleDeleteEvent }/> : null}
                </Grid>
              </Grid>
            </>
            : 
            null
          }
        </Grid>
        <Grid item xs={8} >
          <CalendarContainer events={ filteredEvents } onSelectEvent={ handleSelectEvent } />
        </Grid>
        <Grid item xs={1} container maxHeight="90vh" justifyContent="center" alignContent="center">
          {/* { newEvent() } */}
          <FamilyContainer familyMembers={ familyMembers } onHandleFilter={ handleFilter }/>
        </Grid>
      </Grid>
    </>
  )
}

export default FamilyHome