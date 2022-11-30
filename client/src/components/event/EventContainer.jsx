import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'
import NewEventButton from './NewEventButton'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material'
import EventListContainer from './EventListContainer'
import NewEventForm from './NewEventForm'
import EventInfoContainer from './EventInfoContainer'
import Calendar from '../calendar/Calendar'

const EventContainer = () => {
  const { user } = useContext(UserContext) 
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [eventInfo, setEventInfo] = useState(null)
  const [open, setOpen] = useState(false)

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

  const handleDeleteEvent = (deletedEventId) => {
    const familyList = allEvents.filter(evnt => evnt.id !== deletedEventId)
    setAllEvents(familyList)
    const filteredList = filteredEvents.filter(evnt => evnt.id !== deletedEventId)
    setFilteredEvents(filteredList)
    setEventInfo(false)
  }

  const userEvents = allEvents.filter(evnt => evnt.user_id === user.id)
  const nonUserEvents = allEvents.filter(evnt => evnt.user_id !== user.id)

  return (
    <>
      <ThemeProvider theme={ theme }>
        <Grid item xs={12} container justifyContent="center" height="100%" alignContent="flex-start" >
          <Grid item xs={6} container justifyContent="center" sx={{ height: "38vh", padding: .5 }} >
            <Grid item xs={12} sx={{ height: "20%" }}>
              <NewEventButton setOpen={ setOpen }/>
            </Grid>
            <Grid item xs={12} sx={{ height: "80%" }}>
              <EventInfoContainer eventInfo={ eventInfo } onDeleteEvent={ handleDeleteEvent }/>
            </Grid>
          </Grid>
          <Grid item xs={6} container justifyContent="center" sx={{ height: "38vh", padding: .5 }} >
            <Calendar left={ "prev" } right={ "next" } allEvents={ allEvents} filteredEvents={ filteredEvents } eventInfo={ eventInfo } setEventInfo={ setEventInfo } pastEvents={ pastEvents }/>
          </Grid>
          <Grid container item xs={12}  sx={{ height: "54vh", padding: .5 }}>
            <Grid item xs={6} sx={{ paddingRight: .5 }}>
              <EventListContainer events={ userEvents } eventInfo={ eventInfo } setEventInfo={ setEventInfo } header="My Events"/>
            </Grid>
            <Grid item xs={6} sx={{ paddingLeft: .5 }}>
              <EventListContainer events={ nonUserEvents } eventInfo={ eventInfo } setEventInfo={ setEventInfo } header="Family Events"/>
            </Grid>
          </Grid>
          {/* <Grid container spacing={1} item xs={12} sx={{ margin: 1, marginTop: 0, marginBottom: 0, height: "24vh" }}>

          </Grid> */}
        </Grid>
        {/* <NewTaskForm open={ open } setOpen={ setOpen } onAddTask={ handleAddTask }/> */}
        <NewEventForm open={ open } setOpen={ setOpen } onAddEvent={ handleAddEvent }/>
      </ThemeProvider>
    </>
  )
}

export default EventContainer