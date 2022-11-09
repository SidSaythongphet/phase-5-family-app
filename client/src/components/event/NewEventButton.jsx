import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NewEventContainer from './NewEventContainer';
import Grid from '@mui/material/Grid';


const NewEventButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" color="success" onClick={ () => setOpen(true) } sx={{ margin: 1, padding: "10px", width: "100%" }}>New Event</Button>
      </Grid>
      <Drawer
        anchor='left'
        open={open}
        onClose={ () => setOpen(false) }
        PaperProps={{ square: false }}
      >
        <NewEventContainer setOpen={ setOpen }/>
      </Drawer>
    </>
  );
}

export default NewEventButton