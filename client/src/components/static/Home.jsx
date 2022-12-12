import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Divider } from '@mui/material'
import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useContext } from 'react'
import { FamilyContext } from '../context/family'


const Home = () => {
  const navigate = useNavigate()
  const { family } = useContext(FamilyContext)

  useEffect(() => {
    if (family) {
      navigate(`/${ family.last_name }/users`)
    }
  }, [])
  return (
    <>
      <Box bgcolor="gray" height="10vh" sx={{ flexGrow: 1 }}/>
      <Grid container justifyContent="space-between" alignItems="center" height="90vh">
        <Grid item xs={6} container justifyContent="start" alignItems="center" marginLeft="100px">
          <Grid item xs={5}>
            <Box
              bgcolor="gray"
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
                    <Typography variant='h2' align='center'>Plann<span style={{ color:"gray" }}>r</span></Typography>
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
      </Grid>
    </>
  )
}

export default Home