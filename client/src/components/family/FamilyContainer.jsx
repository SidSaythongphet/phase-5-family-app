import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import MemberTab from './MemberTab';
import { useContext } from 'react';
import { FamilyContext } from '../context/family';

const FamilyContainer = ({ onHandleFilter }) => {
  const { members } = useContext(FamilyContext)

  return (
    <Paper elevation={2} sx={{ marginRight: 1, width: "100%", padding: "50px 5px", height: "50vh" }}>
      <Typography textAlign="center" variant='h5'>Filter:</Typography>
        {
          members.length !== 0
          ?
          members.map(user => {
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