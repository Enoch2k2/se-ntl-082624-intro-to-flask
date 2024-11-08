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
import PlaylistEditForm from './components/PlaylistEditForm'
import SongList from './components/SongList'
import SongForm from './components/SongForm'
import PlaylistSongForm from './components/PlaylistSongForm'

import { Box } from '@mui/material';
import Container from '@mui/material/Container';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [songs, setSongs] = useState([])
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
    fetch('/api/songs')
      .then(resp => resp.json())
      .then(data => setSongs(data))
  }, [])
    
    const loginUser = (user) => {
      setCurrentUser(user)
      setLoggedIn(true)
  }
  
  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
  }

  const addSong = song => {
    setSongs([...songs, song])
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

  const updatePlaylist = updatedPlaylist => {
    // update playlists of the current user to replace the old playlist with the updatedPlaylist
    const updatedPlaylists = currentUser.playlists.map(playlist => {
      if(playlist.id === updatedPlaylist.id) {
        return updatedPlaylist
      } else {
        return playlist
      }
    })
    // update currentUser
    const updatedCurrentUser = {
      ...currentUser,
      playlists: updatedPlaylists
    }

    // set currentUser state
    setCurrentUser(updatedCurrentUser)
  }

  const deletePlaylist = (id) => {
    const updatedPlaylists = currentUser.playlists.filter(playlist => playlist.id !== parseInt(id))
    const updatedCurrentUser = {
      ...currentUser,
      playlists: updatedPlaylists
    }
    setCurrentUser(updatedCurrentUser)
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Navbar loggedIn={loggedIn} currentUser={currentUser} logoutUser={logoutUser} />
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/playlists" element={<Playlist playlists={ currentUser.playlists } loggedIn={loggedIn} loading={loading} />} />
            <Route path="/playlists/new" element={<PlaylistForm addPlaylist={ addPlaylist } />} />
            <Route path="/playlists/:id/edit" element={<PlaylistEditForm currentUser={currentUser} loggedIn={loggedIn} userLoading={loading} updatePlaylist={updatePlaylist} />} />
            <Route path="/playlists/:id" element={<PlaylistDetails currentUser={currentUser} loggedIn={loggedIn} userLoading={loading} deletePlaylist={deletePlaylist} />} />
            <Route path="/playlists/:playlist_id/playlist_songs/new" element={<PlaylistSongForm playlists={currentUser.playlists} songs={songs} />} />
            <Route path="/songs" element={<SongList songs={songs} />} />
            <Route path="/songs/new" element={<SongForm addSong={ addSong } loggedIn={loggedIn} /> } />
            <Route path="/signup" element={<Signup loginUser={loginUser} />} />
            <Route path="/login" element={<Login loginUser={loginUser} />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  )
}

export default App
