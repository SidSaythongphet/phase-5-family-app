import React, { useState } from 'react'
import { Paper, Typography } from '@mui/material';

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
      <Typography textAlign="center" id={ user.id }>{ user.name }</Typography>
  </Paper>
  )
}

export default MemberTab