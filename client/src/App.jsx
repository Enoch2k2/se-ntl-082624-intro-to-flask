import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Playlist from './components/Playlist'
import PlaylistForm from './components/PlaylistForm'
import PlaylistDetails from './components/PlaylistDetails'
import Signup from './components/Signup'
import Login from './components/Login'
import Users from './components/Users'
import UserDetails from './components/UserDetails'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/check-current-user')
      .then(resp => {
        if (resp.status == 200) {
          resp.json().then(data => {
            loginUser(data)
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    }, [])
    
    const loginUser = (user) => {
      setCurrentUser(user)
      setLoggedIn(true)
  }
  
  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
  }

  const addPlaylist = playlist => {
    // updating the user's playlist
    // add to currentUsers playlist (non destructively)
    const pl = [...currentUser.playlists, playlist]
    // update currentUser (non destructively)
    const updatedCurrentUser = {
      ...currentUser,
      playlists: pl
    }
    setCurrentUser(updatedCurrentUser)
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logoutUser={logoutUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/playlists" element={<Playlist playlists={ currentUser.playlists } loggedIn={loggedIn} loading={loading} />} />
        <Route path="/playlists/new" element={<PlaylistForm addPlaylist={ addPlaylist } />} />
        <Route path="/playlists/:id" element={<PlaylistDetails />} />
        <Route path="/signup" element={<Signup loginUser={loginUser} />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
      </Routes>
    </Router>
  )
}

export default App
