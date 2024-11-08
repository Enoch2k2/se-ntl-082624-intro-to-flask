import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

const SongCard = ({ song }) => {
  return (
    <ListItem
      button
      component={RouterLink}
      to={`/songs/${song.id}`}
      sx={{
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <ListItemIcon>
        <MusicNoteIcon />
      </ListItemIcon>
      <ListItemText primary={song.title} />
    </ListItem>
  )
}

export default SongCard