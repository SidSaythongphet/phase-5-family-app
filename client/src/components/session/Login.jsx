import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField } from '@mui/material';

const Login = ({ onLogIn, loggedIn }) => {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn === true) {
      navigate("/")
    }
  }, [loggedIn])

  const onSubmit = async form => {

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    if (response.ok) {
      onLogIn(data)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            control={ control }
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField 
              placeholder="Email"
              value={ value }
              onChange={ onChange }
              onBlur={ onBlur }
              inputRef={ ref }
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
              />
            )}
          />
          {/* <input placeholder="Email"{...register("email", { required: true })} /> */}
          {/* <input placeholder="Password" type="password"{...register("password", { required: true, maxLength: 20 })} /> */}
          <Button type='submit'>Log In</Button>
        </Stack>
      </form>
    </>
  )
}

export default Login