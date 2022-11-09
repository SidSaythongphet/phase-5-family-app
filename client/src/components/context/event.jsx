import React, { useState, createContext, useEffect } from "react";

const EventContext = createContext()

const EventProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
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

    fetchEvents()
  }, [])

  return (
    <EventContext.Provider value={{ allEvents, setAllEvents, filteredEvents, setFilteredEvents, eventInfo, setEventInfo }}>
      { children }
    </EventContext.Provider>
  )
}

export { EventContext, EventProvider }