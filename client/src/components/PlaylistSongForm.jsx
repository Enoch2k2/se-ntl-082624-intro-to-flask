import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { SongsContext } from '../context/SongsContext'
import { UsersContext } from '../context/UsersContext'

const PlaylistSongForm = () => {

  const { songs } = useContext(SongsContext)
  const { currentUser: { playlists } } = useContext(UsersContext)

  const [song_id, setSongId] = useState(songs[0].id)
  const { playlist_id } = useParams()
  const navigate = useNavigate()

  const playlist = playlists.find(pl => pl.id === parseInt(playlist_id))

  const handleSubmit = async e => {
    e.preventDefault()

    const resp = await fetch('/api/playlist_songs', {
      method: "POST",
      headers,
      body: JSON.stringify({ playlist_id: playlist.id, song_id })
    })
    const data = await resp.json()

    if (resp.status !== 201) {
      console.error(data)
    } else {
      navigate(`/playlists/${playlist_id}`)
    }
  }

  return (
    <Box sx={{ padding: 2, maxWidth: 400, margin: '0 auto' }}>
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
          Add Song to {playlist.name}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="song-select-label">Song</InputLabel>
          <Select
            labelId="song-select-label"
            id="song_id"
            value={song_id}
            label="Song"
            onChange={(e) => setSongId(e.target.value)}
          >
            {songs.map(song => (
              <MenuItem key={song.id} value={song.id}>
                {song.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default PlaylistSongForm