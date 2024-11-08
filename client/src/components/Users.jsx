import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(resp => resp.json())
      .then(data => setUsers(data))
  }, [])

  const userCards = users.map(user => <UserCard key={user.id} user={user} />)

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ 
        border: '1px solid', 
        borderColor: 'grey.400', 
        borderRadius: 2, 
        padding: 2, 
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant="h6" gutterBottom>
          User List
        </Typography>
      </Box>
      <List>
        {userCards}
      </List>
    </Box>
  )
}

export default Users