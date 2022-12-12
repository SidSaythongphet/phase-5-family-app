import { Grid, Paper } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { FamilyContext } from '../context/family'
import { UserContext } from '../context/user'
import MemberTab from './MemberTab'

const TabContainer = ({ targetMember, setTargetMember }) => {
  const { members } = useContext(FamilyContext)
  const { user } = useContext(UserContext)

  const renderTabs = () => {
    const tabs = members.map(member => {
      if (member.id === user.id) return
      return (
        <MemberTab key={ member.id } member={ member } targetMember={ targetMember } setTargetMember={ setTargetMember } />
      )
    })
    return tabs
  }

  return (
    <>
      <Grid container alignItems="end">
        { members.length > 1 ? renderTabs() : null }
      </Grid>
    </>
  )
}

export default TabContainer