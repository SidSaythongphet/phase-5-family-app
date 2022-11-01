import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Avatar, Divider, Grid, Typography, TextField } from '@mui/material';
import { CirclePicker } from 'react-color';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserLogin = ({ user, setUser, familyMembers, onAddMember, family, openUserSelect, onOpenUsers }) => {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("")
  const [selectedValue, setSelectedValue] = useState('');

  const { register, setValue, handleSubmit, control } = useForm({
    name: "",
    color: color,
    family_id: family.id
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (user) return setSelectedValue(familyMembers.find(member => member.id === user.id))
  }, [user])

  const handleClose = () => {
    onOpenUsers(false);
  };

  const handleChange = (event) => {
    const selected = familyMembers.find(user => user.name === event.target.value)
    setSelectedValue(selected);
  };

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
      onAddMember(data)
      navigate("/")
      onOpenUsers(false)
    } else {
      console.log(data.errors)
    }
  }

  const handleChooseUser = async e => {
    e.preventDefault()
    console.log(selectedValue)
    const response = await fetch('/api/user_login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          id: selectedValue.id,
          name: selectedValue.name
        }
      })
    })
    const data = await response.json()
    if (response.ok) {
      setUser(data)
      onOpenUsers(false)
      navigate("/")
    } else {
      console.log("error")
    }
  }

  const handleColorChange = (color) => {
    setValue("color", color.hex)
  }


  return (
    <>
      <Dialog
        //open if user does not exist
        open={ openUserSelect }
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="xl"
      >
        <Box
          minWidth="800px"
          height="500px"
          padding="100px"
          bgcolor= "rgba(187, 189, 190, 0.486)"
        >
          <Button onClick={ (e) => onOpenUsers(false) }>X</Button>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <Typography variant='h3' textAlign="center" gutterBottom>{ family.last_name }</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <FormControl>
                <RadioGroup>
                  <Grid container justifyContent="center">
                    {
                      familyMembers.map(user => {
                        return (
                          <Grid container item xs={2} key={ user.id }>
                            <Grid container item xs={12} justifyContent="center">
                              <Avatar sx={{ bgcolor: user.color, width: 56, height: 56 }}/>
                            </Grid>
                            <Grid container item xs={12} justifyContent="center">
                              <FormControlLabel 
                                value={ user.name } 
                                label={ user.name }
                                labelPlacement="top"
                                control={ 
                                  <Radio
                                    checked={selectedValue.name === user.name}
                                    onChange={handleChange}
                                    value={ user.name } 
                                    name={ user.name } 
                                  />
                                } 
                              />
                            </Grid>
                          </Grid>
                        )
                      }) 
                    }
                  </Grid>
                </RadioGroup>
              </FormControl>  
              </Grid>        
            <Grid item xs={12} container spacing={1} justifyContent="center">
            {
              show
              ?
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("family_id")} type="hidden" />
                  <Grid container spacing={1} >
                    <Grid item> 
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
                    </Grid> 
                    <Grid item> 
                      <CirclePicker 
                        colors={[ "red", "orange", "green", "blue", "purple", "violet" ]}
                        color={ color }
                        onChange={ handleColorChange }
                      />
                    </Grid>
                    <Grid item> 
                      <Button variant="contained" type='submit'>Add</Button>
                    </Grid>
                    <Grid item> 
                      <Button variant="contained" onClick={ e => setShow(!show) }>Cancel</Button>
                    </Grid>
                  </Grid>
                </form>
              </>
              :
              <>
                <Grid item> 
                  <Button variant="contained" onClick={ e => setShow(!show) }>Add Family Member</Button>
                </Grid>
                <Grid item> 
                  <Button variant="contained" onClick={handleChooseUser}>Submit</Button>
                </Grid>              
              </>
            }
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  )
}

export default UserLogin