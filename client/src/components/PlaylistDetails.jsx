import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../Globals'

const PlaylistDetails = () => {
  const [ playlist, setPlaylist ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    fetch(baseUrl + "/api/playlists/" + id)
      .then(resp => resp.json())
      .then(data => {
        setPlaylist(data)
        setLoading(false)
      })
  }, [])

  if(loading) {
    return <h1>Loading...</h1>
  }

  const songs = playlist.playlist_songs.map(ps => <li key={ps.id}>{ps.song.title}</li>)

  return (
    <div>
      <h3>{playlist.name}</h3>
      <ul>
        {songs}
      </ul>
    </div>
  )
}

export default PlaylistDetails