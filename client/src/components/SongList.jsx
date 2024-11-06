import React from 'react'
import SongCard from './SongCard'

const SongList = ({ songs }) => {

  const songCards = songs.map(song => <SongCard key={song.id} song={song} />)

  return (
    <div>
      <h3>Song List</h3>
      { songCards }
    </div>
  )
}

export default SongList