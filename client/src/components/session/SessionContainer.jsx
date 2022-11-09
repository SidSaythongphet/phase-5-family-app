import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import Login from './Login'
import SignUp from './SignUp'

const SessionContainer = () => {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" maxHeight="100vh" spacing={10}>
        <Grid item>
          <Typography variant='h2' align='right'>Plann<span style={{color:"green"}}>r</span></Typography>
          <Typography variant='h6' align='right'>
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
              minWidth="300px"
            >
              <Grid container flexDirection="column" >
                <Grid item>
                  <Login />
                </Grid>
                <br/>
                <Divider />
                <br/>
                <Grid item alignSelf="center">
                  <SignUp />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default SessionContainer