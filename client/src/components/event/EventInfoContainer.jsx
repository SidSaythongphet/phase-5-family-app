import React from 'react';
import { Paper } from '@mui/material';

const EventInfoContainer = ({ eventInfo }) => {
  const { title, allDay, start, end, note, user } = eventInfo

  const renderEventTime = () => {
    if (new Date(start).toDateString() === new Date(end).toDateString()) {
      return (
        <h4>{new Date(start).toDateString()} from { new Date(start).toLocaleTimeString() } to { new Date(end).toLocaleTimeString() }</h4>
      )
    } else {
      return (
        <h4>{new Date(start).toDateString()} at { new Date(start).toLocaleTimeString() } until { new Date(end).toDateString() } at { new Date(end).toLocaleTimeString() }</h4>
      )
    }
  }

  return (
    <Paper elevation={2} sx={{ margin: 1 }} >
      <h4>{ user } has:</h4>
      <h4>Title: { title }</h4>
      { renderEventTime() }
      <h4>Note: { note }</h4>
    </Paper>
  )
}

export default EventInfoContainer