import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'

const PlaylistSongForm = ({playlists, songs}) => {
  const [song_id, setSongId] = useState(songs[0].id)
  const { playlist_id } = useParams()

  const navigate = useNavigate()

  const playlist = playlists.find(pl => pl.id === parseInt(playlist_id))

  const songOptions = songs.map(song => <option key={song.id} value={song.id}>{song.title}</option>)

  const handleSubmit = async e => {
    e.preventDefault()

    const resp = fetch('/api/playlist_songs', {
      method: "POST",
      headers,
      body: JSON.stringify({ playlist_id: playlist.id, song_id })
    })
      .then(resp => resp.json())
      .then(data => {
        navigate(`/playlists/${playlist_id}`)
      })
  }

  return (
    <div>
      <h3>Add Song to {playlist.name}</h3>
      <form onSubmit={ handleSubmit }>
        <select style={{marginRight: "5px"}} value={song_id} onChange={e => setSongId(parseInt(e.target.value))}>
          {songOptions}
        </select>
        <input type="submit" value="Add Song" />
      </form>
    </div>
  )
}

export default PlaylistSongForm