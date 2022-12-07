import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Typography, Skeleton, IconButton } from '@mui/material';
import { FamilyContext } from '../../context/family';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import UserRadio from './UserRadio';
import NewUserForm from './NewUserForm';
import NewUserButton from './NewUserButton';

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
  
  useEffect(() => {
    if (user && members) return setSelectedValue(members.find(member => member.id === user.id))
  }, [user, members])
  
  if (!members) return <Skeleton />

  const handleChange = (event) => {
    if (event.target.value) {
      const selected = members.find(user => user.name === event.target.value)
      setSelectedValue(selected);
      setShow(false)
    } else if (event.target.id) {
      const selected = members.find(user => user.name === event.target.id)
      setSelectedValue(selected);
      setShow(false)
    }
  };

  const handleChooseUser = async e => {
    e.preventDefault()

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
      navigate(`/${family.last_name}/${selectedValue.name}`)
    } else {
      console.log("error")
    }
  }

  const handleOnClose = () => {
    if (!user) return

    setOpen(false)
    navigate(`/${family.last_name}/${user.name}`)
  }

  return (
    <>
      <Dialog
        open={ open }
        TransitionComponent={Transition}
        keepMounted
        onClose={ handleOnClose }
        fullWidth
        maxWidth="xl"
      >
        <Box
          minWidth="800px"
          height="90vh"
          bgcolor= "rgba(187, 189, 190, 0.486)"
        >
          <Grid container justifyContent="end" height="100%"> 
            <Grid item xs={12} container height="4%" sx={{ bgcolor: "darkgrey", borderBottom: 1, borderBlockColor: "black" }} direction="row-reverse" alignItems="center">
              <IconButton onClick={ handleOnClose } size="small" sx={{ height: "100%" }}><CloseIcon/></IconButton>
            </Grid>
            <Grid item xs={12} container height="96%" justifyContent="center">
              <Grid item xs={12} container justifyContent="center" alignItems="end" height="20%">
                <Typography variant='h3' gutterBottom marginTop="3%">{ family.last_name }</Typography>
              </Grid>
              <Grid item xs={12} container justifyContent="center"sx={{ width: "100%", height: "50%", paddingTop: "10%" }}>
                <FormControl sx={{ width: "100%", height: "100%" }}>
                  <RadioGroup>
                    <Grid container justifyContent="center">
                      { members.map(user => <UserRadio key={ user.id } user={ user } selectedValue={ selectedValue } onUserSelect={ handleChange }/>) }
                      { members.length > 6 ? null : <NewUserButton show={ show } setShow={ setShow } /> }
                    </Grid>
                  </RadioGroup>
                </FormControl>  
              </Grid>        
              <Grid item xs={12} container justifyContent="center" sx={{ height: "30%" }}>
                {
                  show
                  ?
                  <NewUserForm show={ show } setShow={ setShow } />
                  :
                  <>
                    <Grid item> 
                      <Button variant="contained" onClick={handleChooseUser} sx={{ width: "10vw" }}>Submit</Button>
                    </Grid>              
                  </>
                }
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  )
}

export default UserLogin