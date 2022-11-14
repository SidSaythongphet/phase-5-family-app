import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FamilyContext } from '../context/family';

import { Button, Grid, Typography, Drawer } from '@mui/material';

const CreateNewDrawer = ({ children, item }) => {
  const [open, setOpen] = useState(true);
  const { family } = useContext(FamilyContext)

  const navigate = useNavigate()

  return (
    <Drawer
      anchor='left'
      open={ open }
      onClose={ () => navigate(`/family/${family.last_name}/${family.id}`) }
      PaperProps={{ square: false, sx: { width: "25vw",  height: "50vh", overflow: "hidden" } }}
      SlideProps={{ appear: true }}
  
    >
      <Grid container height="100%" width= "100%" direction="column" justifyContent="flex-start">
        <Grid item container alignItems="center" justifyContent="space-between" sx={{ backgroundColor: "primary.light", height: "3vh" }}>
          <Grid item xs={10}>
            <Typography gutterBottom textAlign="center">New { item }</Typography>
          </Grid>
          <Grid item xs={2} alignSelf="flex-start" justifySelf="flex-end">
            <Button size="small" sx={{ color: "primary.dark", padding: 0 }} onClick={ () => navigate(`/family/${family.last_name}/${family.id}`) }>X</Button>
          </Grid>
        </Grid>
        { children }
        </Grid>
    </Drawer>
  )
}

export default CreateNewDrawer