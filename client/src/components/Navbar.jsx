import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({currentUser, loggedIn, logoutUser}) => {

  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    fetch('/api/logout', {
      method: "DELETE"
    })

    logoutUser()
    navigate("/signup")
  }

  const loggedInLinks = <>
    <li><Link to="/users">View Users</Link></li>
    <li><Link to="/playlists">View Playlists</Link></li>
    <li><Link to="/playlists/new">Create Playlist</Link></li>
    <li><Link to="/songs">View Songs</Link></li>
    <li><Link to="/songs/new">Create Song</Link></li>
    <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
    <li>{ currentUser.username }</li>
  </>

  const loggedOutLinks = <>
    <li><Link to="/signup">Signup</Link></li>
    <li><Link to="/login">Login</Link></li>
  </>

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      
      { loggedIn ? loggedInLinks : loggedOutLinks }
    </ul>
  )
}

export default Navbar