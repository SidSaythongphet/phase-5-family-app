import React from 'react';
import { Grid, Typography, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



const NewUserButton = ({ show, setShow }) => {
  return (
    <Paper elevation={4} sx={{ borderRadius: 4, margin: 1, padding: 1, paddingTop: 2, width: "10vw" }} onClick={ e => setShow(!show) }>
      <Grid container height="100%">
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <IconButton size="large"><AddIcon/></IconButton>
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Typography variant='body' textAlign="center" gutterBottom>Add Member</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default NewUserButton