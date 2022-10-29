import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, Stack, TextField } from '@mui/material';

const SignUp = ({ onLogIn }) => {
  const { handleSubmit, control } = useForm()

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
      onLogIn(data)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input placeholder="Last Name"{...register("last_name", { required: true, pattern: /^[A-Za-z]+$/i })} />
        <input placeholder="Email"{...register("email", { required: true })} />
        <input placeholder="Password" type="password"{...register("password", { required: true, maxLength: 20 })} />
        <input placeholder="Password Confirmation" type="password"{...register("password_confirmation", { required: true, maxLength: 20 })} />
        <input type="submit" /> */}
        <Stack>
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
              />
            )}
          />
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
              />
            )}
          />
          <Button type='submit'>Log In</Button>
        </Stack>
      </form>
    </div>
  )
}

export default SignUp