import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Playlist from './components/Playlist'
import PlaylistForm from './components/PlaylistForm'
import PlaylistDetails from './components/PlaylistDetails'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  const [playlists, setPlaylists] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch("/api/playlists")
      .then(resp => resp.json())
      .then(data => setPlaylists(data))

    fetch('/api/check-current-user')
      .then(resp => {
        if (resp.status == 200) {
          resp.json().then(data => loginUser(data))
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
    setPlaylists([...playlists, playlist])
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logoutUser={logoutUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlists" element={<Playlist playlists={ playlists } />} />
        <Route path="/playlists/new" element={<PlaylistForm addPlaylist={ addPlaylist } />} />
        <Route path="/playlists/:id" element={<PlaylistDetails />} />
        <Route path="/signup" element={<Signup loginUser={loginUser} />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
      </Routes>
    </Router>
  )
}

export default App
