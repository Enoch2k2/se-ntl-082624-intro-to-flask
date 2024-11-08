import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

const PlaylistCard = ({ playlist }) => {
  return (
    <ListItem
      button
      component={RouterLink}
      to={`/playlists/${playlist.id}`}
      sx={{
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <ListItemIcon>
        <PlaylistPlayIcon />
      </ListItemIcon>
      <ListItemText primary={playlist.name} />
    </ListItem>
  )
}

export default PlaylistCard