import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const NewTaskButton = () => {
  return (
    <>
      <Button variant="contained" sx={{ width: "100%", bgcolor: "primary.light", borderRadius: 4 }}>New Task</Button>
    </>
  )
}

export default NewTaskButton