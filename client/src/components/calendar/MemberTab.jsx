import React, { useState } from 'react'
import { Paper, Typography } from '@mui/material';

const MemberTab = ({ user, onHandleUserClick }) => {
  const [hide, setHide] = useState(false)
  const bgdColor = hide ? "gray" : user.color

  const handleUserClick = (e) => {
    onHandleUserClick(e)
    setHide(!hide)
  } 

  return (
    <Paper  
      sx={{ 
        backgroundColor: bgdColor, 
        '&:hover': {
          backgroundColor: bgdColor,
          opacity: [0.8, 0.8, 0.8],
        },
        borderRadius: "25px",
        width: "6vw"
      }}
      onClick={ handleUserClick }
      id={ user.id }
    >
      <Typography textAlign="center" variant="button" display="block" id={ user.id }>{ user.name }</Typography>
    </Paper>
  )
}

export default MemberTab