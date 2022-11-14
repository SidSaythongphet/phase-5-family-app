import React, { useContext } from 'react';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import DeleteEventConfirmation from '../popup/DeleteEventConfirmation';
import { EventContext } from '../context/event';
import { UserContext } from '../context/user';
import { useState } from 'react';

const EventInfoContainer = () => {
  const [open, setOpen] = useState(false)
  const { eventInfo } = useContext(EventContext)
  const { user } = useContext(UserContext)
  if (!eventInfo) return <Grid item xs={12} sx={{ height: "100%" }} />
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
    <Grid item xs={12} sx={{ height: "100%" }}>
      <Paper elevation={2} sx={{ borderBottom: 10, borderTop: 10, borderColor: color, height: "90%", borderRadius: 4 }} >
        <Grid container sx={{ height: "100%" }} justifyContent="center">
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
                  <Button variant="contained" color="error" onClick={ () => setOpen(true) }>
                    Cancel Event
                  </Button>
                </ButtonGroup>
                <DeleteEventConfirmation id={ id } open={ open } setOpen={ setOpen } />
              </>
              : 
              null
            }
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default EventInfoContainer