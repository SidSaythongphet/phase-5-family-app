import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



const NewEventButton = ({ setOpen }) => {
  return (
    <>
      <Button component={ Link } to="create" variant="contained" sx={{ width: "100%", bgcolor: "primary.light", borderRadius: 4 }} onClick={ () => setOpen(true) }>New Event</Button>
    </>
  );
}

export default NewEventButton