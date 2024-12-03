import React, { useContext, useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { UsersContext } from '../context/UsersContext'

const PlaylistDetails = () => {
  const [playlist, setPlaylist] = useState({})
  const [loading, setLoading] = useState(true)
  const [draggedItem, setDraggedItem] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const { currentUser, loggedIn, deletePlaylist } = useContext(UsersContext)

  useEffect(() => {
    if (!currentUser.id) {
      navigate("/login")
    }
    fetch("/api/playlists/" + id)
      .then(resp => resp.json())
      .then(data => {
        setPlaylist(data)
        setLoading(false)
      })
  }, [loggedIn, currentUser])

  const handleDelete = event => {
    event.preventDefault()

    fetch('/api/playlists/' + id, {
      method: "DELETE"
    })

    deletePlaylist(id)
    navigate("/playlists")
  }

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, targetItem) => {
    e.preventDefault()
    const targetIndex = playlist.playlist_songs.indexOf(targetItem)
    const draggedItemIndex = playlist.playlist_songs.indexOf(draggedItem)
    let updatedPlaylistSongs = playlist.playlist_songs.filter(ps => ps.id !== draggedItem.id)
    let firstHalf = updatedPlaylistSongs.slice(0, targetIndex)
    let lastHalf = updatedPlaylistSongs.slice(targetIndex, updatedPlaylistSongs.length)

    firstHalf.push(draggedItem)
    updatedPlaylistSongs = firstHalf.concat(lastHalf)

    for (let i = 0; i < updatedPlaylistSongs.length; i++) {
      updatedPlaylistSongs[i].order_number = i + 1
      await fetch('/api/playlist_songs/' + updatedPlaylistSongs[i].id, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ order_number: i + 1 })
      })
    }

    setPlaylist({
      ...playlist,
      playlist_songs: updatedPlaylistSongs
    })
  }

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>
  }

  const orderedPlaylistSongs = playlist.playlist_songs.sort((a, b) => a.order_number - b.order_number)
  const songs = orderedPlaylistSongs.map(ps => (
    <ListItem
      key={ps.id}
      draggable
      onDragStart={(e) => handleDragStart(e, ps)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, ps)}
      sx={{ 
        border: '1px solid', 
        borderColor: 'grey.400', 
        borderRadius: 2, 
        marginBottom: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <ListItemText primary={ps.song.title} />
      </Box>
    </ListItem>
  ))

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
          {playlist.name}
        </Typography>
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        {playlist.user.username}'s Playlist
      </Typography>
      {playlist.user.id === currentUser.id && (
        <Box sx={{ marginBottom: 2 }}>
          <Button
            component={RouterLink}
            to={`/playlists/${playlist.id}/playlist_songs/new`}
            variant="contained"
            color="primary"
            sx={{ marginRight: 1 }}
          >
            Add Song
          </Button>
          <Button
            component={RouterLink}
            to={`/playlists/${playlist.id}/edit`}
            variant="contained"
            color="primary"
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </Box>
      )}
      <Typography variant="body2" gutterBottom>
        Note: You can re-order your songs by dragging the song to the position you want it to be.
      </Typography>
      <List>
        {songs}
      </List>
    </Box>
  )
}

export default PlaylistDetails