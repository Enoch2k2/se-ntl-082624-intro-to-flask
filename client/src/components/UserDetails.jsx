import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    fetch('/api/users/' + id)
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [])

  if(loading) {
    return <h1>loading...</h1>
  }

  const playlists = user.playlists.map(pl => <li key={pl.id}>{pl.name}</li>)
  
  return (
    <div>
      <h3>{user.username}'s Playlist</h3>
      <ul>
        {playlists}
      </ul>
    </div>
  )
}

export default UserDetails