import React, { useState, useContext, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FamilyContext } from '../context/family';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {setFamily, setMembers, setAuth} = useContext(FamilyContext)
  const { handleSubmit, control, watch, formState: { errors, isSubmitSuccessful }, reset, formState } = useForm({
    defaultValues: {
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  })
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    }
  }, [formState, reset])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset({
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
  };

  const onSubmit = async form => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    if (response.ok) {
      setOpen(false)
      setFamily(data)
      setMembers(data.users)
      setAuth(true)
      navigate(`/${data.last_name}/users`)
    } 
  }

  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Create New Account
      </Button>
      <Dialog open={ open } onClose={ handleClose } >
        <Box
          bgcolor="white"
          borderRadius="25px"
          minWidth="400px"
        >
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>It's quick and easy!</DialogContentText>
            <br/>
            <Divider/>
            <br/>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                  <Controller
                    control={ control }
                    name="name"
                    rules={{
                      required: "First Name is required",
                      pattern: {
                        value: /^[A-Za-z\-]+$/i,
                        message: "Invalid",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextField 
                        placeholder="First name"
                        value={ value }
                        onChange={ onChange }
                        onBlur={ onBlur }
                        inputRef={ ref }
                        size="small"
                        error={Boolean(errors.name)}
                        helperText={errors.name ? errors.name.message : ""}
                      />
                    )}
                  />
                  <Controller
                    control={ control }
                    name="last_name"
                    rules={{
                      required: "Last Name is required",
                      pattern: {
                        value: /^[A-Za-z\-]+$/i,
                        message: "Invalid",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextField 
                      placeholder="Last name"
                      value={ value }
                      onChange={ onChange }
                      onBlur={ onBlur }
                      inputRef={ ref }
                      size="small"
                      error={Boolean(errors.last_name)}
                      helperText={errors.last_name ? errors.last_name.message : ""}
                      />
                    )}
                  />
                </Stack>
                <Controller
                  control={ control }
                  name="email"
                  rules={{
                    required: "Email Address is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField 
                    placeholder="Email"
                    value={ value }
                    onChange={ onChange }
                    onBlur={ onBlur }
                    inputRef={ ref }
                    size="small"
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
                <Controller
                  control={ control }
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be 4-20 characters "
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be 4-20 characters "
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField 
                      placeholder="Password"
                      type="password"
                      value={ value }
                      onChange={ onChange }
                      onBlur={ onBlur }
                      inputRef={ ref }
                      size="small"
                      error={Boolean(errors.password)}
                      helperText={errors.password ? errors.password.message : ""}
                    />
                  )}
                />
                <Controller
                  control={ control }
                  name="password_confirmation"
                  rules={{
                    required: "Password Confirmation is required",
                    validate: (value) => {
                      if (watch('password') != value) {
                        return "Passwords do no match";
                      }
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField 
                      placeholder="Confirm password"
                      type="password"
                      value={ value }
                      onChange={ onChange }
                      onBlur={ onBlur }
                      inputRef={ ref }
                      size="small"
                      error={Boolean(errors.password_confirmation)}
                      helperText={errors.password_confirmation ? errors.password_confirmation.message : ""}
                    />
                  )}
                />
                {/* <Typography variant='body2' color="red" textAlign="center">{ error }</Typography> */}
                <Button variant="contained" color="success" type='submit'>Sign Up</Button>
              </Stack>
            </form>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}

export default SignUp