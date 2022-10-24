import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

const Login = ({ loggedIn, setLoggedIn, setFamily }) => {
  const { register, handleSubmit } = useForm()
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
      setFamily(data)
      navigate("/")
      setLoggedIn(true)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email"{...register("email", { required: true })} />
        <input placeholder="Password" type="password"{...register("password", { required: true, maxLength: 20 })} />
        <input type="submit" />
      </form>
      <h1> or Sign Up </h1>
      <SignUp />
    </div>
  )
}

export default Login