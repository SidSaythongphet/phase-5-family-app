import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Grid, TextField, Radio, RadioGroup, FormControl, Typography, ButtonGroup } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { FamilyContext } from '../context/family';
import CreateNewDrawer from '../popup/CreateNewDrawer';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from '@mui/material/Switch';

const NewEventForm = ({ open, setOpen, onAddEvent }) => {
  const { family } = useContext(FamilyContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

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
      onAddEvent(data)
      setOpen(false)
      navigate(`/${family.last_name.toLowerCase()}/events`)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <CreateNewDrawer item="Event" open={ open } setOpen={ setOpen }>
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
              <Button type="submit" variant='contained'>Add</Button>
              <Button variant='contained' onClick={ () => navigate(`/family/${family.last_name}/${family.id}`) }>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </CreateNewDrawer>
  )
}

export default NewEventForm