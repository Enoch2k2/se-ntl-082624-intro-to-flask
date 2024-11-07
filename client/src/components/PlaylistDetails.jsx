import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'

const PlaylistDetails = ({ currentUser, loggedIn, userLoading, deletePlaylist }) => {
  const [ playlist, setPlaylist ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const [draggedItem, setDraggedItem] = useState(null);
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

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetItem) => {
    e.preventDefault();
    // determine where to place the draggedItem and switch it's order number to the target item's order number
    // update playlist_songs according
    const targetIndex = playlist.playlist_songs.indexOf(targetItem)
    const draggedItemIndex = playlist.playlist_songs.indexOf(draggedItem)
    // remove dragged Item from the playlist_songs
    let updatedPlaylistSongs = playlist.playlist_songs.filter(ps => ps.id !== draggedItem.id)
    let firstHalf = updatedPlaylistSongs.slice(0, targetIndex)
    let lastHalf = updatedPlaylistSongs.slice(targetIndex, updatedPlaylistSongs.length)

    firstHalf.push(draggedItem)
    updatedPlaylistSongs = firstHalf.concat(lastHalf)

    for(let i = 0; i < updatedPlaylistSongs.length; i++) {
      updatedPlaylistSongs[i].order_number = i + 1
      await fetch('/api/playlist_songs/' + updatedPlaylistSongs[i].id, {
        method: "PATCH",
        headers,
        body: JSON.stringify({order_number: i + 1})
      })
    }



    setPlaylist({
      ...playlist,
      playlist_songs: updatedPlaylistSongs
    })
    // slice targetitem index to the end of the playlist_songs (without the draggedItem) (last half)
  };

  if(loading || userLoading ) {
    return <h1>Loading...</h1>
  }

  const orderedPlaylistSongs = playlist.playlist_songs.sort((a, b) => a.order_number - b.order_number)
  const songs = orderedPlaylistSongs.map(ps => (
    <li 
      key={ps.id}
      draggable
      onDragStart={(e) => handleDragStart(e, ps)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, ps)}
    >
      {ps.song.title}
    </li>
  ))

  return (
    <div>
      <h3>{playlist.name}</h3>
      <p>{playlist.user.username}'s Playlist</p>
      {playlist.user.id === currentUser.id ? <><Link to={`/playlists/${playlist.id}/playlist_songs/new`} style={{marginRight: "5px"}}>Add Song</Link><Link to={`/playlists/${playlist.id}/edit`} style={{marginRight: "5px"}}>Edit</Link>
      <Link to="#" onClick={handleDelete}>Delete</Link></> : null}
      <p>Note: You can re-order your songs by dragging the song to the position you want it to be.</p>
      <ul>
        {songs}
      </ul>
    </div>
  )
}

export default PlaylistDetails