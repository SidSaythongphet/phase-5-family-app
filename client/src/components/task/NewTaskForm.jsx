import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button, Divider, Grid, TextField, Typography, Box, Drawer, Radio, RadioGroup, FormControl } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { EventContext } from '../context/event';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';
import { FamilyContext } from '../context/family';



const NewTaskForm = () => {
  const { family } = useContext(FamilyContext)
  const { user } = useContext(UserContext)
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: '',
      task_for_type: '',
      task_for_id: ''
    }
  })

  if( !family || !user ) return null

  const onSubmit = async form => {
    console.log(form)

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    if (response.ok) {
      console.log(data)
    } else {
      console.log(data.errors)
    }
  }

  const options = [
    {
      name: user.name,
      id: user.id,
      type: "User"
    },
    {
      name: family.last_name,
      id: family.id,
      type: "Family"
    }
  ]

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <Grid container >
        <Grid item xs={12} container justifyContent="space-between">
          <Grid item xs={10}>
            <Typography gutterBottom textAlign="center" sx={{ margin: "5px" }}>New Task</Typography>
          </Grid>
          <Grid item xs={1} justifyContent="end">
            <Button>X</Button>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <Controller 
              control={ control }
              name="title"
              rules={{ required: true }} 
              render={
                ({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField 
                    label="Add Title"
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
          <FormControl required component="fieldset">
            {/* <RadioGroup>
              <FormControlLabel 
                value={ user.id } 
                label={ user.name }
                labelPlacement="top"
                control={ 
                  <Radio
                    onChange={ handleChange }
                    value={ user.id } 
                    name={ user.name } 
                  />
                } 
              />
            </RadioGroup> */}
            <Controller 
              name="task_for_type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field} row >
                  { options.map((option => (
                    <FormControlLabel 
                      value={ option.type }
                      control={<Radio onChange={ () => setValue("task_for_id", option.id)}/> }
                      label={ option.name }
                      key={ option.type }
                    />
                  )))}
                </RadioGroup>
              )}
            />
          </FormControl>
          <Grid item xs={6} container justifyContent="end">
            <Button type="submit" variant='contained'>Save</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default NewTaskForm