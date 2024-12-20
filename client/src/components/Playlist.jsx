import React, { useContext, useEffect } from 'react'
import PlaylistCard from './PlaylistCard'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { LoadingContext } from '../context/LoadingContext'
import { UsersContext } from '../context/UsersContext'

const Playlist = () => {
  const navigate = useNavigate()

  const { loading } = useContext(LoadingContext)
  const { currentUser, loggedIn } = useContext(UsersContext)
  const playlists = currentUser.playlists

  useEffect(() => {
    if (!loading) {
      if (!loggedIn) {
        navigate("/login")
      }
    }
  }, [loggedIn, loading])

  if (loading || !playlists) {
    return <h1>Loading...</h1>
  }

  const playlistCards = playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />)

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
          Playlist List
        </Typography>
      </Box>
      <List>
        {playlistCards}
      </List>
    </Box>
  )
}

export default Playlist