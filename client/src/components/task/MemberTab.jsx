import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const MemberTab = ({ member, targetMember, setTargetMember }) => {
  const { id, name, color } = member

  const [isHovered, setIsHovered] = useState(false)

  const height = isHovered || targetMember.id === id ? "75%" : "50%"

  return (
    <Grid item xs={2} sx={{ height: height }}>
      <Paper onMouseEnter={ () => setIsHovered(true) } onMouseLeave={ () => setIsHovered(false) } onClick={ () => setTargetMember(member) } sx={{ height: "100%", bgcolor: color, borderRadius: 2, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <Typography textAlign="center" color="white">{ name }</Typography>
      </Paper>
    </Grid>
  )
}

export default MemberTab