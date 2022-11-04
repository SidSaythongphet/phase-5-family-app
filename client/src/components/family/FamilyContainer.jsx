import React from 'react';
import { Paper, Typography } from '@mui/material';
import MemberTab from './MemberTab';

const FamilyContainer = ({ familyMembers, onHandleFilter }) => {

  return (
    <Paper elevation={2} sx={{ margin: 1, width: "100%", paddingTop: "50px", height: "50vh" }}>
      <Typography textAlign="center" variant='h5'>Filter:</Typography>
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