import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { FamilyContext } from '../context/family';

const Login = () => {
  const {setFamily, setMembers, auth, setAuth} = useContext(FamilyContext)
  const { handleSubmit, control } = useForm({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (auth === true) {
      navigate("/")
    }
  }, [auth, navigate])

  const onSubmit = async form => {
    setIsLoading(true)

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
      setErrors(data.errors)
      setIsLoading(false)
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
          <Button variant="contained" type='submit'>Log In</Button>
          { isLoading ? <LinearProgress /> : null }
          { errors ? <Typography sx={{ color: "red", fontStyle: "italic" }} textAlign="center">{ errors }</Typography> : null}
        </Stack>
      </form>
    </>
  )
}

export default Login