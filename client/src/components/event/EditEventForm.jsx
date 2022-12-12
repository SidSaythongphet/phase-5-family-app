import React, { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Grid, TextField, Typography, ButtonGroup } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { FamilyContext } from '../context/family';
import CreateNewDrawer from '../popup/CreateNewDrawer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from '@mui/material/Switch';

const EditEventForm = ({ open, setOpen, onUpdateEvent, eventInfo }) => {
  const { user } = useContext(UserContext)
  
  const { handleSubmit, control, reset, formState, formState: { isSubmitSuccessful } } = useForm({
    defaultValues: {
      title: '',
      start: null,
      end: null,
      allDay: false,
      note: '',
      user_id: user.id
    }
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        title: '',
        start: null,
        end: null,
        allDay: false,
        note: '',
        user_id: user.id
      })
    }

  }, [formState, reset])

  useEffect(() => {
    if (eventInfo) {
      const { title, allDay, start, end, note } = eventInfo
      reset({
        title: title,
        start: new Date(start),
        end: new Date(end),
        allDay: allDay,
        note: note,
        user_id: user.id
      })
    }

  }, [eventInfo])

  const onSubmit = async form => {
    // throw error if date combination is invalid
    if (new Date(form.start) > new Date(form.end)) {
      console.log("error")
      return
    }

    const response = await fetch(`/api/events/${eventInfo.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    if (response.ok) {
      onUpdateEvent(data)
      setOpen(false)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <CreateNewDrawer item="Edit Event" open={ open } setOpen={ setOpen }>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Grid container height="47vh">
          <Grid item xs={12} margin="10px">
            <Controller 
              control={ control }
              name="title"
              rules={{ required: true }} 
              render={({ 
                field: { onChange, onBlur, value, ref } }) => (
                  <TextField 
                    label="Event Title"
                    fullWidth
                    value={ value }
                    onChange={ onChange }
                    onBlur={ onBlur }
                    inputRef={ ref }
                    size="small"
                  />
                )
              }
            />
          </Grid>
          <Grid item container rowSpacing={1} justifySelf="flex-start">
            <Grid item xs={5} margin="10px">
              <Typography>All Day</Typography>
            </Grid>
            <Grid item xs={5} margin="10px">
              <Controller
                name="allDay"
                control={control}                
                render={({ field }) => 
                  <FormControlLabel control={ <Switch {...field} size="small"/> } /> 
                }
              />
            </Grid>
            <Grid item xs={5} margin="10px">
              <Typography>Start</Typography>
            </Grid>
            <Grid item xs={5} margin="10px">
              <Controller
                control={ control }
                name="start"
                rules={{ required: true }}
                render={({ 
                  field: { onChange, onBlur, value, ref } }) => (
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
                  )
                }
              />
            </Grid>
            <Grid item xs={5} margin="10px">
              <Typography>End</Typography>
            </Grid>
            <Grid item xs={5} margin="10px">
              <Controller
                control={ control }
                name="end"
                rules={{ required: true }}
                render={({ 
                  field: { onChange, onBlur, value, ref } }) => (
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
                  )
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} margin="10px">
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
          <Grid item container>
            <ButtonGroup size="small" fullWidth>
              <Button type="submit" variant='contained'>Update</Button>
              <Button variant='contained' onClick={ () => setOpen(false) }>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </CreateNewDrawer>
  )
}

export default EditEventForm