import React, { useEffect, useState, useContext } from 'react';
import { Controller, useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Avatar, Divider, Grid, Typography, TextField, Skeleton } from '@mui/material';
import { CirclePicker } from 'react-color';
import { FamilyContext } from '../context/family';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserLogin = () => {
  const { family, members, setMembers } = useContext(FamilyContext)
  const { user, setUser } = useContext(UserContext)
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(true)
  const [color, setColor] = useState("")
  const [selectedValue, setSelectedValue] = useState('');

  const navigate = useNavigate()
  
  const { register, setValue, handleSubmit, control } = useForm({
    name: "",
    color: color,
    family_id: family.id
  })
  
  useEffect(() => {
    if (user && members) return setSelectedValue(members.find(member => member.id === user.id))
  }, [user, members])
  
  if (!members) return <Skeleton />

  const handleChange = (event) => {
    const selected = members.find(user => user.name === event.target.value)
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
      setMembers([...members, data])
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
      setOpen(false)
      navigate(`/family/${family.last_name}/${family.id}`)
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
        open={ open }
        TransitionComponent={Transition}
        keepMounted
        onClose={ () => navigate(`/family/${family.last_name}/${family.id}`) }
        fullWidth
        maxWidth="xl"
      >
        <Box
          minWidth="800px"
          height="500px"
          padding="100px"
          bgcolor= "rgba(187, 189, 190, 0.486)"
        >
          <Grid container justifyContent="end">
            <Button onClick={ () => navigate(`/family/${family.last_name}/${family.id}`) }>X</Button>
          </Grid>
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
                      members.map(user => {
                        return (
                          <Grid container item xs={4} key={ user.id }>
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