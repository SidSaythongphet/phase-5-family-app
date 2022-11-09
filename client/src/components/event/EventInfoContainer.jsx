import React, { useContext } from 'react';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import DeleteConfirmation from '../popup/DeleteConfirmation';
import { EventContext } from '../context/event';
import { UserContext } from '../context/user';

const EventInfoContainer = () => {
  const { eventInfo } = useContext(EventContext)
  const { user } = useContext(UserContext)
  if (!eventInfo) return null
  const { id, title, allDay, start, end, note, user_id, color } = eventInfo

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
    <Paper elevation={2} sx={{ margin: 1, border: 4, borderColor: color, width: "98%", height: "20vh" }} >
      <Grid container sx={{ margin: 1, height: "100%" }} justifyContent="center">
        <Grid item xs={6}>
          <Typography>{ eventInfo.user } has:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{ title }</Typography>
        </Grid>
        <Grid item xs={12}>
          { renderEventTime() }
        </Grid>
        <Grid item xs={11}>
          { note !== "" ? <Typography>Note: { note }</Typography> : null }
        </Grid>
        <Grid item xs={12} alignSelf="center" justifyContent="center">
          {
            user_id === user.id
            ?
            <>
            <ButtonGroup>
              <Button variant='contained'>Edit</Button>
              <DeleteConfirmation id={ id } />
            </ButtonGroup>
            </>
            : 
            null
          }
        </Grid>
      </Grid>
    </Paper>
  )
}

export default EventInfoContainer