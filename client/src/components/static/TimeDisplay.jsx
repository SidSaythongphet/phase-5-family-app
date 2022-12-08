import { Grid, Typography } from '@mui/material';
import  React, { useState , useEffect } from 'react'

const TimeDisplay = () => {
  const [date, setDate] = useState(new Date());
    
  useEffect(() => {
    const timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
      clearInterval(timer)
    }  
  });

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Typography textAlign="center" variant='h5'>{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Typography>
    </Grid>
  )
}

export default TimeDisplay