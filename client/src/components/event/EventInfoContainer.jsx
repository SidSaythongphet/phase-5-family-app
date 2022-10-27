import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const EventInfoContainer = ({ eventInfo }) => {
  const { title, allDay, start, end, note, user, color } = eventInfo

  const renderEventTime = () => {
    if (new Date(start).toDateString() === new Date(end).toDateString()) {
      return (
        <Typography>{new Date(start).toDateString()} from { new Date(start).toLocaleTimeString() } to { new Date(end).toLocaleTimeString() }</Typography>
      )
    } else {
      return (
        <Typography>{new Date(start).toDateString()} at { new Date(start).toLocaleTimeString() } until { new Date(end).toDateString() } at { new Date(end).toLocaleTimeString() }</Typography>
      )
    }
  }

  return (
    <Paper elevation={2} sx={{ margin: 1, border: 4, borderColor: color }} >
      <Stack sx={{ margin: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{ user } has:</Typography>
          <Typography>{ title }</Typography>
        </Stack>
        { renderEventTime() }
        { note !== "" ? <Typography>Note: { note }</Typography> : null }
        <Stack direction="row" justifyContent="right">
          <Button>Edit</Button>
          <Button>Cancel Event</Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default EventInfoContainer