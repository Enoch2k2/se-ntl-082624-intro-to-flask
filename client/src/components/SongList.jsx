import React from 'react'
import SongCard from './SongCard'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const SongList = ({ songs }) => {

  const songCards = songs.map(song => <SongCard key={song.id} song={song} />)

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
          Song List
        </Typography>
      </Box>
      <List>
        {songCards}
      </List>
    </Box>
  )
}

export default SongList