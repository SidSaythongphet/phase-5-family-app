import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'
import Calendar from '../calendar/Calendar'
import { createTheme, ThemeProvider } from '@mui/material'
import { Grid } from '@mui/material'
import NewEventButton from '../event/NewEventButton'
import NewEventForm from '../event/NewEventForm'
import FilterContainer from './FilterContainer'
import EventInfoContainer from '../event/EventInfoContainer'

const CalendarContainer = () => {
  const { user } = useContext(UserContext) 
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [eventInfo, setEventInfo] = useState(null)
  const [open, setOpen] = useState(false)
  const [hidePast, setHidePast] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (response.ok) {
        setAllEvents(data)
        setFilteredEvents(data)
      }
    }
    const fetchPastEvents = async () => {
      const response = await fetch('/api/past_events')
      const data = await response.json()
      if (response.ok) {
        setPastEvents(data)
      }
    }

    fetchEvents()
    fetchPastEvents()
  }, [])

  if (!user) return null

  const theme = createTheme({
    palette: {
      primary: {
        main: user.color,
      },
    },
  })

  const handleAddEvent = (newEvent) => {
    setAllEvents([...allEvents, newEvent])
  }

  const handleUserClick = (e) => {
    // define the target tabs ID
    const targetUserId = e.target.id
    // Find if the array has a user_id that is equal to the target id
    // if true, then filter those events out
    // if false, then add those events back in
    if (filteredEvents.find(evnt => parseInt(evnt.user_id) === parseInt(targetUserId))) {
      const filtered = filteredEvents.filter(evnt => parseInt(evnt.user_id) !== parseInt(targetUserId))
      setFilteredEvents(filtered)
    } else {
      const unfiltered = allEvents.filter(evnt => parseInt(evnt.user_id) === parseInt(targetUserId))
      setFilteredEvents([...filteredEvents, ...unfiltered])
    }
     
    if (eventInfo && parseInt(eventInfo.user_id) === parseInt(targetUserId)) {
      setEventInfo(null)
    }
  } 

  const handleDeleteEvent = (deletedEventId) => {
    const familyList = allEvents.filter(evnt => evnt.id !== deletedEventId)
    setAllEvents(familyList)
    const filteredList = filteredEvents.filter(evnt => evnt.id !== deletedEventId)
    setFilteredEvents(filteredList)
    setEventInfo(false)
  }

  const handleHidePast = () => {
    setHidePast(!hidePast)
  }
  // height=92vh
  return (
    <ThemeProvider theme={ theme }>
      <Grid item xs={12} container justifyContent="center" sx={{ height: "6vh" }} >
        <Grid item xs={3} justifyContent="center" height="6vh" alignContent="flex-start" sx={{ padding: .5 }} >
          <NewEventButton setOpen={ setOpen } />
        </Grid>
        <Grid item xs={9} justifyContent="center" height="6vh" alignContent="flex-start" sx={{ padding: .5 }} >
          <FilterContainer onHandleUserClick={ handleUserClick } onHidePast={ handleHidePast } />
        </Grid>
      </Grid>    
      <Grid item xs={12} container justifyContent="center" sx={{ height: "6vh" }} >
        <Grid item xs={3} justifyContent="center" height="86vh" alignContent="flex-start" sx={{ padding: .5 }}>
          <EventInfoContainer eventInfo={ eventInfo } onDeleteEvent={ handleDeleteEvent } />
        </Grid>
        <Grid item xs={9} justifyContent="center" height="86vh" alignContent="flex-start" sx={{ padding: .5 }}>
          <Calendar allEvents={ allEvents} filteredEvents={ filteredEvents } eventInfo={ eventInfo } setEventInfo={ setEventInfo } pastEvents={ pastEvents } hidePast={ hidePast }/>
        </Grid>
      </Grid>
      <NewEventForm open={ open } setOpen={ setOpen } onAddEvent={ handleAddEvent }/>
    </ThemeProvider>
  )
}

export default CalendarContainer