import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Divider, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SignUp = ({ onLogIn }) => {
  const { handleSubmit, control } = useForm()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      onLogIn(data)
    } else {
      console.log(data.errors)
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
                    rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextField 
                      placeholder="First name"
                      value={ value }
                      onChange={ onChange }
                      onBlur={ onBlur }
                      inputRef={ ref }
                      size="small"
                      />
                    )}
                  />
                  <Controller
                    control={ control }
                    name="last_name"
                    rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextField 
                      placeholder="Last name"
                      value={ value }
                      onChange={ onChange }
                      onBlur={ onBlur }
                      inputRef={ ref }
                      size="small"
                      />
                    )}
                  />
                </Stack>
                <Controller
                  control={ control }
                  name="email"
                  rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField 
                    placeholder="Email"
                    value={ value }
                    onChange={ onChange }
                    onBlur={ onBlur }
                    inputRef={ ref }
                    size="small"
                    />
                  )}
                />
                <Controller
                  control={ control }
                  name="password"
                  rules={{ required: true, maxLength: 20 }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField 
                    placeholder="Password"
                    type="password"
                    value={ value }
                    onChange={ onChange }
                    onBlur={ onBlur }
                    inputRef={ ref }
                    size="small"
                    />
                  )}
                />
                <Controller
                  control={ control }
                  name="password_confirmation"
                  rules={{ required: true, maxLength: 20 }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField 
                    placeholder="Confirm password"
                    type="password"
                    value={ value }
                    onChange={ onChange }
                    onBlur={ onBlur }
                    inputRef={ ref }
                    size="small"
                    />
                  )}
                />
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