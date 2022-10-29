import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import Login from './Login'
import SignUp from './SignUp'

const SessionContainer = ({ onLogIn, loggedIn }) => {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" maxHeight="100vh">
        <Grid item>
          <Typography>Title</Typography>
          <Typography>
            Schedule together.
          </Typography>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            flexDirection="column"
          >
            <Box
              bgcolor="white"
              borderRadius="25px"
              padding="25px"
            >
              <Login onLogIn={ onLogIn } loggedIn={ loggedIn } />
              <Divider variant='middle' />
              <Typography>Create New Account</Typography>
              <SignUp onLogIn={ onLogIn } loggedIn={ loggedIn } />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default SessionContainer