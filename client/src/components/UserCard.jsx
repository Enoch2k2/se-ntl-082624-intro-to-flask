import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'

const UserCard = ({ user }) => {
  return (
    <ListItem button component={RouterLink} to={`/users/${user.id}`}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={user.username} />
    </ListItem>
  )
}

export default UserCard