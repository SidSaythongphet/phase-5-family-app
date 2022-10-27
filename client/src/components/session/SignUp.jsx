import React from 'react';
import { useForm } from "react-hook-form";

const SignUp = ({ onLogIn }) => {
  const { register, handleSubmit } = useForm()

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
        <input placeholder="Last Name"{...register("last_name", { required: true, pattern: /^[A-Za-z]+$/i })} />
        <input placeholder="Email"{...register("email", { required: true })} />
        <input placeholder="Password" type="password"{...register("password", { required: true, maxLength: 20 })} />
        <input placeholder="Password Confirmation" type="password"{...register("password_confirmation", { required: true, maxLength: 20 })} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default SignUp