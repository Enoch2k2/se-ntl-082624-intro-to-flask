import React, { useContext } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { UsersContext } from '../context/UsersContext'

const Navbar = () => {
  const navigate = useNavigate()

  const { currentUser, loggedIn, logoutUser } = useContext(UsersContext)

  const handleLogout = (e) => {
    e.preventDefault()
    fetch('/api/logout', {
      method: "DELETE"
    })

    logoutUser()
    navigate("/signup")
  }

  const loggedInLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/users">View Users</Button>
      <Button color="inherit" component={RouterLink} to="/playlists">View Playlists</Button>
      <Button color="inherit" component={RouterLink} to="/playlists/new">Create Playlist</Button>
      <Button color="inherit" component={RouterLink} to="/songs">View Songs</Button>
      <Button color="inherit" component={RouterLink} to="/songs/new">Create Song</Button>
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {currentUser.username}
      </Typography>
    </>
  )

  const loggedOutLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/signup">Signup</Button>
      <Button color="inherit" component={RouterLink} to="/login">Login</Button>
    </>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Home
        </Typography>
        {loggedIn ? loggedInLinks : loggedOutLinks}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar