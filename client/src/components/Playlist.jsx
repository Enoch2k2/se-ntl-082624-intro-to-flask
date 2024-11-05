import React, {useEffect} from 'react'
import PlaylistCard from './PlaylistCard'
import { useNavigate } from 'react-router-dom'

const Playlist = ({ playlists, loggedIn, loading }) => {

  const navigate = useNavigate()

  useEffect(() => {
    console.log('loggedIn', loggedIn)
    if(!loading) {
      if(!loggedIn) {
        navigate("/login")
      }
    }

  }, [loggedIn, loading])
  
  if (loading || !playlists) {
    return <h1></h1>
  }

  const playlistCards = playlists.map(playlist => <PlaylistCard key={ playlist.id } playlist={ playlist } />)

  return (
    <ul>
      { playlistCards }
    </ul>
  )
}

export default Playlist