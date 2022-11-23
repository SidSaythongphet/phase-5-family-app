import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



const NewTaskButton = ({ setOpen }) => {

  return (
    <>
      <Button component={ Link } to="create" variant="contained" sx={{ marginLeft: 1, width: "100%", bgcolor: "primary.light", borderRadius: 4 }} onClick={ () => setOpen(true) }>New Task</Button>
    </>
  )
}

export default NewTaskButton