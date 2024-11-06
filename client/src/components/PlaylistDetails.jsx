import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PlaylistDetails = ({ currentUser, loggedIn, userLoading, deletePlaylist }) => {
  const [ playlist, setPlaylist ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(!userLoading && !currentUser.id) {
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

  if(loading || userLoading ) {
    return <h1>Loading...</h1>
  }

  const songs = playlist.playlist_songs.map(ps => <li key={ps.id}>{ps.song.title}</li>)

  return (
    <div>
      <h3>{playlist.name}</h3>
      <p>{playlist.user.username}'s Playlist</p>
      {playlist.user.id === currentUser.id ? <><Link to={`/playlists/${playlist.id}/edit`} style={{marginRight: "5px"}}>Edit</Link>
      <Link to="#" onClick={handleDelete}>Delete</Link></> : null}
      <ul>
        {songs}
      </ul>
    </div>
  )
}

export default PlaylistDetails