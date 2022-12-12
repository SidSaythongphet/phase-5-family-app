import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FamilyContext } from '../context/family';
import { Button, Grid, Typography, Drawer } from '@mui/material';
import { UserContext } from '../context/user';

const CreateNewDrawer = ({ children, item, title, open, setOpen }) => {
  const { family } = useContext(FamilyContext)
  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
    navigate(`/${family.last_name.toLowerCase()}/${item.toLowerCase()}s`)
  }

  const height = item === "Task" ? "25vh" : "50vh"

  return (
    <Drawer
      anchor='top'
      open={ open }
      onClose={ handleClose }
      PaperProps={{ square: false, sx: { width: "78vw",  height: { height }, overflow: "hidden", position: "absolute", marginTop: "6vh", marginLeft: "21vw" } }}
      SlideProps={{ appear: true }}
    >
      <Grid container height="100%" width= "100%" direction="column" justifyContent="flex-start">
        <Grid item container alignItems="center" justifyContent="space-between" sx={{ backgroundColor: "primary.light", height: "3vh" }}>
          <Grid item xs={12}>
            <Typography gutterBottom textAlign="center" color="white">{ title }</Typography>
          </Grid>
        </Grid>
        { children }
        </Grid>
    </Drawer>
  )
}

export default CreateNewDrawer