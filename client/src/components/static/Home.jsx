import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Divider } from '@mui/material'
import { Box, Grid } from '@mui/material'


const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box bgcolor="teal" height="10vh" sx={{ flexGrow: 1 }}/>
      <Grid container justifyContent="space-between" alignItems="center" height="90vh">
        <Grid item xs={6} container justifyContent="start" alignItems="center" marginLeft="100px">
          <Grid item xs={5}>
            <Box
              bgcolor="teal"
              height="90vh"
              width="500px"
            >
              <Box
                padding="50px"
                marginLeft="50px"
                bgcolor="white"
                height="500px"
                width="500px"
                borderRadius="50%"
              >
                <Grid container justifyContent="center" alignItems="center" height="100%">
                  <Grid item xs={12}>
                    <Typography variant='h2' align='center'>Plann<span style={{ color:"teal" }}>r</span></Typography>
                    <Typography variant='h6' align='center'>
                      Schedule together.
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid container item xs={12} justifyContent="center">
                    <Button variant="contained" onClick={ () => navigate("/login") }>Log in</Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="60vh"
            flexDirection="column"
            maxWidth="100vw"
            borderRadius="60vh 0 0 60vh"
            sx={{ 
              backgroundImage: "url(http://localhost:3000/homepage_image.jpg)", 
              backgroundRepeat: "no-repeat", 
              backgroundSize: "contained", 
              backgroundPositionY: "center", 
              backgroundPositionX: "90%",
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Home