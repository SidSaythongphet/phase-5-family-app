import React, { useEffect, useState, useContext } from 'react';
import { Controller, useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import { CirclePicker } from 'react-color';
import { FamilyContext } from '../../context/family';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';

const NewUserForm = ({ show, setShow }) => {
  const { family, members, setMembers } = useContext(FamilyContext)
  const { setUser } = useContext(UserContext)
  const [color, setColor] = useState("")

  const navigate = useNavigate()
  
  const { register, setValue, handleSubmit, control, reset, formState, formState: { isSubmitSuccessful }  } = useForm({
    defaultValues: {
      name: "",
      color: color,
      family_id: family.id
    }
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: "",
        color: color,
        family_id: family.id
      })
    }
  }, [formState, reset])

  const onSubmit = async form => {
    setValue("family_id", family.id)

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()
    if (response.ok) {
      setUser(data)
      setMembers([...members, data])
      setColor("")
      navigate(`/${family.last_name}/${form.name}`)
    } else {
      console.log(data.errors)
    }
  }

  const handleColorChange = (color) => {
    setValue("color", color.hex)
  }

  // color codes = red, orange, green, blue, purple, violet
  const colors = [ "#b72803", "#efac28", "#336a29", "#06334b", "#5d3b78", "#b85985" ]

  const availableColors = () => {
    let availableColors = []

    colors.forEach(color => {
      if (!members.find(member => member.color === color)) {
        availableColors.push(color)
      }
    })
    return availableColors
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("family_id")} type="hidden" />
      <Grid container rowSpacing={2} width="25vw">
        <Grid item xs={12} container justifyContent="center"> 
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
                fullWidth
                sx={{ bgcolor: "white" }}
              />
            )}
          />
        </Grid> 
        <Grid item xs={12} container justifyContent="center"> 
          <CirclePicker 
            colors={ availableColors() }
            color={ color }
            onChange={ handleColorChange }
          />
        </Grid>
        <Grid item container justifyContent="space-between"> 
          <Grid item xs={5}> 
            <Button variant="contained" type='submit' color="success" sx={{ width: "100%"}}>Add</Button>
          </Grid>
          <Grid item xs={5}> 
            <Button variant="contained" color="error" sx={{ width: "100%"}} onClick={ e => setShow(!show) }>Cancel</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default NewUserForm