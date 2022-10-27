import React, { useState } from 'react';
import { Paper } from '@mui/material';
import MemberTab from './MemberTab';

const FamilyContainer = ({ familyMembers, onHandleFilter }) => {
  let colors = ["grey", "red", "orange", "green", "blue", "purple", "brown"]
  const [hide, setHide] = useState(false)
  // make seperate component to spread hide state in each

  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <h1>Legend</h1>
      {
        familyMembers.length !== 0
        ?
        familyMembers.map(user => {
          return(
            <MemberTab key={ user.id } user={ user } onHandleFilter={ onHandleFilter }/>
          )
        })
        :
        null
      }
    </Paper>
  )
}

export default FamilyContainer