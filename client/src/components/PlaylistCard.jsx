import React from 'react'
import { Link } from 'react-router-dom'

const PlaylistCard = ({ playlist }) => {
  return (
    <div>
      <h3><Link to={`/playlists/${ playlist.id }`}>{playlist.name}</Link></h3>
    </div>
  )
}

export default PlaylistCard