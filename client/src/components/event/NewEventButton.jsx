import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { FamilyContext } from '../context/family';



const NewEventButton = () => {
  const { family } = useContext(FamilyContext)
  const navigate = useNavigate()

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" color="success" onClick={ () => navigate(`/family/${family.last_name}/${family.id}/create_event`) } sx={{ margin: 1, padding: "10px", width: "100%" }}>New Event</Button>
      </Grid>
    </>
  );
}

export default NewEventButton