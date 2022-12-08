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
      <Paper elevation={2} sx={{ width: "100%", height: "100%", maxHeight: "50vh", borderRadius: 4, border: 4, borderColor: color }} >
        <Grid container sx={{ height: "100%" }} justifyContent="center">

          <Grid item xs={12} container alignItems="end" sx={{ borderBottom: 1, borderColor: color, height: "20%" }}>
            <Grid item xs={2} container justifyContent="center">
              <PersonPinIcon fontSize="large" sx={{ color: color }}/>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ marginLeft: "5px" }}>
                { eventInfo.user } has:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{ title }</Typography>
            </Grid> 
          </Grid>

          <Grid item xs={5}/>
          <Grid item xs={7} sx={{ paddingRight: 5}}>
            { renderEventTime() }
          </Grid>

          <Grid item xs={12} sx={{ paddingRight: 5, paddingLeft: 5 }} container justifyContent="space-between">
            <Grid item xs={1}>
              <Typography>Note:</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography sx={{ wordBreak: "break-word" }}>{ note}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} alignSelf="flex-end" justifyContent="center">
            {
              user_id === user.id
              ?
              <>
                <ButtonGroup size="small" fullWidth sx={{ padding: .5 }}>
                  <Button variant='contained' sx={{ borderRadius: 3 }}>Edit</Button>
                  <Button variant="contained" color="error" onClick={ () => setOpen(true) } sx={{ borderRadius: 3 }}>
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