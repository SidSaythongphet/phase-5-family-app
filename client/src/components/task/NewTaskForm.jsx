import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Grid, TextField, Radio, RadioGroup, FormControl } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { FamilyContext } from '../context/family';
import CreateNewDrawer from '../popup/CreateNewDrawer';
import { useNavigate } from 'react-router-dom';



const NewTaskForm = ({ open, setOpen, onAddTask }) => {
  const { family } = useContext(FamilyContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const { handleSubmit, control, setValue, reset, formState, formState: { isSubmitSuccessful } } = useForm({
    defaultValues: {
      title: '',
      task_for_type: '',
      task_for_id: ''
    }
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        title: '',
        task_for_type: '',
        task_for_id: ''
      })
    }
  }, [formState, reset])

  if( !family || !user ) return null

  const onSubmit = async form => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    if (response.ok) {
      onAddTask(data)
      setOpen(false)
      navigate(`/${family.last_name.toLowerCase()}/tasks`)
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
    <CreateNewDrawer item="Task" open={ open } setOpen={ setOpen }>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Grid container height="22vh">
          <Grid item xs={12} container justifyContent="center">
            <Grid item xs={12} margin= "15px">
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
            <Grid item xs={12} container justifyContent="center">
              <FormControl required component="fieldset">
                <Controller 
                  name="task_for_type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup {...field} >
                      { options.map((option => (
                        <FormControlLabel 
                        value={ option.type }
                        control={ <Radio onChange={ () => setValue("task_for_id", option.id)}/> }
                        label={ option.name }
                        key={ option.type }
                        />
                        )))}
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button size="small" type="submit" variant='contained' sx={{ width: "100%" }}>Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </CreateNewDrawer>
  )
}

export default NewTaskForm