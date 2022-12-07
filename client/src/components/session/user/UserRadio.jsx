import React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Avatar, Grid, Paper } from '@mui/material';

const UserRadio = ({ user, selectedValue, onUserSelect }) => {
  return (
    <Paper elevation={4} sx={{ borderRadius: 4, margin: 1, padding: 1, paddingTop: 2, width: "10vw" }} id={ user.name } onClick={ onUserSelect } >
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={12} container justifyContent="center" id={ user.name } onClick={ onUserSelect } >
          <Avatar sx={{ bgcolor: user.color, width: 56, height: 56 }}/>
        </Grid>
        <Grid container item xs={12} justifyContent="center" id={ user.name } onClick={ onUserSelect } >
          <FormControlLabel 
            value={ user.name } 
            label={ user.name }
            labelPlacement="top"
            control={ 
              <Radio
                checked={ selectedValue.name === user.name }
                onChange={ onUserSelect }
                value={ user.name } 
                name={ user.name } 
              />
            } 
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default UserRadio