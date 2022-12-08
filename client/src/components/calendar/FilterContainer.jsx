import React from 'react';
import { Grid, Paper, Skeleton, Typography } from '@mui/material';
import MemberTab from './MemberTab';
import { useContext } from 'react';
import { FamilyContext } from '../context/family';
import { Box } from '@mui/system';

const FilterContainer = ({ onHandleUserClick, onHidePast }) => {
  const { members } = useContext(FamilyContext)

  if (!members) return <Skeleton />

  return (
    <Box component={ Paper } elevation={2} sx={{ width: "100%", height: "100%", borderRadius: 4 }}>
      <Grid container alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
        <Grid item xs={2} paddingLeft="15px">
          <Typography variant='h5'>Filter:</Typography>
        </Grid>
        <Grid container item xs={10} alignItems="center">
        <Grid item xs={1.5}>
          <Paper  
            sx={{ 
              backgroundColor: "gray", 
              '&:hover': {
                backgroundColor: "gray",
                opacity: [0.8, 0.8, 0.8],
              },
              borderRadius: "25px",
              width: "6vw"
            }}
            onClick={ onHidePast }
          >
            <Typography textAlign="center" variant="button" display="block" color="white">Past Events</Typography>
          </Paper>
        </Grid>
        {
          members.length !== 0
          ?
          members.map(user => {
            return(
              <Grid item xs={1.5} key={ user.id }>
                <MemberTab user={ user } onHandleUserClick={ onHandleUserClick }/>
              </Grid>
              )
            })
            :
            null
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default FilterContainer