import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserLogin = ({ user, setUser, familyMembers, onAddMember, family }) => {
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const { register, setValue, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    // User Login menu is opened either when:
    // 1. No user ID in session
    // 2. Switching User button
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    const selected = familyMembers.find(user => user.name === event.target.value)
    setSelectedValue(selected);
  };

  const onSubmit = async form => {
    setValue("family_id",family.id )

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
      setOpen(false)
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
      navigate("/")
    } else {
      console.log("error")
    }
  }

  return (
    <>
      <Dialog
        //open if user does not exist
        open={!user}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{ family.last_name }</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
            >
              {
                familyMembers.map(user => {
                  return (
                    <FormControlLabel 
                    value={ user.name } 
                    control={ 
                      <Radio
                        checked={selectedValue.name === user.name}
                        onChange={handleChange}
                        value={ user.name } 
                        name={ user.name } 
                        inputProps={{ 'aria-label': 'A' }}
                      />
                    } 
                    label={ user.name } 
                    key={ user.id } />
                  )
                }) 
              }
            </RadioGroup>
          </FormControl>          
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setShow(!show) }>Add Family Member</Button>
          <Button onClick={handleChooseUser}>Submit</Button>
        </DialogActions>
        {
          show
          ?
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input placeholder="First Name"{...register("name", { required: true, pattern: /^[A-Za-z]+$/i })} />
              <input {...register("family_id")} type="hidden" />
              <input type="submit"/>
            </form>
          </DialogContent>
          :
          null
        }
      </Dialog>
    </>
  )
}

export default UserLogin