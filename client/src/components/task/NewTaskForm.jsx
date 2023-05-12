import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Grid, TextField, FormControl, Checkbox, FormGroup } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { FamilyContext } from '../context/family';
import CreateNewDrawer from '../popup/CreateNewDrawer';
import { useNavigate } from 'react-router-dom';



const NewTaskForm = ({ open, setOpen, onAddTask }) => {
  const { family, members } = useContext(FamilyContext)
  const { user } = useContext(UserContext)
  const [checkedUsers, setCheckedUsers] = useState([user.id])
  const navigate = useNavigate()

  const { handleSubmit, control, setValue, getValues, reset, formState, formState: { isSubmitSuccessful } } = useForm({
    defaultValues: {
      title: '',
      user_ids: checkedUsers
    }
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        title: '',
        user_ids: checkedUsers
      })
    }
  }, [formState, reset])

  useEffect(() => {
    setValue("user_ids", checkedUsers)
  }, [checkedUsers])

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
      console.log(data)
      onAddTask(data)
      setCheckedUsers([user.id])
      setOpen(false)
      navigate(`/${family.last_name.toLowerCase()}/tasks`)
    } else {
      console.log(data.errors)
    }
  }

  const handleCheckUser = (e) => {
    if (checkedUsers.includes(parseInt(e.target.value))) {
      setCheckedUsers(checkedUsers.filter(id => parseInt(id) !== parseInt(e.target.value)))
    } else {
      setCheckedUsers([...checkedUsers, parseInt(e.target.value)])
    }
  }

  return (
    <CreateNewDrawer item="task" title="New Task" open={ open } setOpen={ setOpen }>
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
                  name="user_ids"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup row={ true } {...field}>
                      { members.map((member => (
                        <FormControlLabel 
                        name={ member.name }
                        value={ member.id }
                        control={ <Checkbox checked={ checkedUsers.includes(member.id) } onChange={ handleCheckUser }/> }
                        label={ member.name }
                        key={member.id }
                        />
                      )))}
                    </FormGroup>  
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