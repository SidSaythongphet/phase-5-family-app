import React, { useState } from 'react'
import { Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { EventContext } from '../context/event';

const MemberTab = ({ user }) => {
  const { allEvents, filteredEvents, setFilteredEvents, eventInfo, setEventInfo } = useContext(EventContext)
  const [hide, setHide] = useState(false)
  const bgdColor = hide ? "gray" : user.color

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
    setHide(!hide)
  } 

  return (
    <Paper  
      sx={{ 
        backgroundColor: bgdColor, 
        '&:hover': {
          backgroundColor: bgdColor,
          opacity: [0.8, 0.8, 0.8],
        },
        marginTop: "10px", 
        borderRadius: "25px",
        width: "100%"
      }}
      onClick={ handleUserClick }
      id={ user.id }
    >
      <Typography textAlign="center" variant="button" display="block" id={ user.id }>{ user.name }</Typography>
    </Paper>
  )
}

export default MemberTab