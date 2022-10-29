import React, { useState } from 'react'
import { Paper } from '@mui/material';

const MemberTab = ({ user, onHandleFilter }) => {
  const [hide, setHide] = useState(false)
  const bgdColor = hide ? null : user.color

  const handleUserClick = (e) => {
    onHandleFilter(e)
    setHide(!hide)
  } 

  return (
    <Paper  
      sx={{ 
        backgroundColor: bgdColor, 
        margin: "5px"
      }}
      onClick={ handleUserClick }
      id={ user.id }
    >
      { user.name }
  </Paper>
  )
}

export default MemberTab