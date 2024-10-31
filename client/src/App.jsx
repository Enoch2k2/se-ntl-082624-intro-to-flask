import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Playlist from './components/Playlist'
import PlaylistForm from './components/PlaylistForm'
import { baseUrl } from './Globals'
import PlaylistDetails from './components/PlaylistDetails'

function App() {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    fetch(baseUrl + "/api/playlists")
      .then(resp => resp.json())
      .then(data => setPlaylists(data))
  }, [])

  const addPlaylist = playlist => {
    setPlaylists([...playlists, playlist])
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlists" element={<Playlist playlists={ playlists } />} />
        <Route path="/playlists/new" element={<PlaylistForm addPlaylist={ addPlaylist } />} />
        <Route path="/playlists/:id" element={<PlaylistDetails />} />
      </Routes>
    </Router>
  )
}

export default App
