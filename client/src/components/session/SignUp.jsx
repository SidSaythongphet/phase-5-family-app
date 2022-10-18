import React from 'react';
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="First Name"{...register("firstName", { required: true, maxLength: 20 })} />
        <input placeholder="Last Name"{...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} />
        <input placeholder="Password"{...register("password", { required: true, maxLength: 20 })} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default SignUp