import React, { useContext } from 'react';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import DeleteEventConfirmation from '../popup/DeleteEventConfirmation';
import { UserContext } from '../context/user';
import { useState } from 'react';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const EventInfoContainer = ({ eventInfo, onDeleteEvent }) => {
  const [open, setOpen] = useState(false)
  const { user } = useContext(UserContext)
  if (!eventInfo) return <Grid item xs={12} sx={{ height: "100%" }} />
  const { id, title, allDay, start, end, note, user_id, color } = eventInfo

  const renderEventTime = () => {
    if (new Date(start).toDateString() === new Date(end).toDateString()) {
      return (
        <Typography variant='body2' textAlign="right">{new Date(start).toDateString()} from { new Date(start).toLocaleTimeString() } to { new Date(end).toLocaleTimeString() }</Typography>
      )
    } else {
      return (
        <Typography variant='body2' textAlign="right">{new Date(start).toDateString()} at { new Date(start).toLocaleTimeString() } until { new Date(end).toDateString() } at { new Date(end).toLocaleTimeString() }</Typography>
      )
    }
  }

  return (
    <Grid item xs={12} sx={{ height: "100%" }}>
      <Paper elevation={2} sx={{ width: "100%", height: "100%", borderRadius: 4, border: 4, borderColor: "primary.light" }} >
        <Grid container sx={{ height: "100%" }} justifyContent="center" alignItems="">
          {/* <Grid item xs={2} sx={{ bgcolor: color, borderRadius: 4, width: "15px" }}/>
           */}
          <Grid item><PersonPinIcon fontSize="large" sx={{ color: "primary.light"}}/></Grid>
          <Grid item xs={4} alignSelf="center" sx={{ borderBottom: 1, borderColor: color }}>
            <Typography sx={{ marginLeft: "5px" }}>
              { eventInfo.user } has:
            </Typography>
          </Grid>
          <Grid item xs={6} alignSelf="center" sx={{ borderBottom: 1, borderColor: color }}>
            <Typography>{ title }</Typography>
          </Grid>
          <Grid item xs={4}/>
          <Grid item xs={8}>
            { renderEventTime() }
          </Grid>
          <Grid item xs={12}>
            <Typography>Note: { note }</Typography>
          </Grid>
          <Grid item xs={12} alignSelf="flex-end" justifyContent="center">
            {
              user_id === user.id
              ?
              <>
                <ButtonGroup size="small" fullWidth sx={{ paddingBottom: 0 }}>
                  <Button variant='contained' sx={{ borderRadius: 4 }}>Edit</Button>
                  <Button variant="contained" color="error" onClick={ () => setOpen(true) } sx={{ borderRadius: 4 }}>
                    Cancel Event
                  </Button>
                </ButtonGroup>
                <DeleteEventConfirmation id={ id } open={ open } setOpen={ setOpen } onDeleteEvent={ onDeleteEvent } />
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