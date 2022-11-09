import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button, Divider, Grid, TextField, Typography, Box } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { EventContext } from '../context/event';
import { UserContext } from '../context/user';


const NewEventContainer = ({ setOpen }) => {
  const { allEvents, setAllEvents, filteredEvents, setFilteredEvents } = useContext(EventContext)
  const { user } = useContext(UserContext)

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: '',
      start: null,
      end: null,
      allDay: false,
      note: '',
      user_id: user.id
    }
  })

  const onSubmit = async form => {
    // throw error if date combination is invalid
    if (new Date(form.start) > new Date(form.end)) {
      console.log("error")
      return
    }

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    if (response.ok) {
      setAllEvents([...allEvents, data])
      setFilteredEvents([...filteredEvents, data])
      setOpen(false)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <Box
      sx={{ 
        width: "25vw", 
        minWidth: "350px"
      }}
    >
      <form onSubmit={ handleSubmit(onSubmit) }>
      <Grid container>
        <Grid item xs={12} justifyContent="center" sx={{ backgroundColor: "gray" }}>
          <Typography gutterBottom textAlign="center" sx={{ margin: "5px" }}>New Event</Typography>
          <Divider />
        </Grid>
          <Grid item xs={12} container rowSpacing={2}>
            <Grid item xs={12} margin="10px">
              <Controller 
                control={ control }
                name="title"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField 
                    label="Event Title"
                    fullWidth
                    value={ value }
                    onChange={ onChange }
                    onBlur={ onBlur }
                    inputRef={ ref }
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item container rowSpacing={1} >
              <Grid item xs={6}>
                <Typography>All Day</Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="allDay"
                  control={control}                
                  render={({ field }) => 
                    <FormControlLabel control={ <Switch {...field} size="small"/> } /> 
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Start</Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={ control }
                  name="start"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      placeholderText='Start Date'
                      selected={ value }
                      dateFormat="M/d/yyyy h:mm:ss a"
                      showTimeSelect
                      onChange={ onChange }
                      selectsStart
                      required
                      onBlur={ onBlur }
                      inputRef={ ref }
                      showPopperArrow={ false }
                      popperProps={{ strategy: "fixed" }}
                      popperPlacement="bottom-end"
                      />
                      )}
                      />
              </Grid>
              <Grid item xs={6}>
                <Typography>End</Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={ control }
                  name="end"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                    placeholderText='End Date'
                    selected={ value }
                    dateFormat="M/d/yyyy h:mm:ss a"
                    showTimeSelect
                    onChange={ onChange }
                    selectsEnd
                    required
                    onBlur={ onBlur }
                    inputRef={ ref }
                    showPopperArrow={ false }
                    popperProps={{ strategy: "fixed" }}
                    popperPlacement="bottom-end"
                    />
                    )}
                    />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={ control }
                name="note"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField 
                  label='Note:'
                  value={ value }
                  onChange={ onChange }
                  onBlur={ onBlur }
                  inputRef={ ref }
                  size="small"
                  multiline
                  fullWidth
                  rows={3}
                  />
                  )}
                  />
            </Grid>
            <Grid item container justifyContent="end">
              <Button type="submit" variant='contained'>Add</Button>
              <Button variant='contained' onClick={ () => setOpen(false) }>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default NewEventContainer