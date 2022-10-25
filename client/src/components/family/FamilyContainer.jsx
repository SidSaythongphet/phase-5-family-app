import React from 'react';
import { Paper } from '@mui/material';

const FamilyContainer = ({ familyMembers }) => {
  let colors = ["grey", "red", "orange", "green", "blue", "purple", "brown"]

  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <h1>Legend</h1>
      {
        familyMembers.length !== 0
        ?
        familyMembers.map(user => {
          return(
            <Paper 
              key={ user.id } 
              sx={{ 
                backgroundColor: colors[user.id], 
                margin: "5px"
              }}
            >
              { user.name }
            </Paper>
          )
        })
        :
        null
      }
    </Paper>
  )
}

export default FamilyContainer