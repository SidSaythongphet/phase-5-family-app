import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";

const NewEventContainer = ({ user, onAddEvent }) => {
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
    console.log(form)

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
      onAddEvent(data)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <Paper elevation={2} sx={{ margin: 1, padding: "10px" }}>
      <form onSubmit={ handleSubmit(onSubmit) }>
      <Grid container>
        <Grid item xs={12} justifyContent="center">
          <Typography gutterBottom textAlign="center">New Event</Typography>
          <Divider />
        </Grid>
          <Grid item xs={12} container rowSpacing={2}>
            <Grid item xs={12} marginTop="10px">
              <Controller
                control={ control }
                name="title"
                rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
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
            <Grid item container rowSpacing={1}>
              <Grid item xs={6}>
                <Typography>All Day</Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="allDay"
                  control={control}
                  
                  render={({ field }) => <FormControlLabel control={<Switch {...field} size="small"/> }/> }
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
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default NewEventContainer