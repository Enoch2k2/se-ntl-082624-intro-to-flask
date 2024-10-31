import React from 'react'
import PlaylistCard from './PlaylistCard'

const Playlist = ({ playlists }) => {

  const playlistCards = playlists.map(playlist => <PlaylistCard key={ playlist.id } playlist={ playlist } />)

  return (
    <ul>
      { playlistCards }
    </ul>
  )
}

export default Playlist