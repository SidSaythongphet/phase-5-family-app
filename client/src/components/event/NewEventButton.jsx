import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NewEventContainer from './NewEventContainer';
import Grid from '@mui/material/Grid';


const NewEventButton = ({ user, onAddEvent }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" onClick={ handleDrawerOpen } sx={{ margin: 1, padding: "10px", width: "100%" }}>New Event</Button>
      </Grid>
      <Drawer
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{ square: false }}
      >
        <NewEventContainer user={ user } onAddEvent={ onAddEvent } setOpen={ setOpen }/>
      </Drawer>
    </>
  );
}

export default NewEventButton