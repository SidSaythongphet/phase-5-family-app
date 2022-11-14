import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { FamilyContext } from '../context/family';



const NewEventButton = () => {
  const { family } = useContext(FamilyContext)
  const navigate = useNavigate()

  return (
    <>
      <Button variant="contained" onClick={ () => navigate(`/family/${family.last_name}/${family.id}/create_event`) } sx={{ width: "100%", bgcolor: "primary.light", borderRadius: 4 }}>New Event</Button>
    </>
  );
}

export default NewEventButton