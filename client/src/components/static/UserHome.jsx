import React, { useEffect, useContext } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { UserContext } from '../context/user'
import { useState } from 'react'
import { Typography } from '@mui/material'
import TimeDisplay from './TimeDisplay'

const UserHome = () => {
  const { user } = useContext(UserContext)
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`/api/users/${user.id}/events`)
      const data = await response.json()
      if (response.ok) {
        setUserEvents(data)
      }
    }
    fetchEvents()
  }, [])

  console.log(userEvents)

  return (
      <Grid container justifyContent="center" padding={5}>
        <Grid item xs={8} container justifyContent="space-between" sx={{ padding: .5, height: "10vh" }}>
          <Grid item xs={4}>
            <Paper elevation={2} sx={{ border: 4, borderColor: "primary.light", borderRadius: 4, padding: "2%", width: "100%", height: "100%" }}>
              <Grid container  justifyContent="center" alignItems="center" height="100%">
                <Typography variant="h5">Hello, { user.name }</Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={2} >
            <Paper elevation={2} sx={{ border: 4, borderColor: "primary.light", borderRadius: 4, padding: "2%", width: "100%", height: "100%" }}>
              <TimeDisplay />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={8} sx={{ padding: .5, height: "75vh" }}>
          <Paper elevation={2} sx={{ border: 4, borderColor: "primary.light", borderRadius: 4, padding: "2%", width: "100%", height: "100%" }}>
            <Typography textAlign="center" variant="h5" gutterBottom>Today:</Typography>
              { userEvents.length === 0 
                ?
                <Typography textAlign="center" variant="h6">You have no events today</Typography>
                :
                <Typography textAlign="center" variant="h6">You have { userEvents.length } events today</Typography>
              }
            
          </Paper>
        </Grid>
      </Grid>
  )
}

export default UserHome