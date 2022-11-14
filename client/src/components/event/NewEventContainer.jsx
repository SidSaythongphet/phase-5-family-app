import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button, Divider, Grid, TextField, Typography, Box, Drawer, ButtonGroup } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { EventContext } from '../context/event';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';
import { FamilyContext } from '../context/family';
import CreateNewDrawer from '../popup/CreateNewDrawer';

const NewEventContainer = () => {
  const { allEvents, setAllEvents, filteredEvents, setFilteredEvents } = useContext(EventContext)
  const { family } = useContext(FamilyContext)
  const { user } = useContext(UserContext)
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  
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

  if (!user) return null

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
      navigate(`/family/${family.last_name}/${family.id}`)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <>
    {/* <Drawer
      anchor='left'
      open={ open }
      onClose={ () => navigate(`/family/${family.last_name}/${family.id}`) }
      PaperProps={{ square: false, sx: { width: "25vw",  height: "50vh", overflow: "hidden" } }}
      SlideProps={{ appear: true }}
      
    >
      <Grid container height="100%" width= "100%" direction="column" justifyContent="flex-start">
        <Grid item container alignItems="center" justifyContent="space-between" sx={{ backgroundColor: "primary.light", height: "3vh" }}>
          <Grid item xs={10}>
            <Typography gutterBottom textAlign="center">New Event</Typography>
          </Grid>
          <Grid item xs={2} alignSelf="flex-start" justifySelf="flex-end">
            <Button size="small" sx={{ color: "primary.dark", padding: 0 }} onClick={ () => navigate(`/family/${family.last_name}/${family.id}`) }>X</Button>
          </Grid>
        </Grid> */}
        <CreateNewDrawer item="Event">


          <form onSubmit={ handleSubmit(onSubmit) }>
        <Grid item container direction="column" justifyContent="space-between" sx={{ height: "47vh" }}>
              <Grid item margin="10px" sx={{ bgcolor: "lightgray" }}>
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
              <Grid item margin="10px" sx={{ bgcolor: "lightgray" }}>
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
      {/* </Grid>
    </Drawer> */}
    </>
  );
}

export default NewEventContainer