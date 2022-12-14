import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { FamilyContext } from '../context/family';
import { useState } from 'react';

const Login = () => {
  const {setFamily, setMembers, auth, setAuth} = useContext(FamilyContext)
  const { handleSubmit, control } = useForm({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (auth === true) {
      navigate("/")
    }
  }, [auth, navigate])

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
      setFamily(data)
      setMembers(data.users)
      setAuth(true)
      navigate(`/${data.last_name}/users`)
    } else {
      setError(data.errors)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Controller
            control={ control }
            name="email"
            rules={{ required: true }}
            defaultValue=""
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
            defaultValue=""
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
          <Typography variant='body2' color="red" textAlign="center">{ error }</Typography>
          <Button variant="contained" type='submit'>Log In</Button>
        </Stack>
      </form>
    </>
  )
}

export default Login