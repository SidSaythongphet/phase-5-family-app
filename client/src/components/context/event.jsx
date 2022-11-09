import React, { useState, createContext, useEffect } from "react";

const EventContext = createContext()

const EventProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [eventInfo, setEventInfo] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events')
      const data = await response.json()
      // if (response.ok) {
        setAllEvents(data)
        setFilteredEvents(data)
        // }
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

  return (
    <EventContext.Provider value={{ allEvents, setAllEvents, filteredEvents, setFilteredEvents, eventInfo, setEventInfo, pastEvents }}>
      { children }
    </EventContext.Provider>
  )
}

export { EventContext, EventProvider }