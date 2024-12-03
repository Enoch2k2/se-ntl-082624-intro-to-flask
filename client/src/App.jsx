import { useContext, useEffect, useState } from 'react'
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
import { LoadingContext } from './context/LoadingContext'

function App() {

  const {loading } = useContext(LoadingContext)

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/playlists" element={<Playlist />} />
            <Route path="/playlists/new" element={<PlaylistForm />} />
            <Route path="/playlists/:id/edit" element={<PlaylistEditForm />} />
            <Route path="/playlists/:id" element={<PlaylistDetails />} />
            <Route path="/playlists/:playlist_id/playlist_songs/new" element={<PlaylistSongForm />} />
            <Route path="/songs" element={<SongList />} />
            <Route path="/songs/new" element={<SongForm /> } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  )
}

export default App
