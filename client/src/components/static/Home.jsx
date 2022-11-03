import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Typography variant="h1">Welcome to Plannr</Typography>
      <Button variant="contained" onClick={ () => navigate("/login") }>Log in</Button>
    </>
  )
}

export default Home