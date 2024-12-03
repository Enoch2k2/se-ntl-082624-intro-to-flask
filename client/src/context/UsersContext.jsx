import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./LoadingContext";

const UsersContext = createContext({})

const UsersProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    fetch('/api/check-current-user')
      .then(resp => {
        if (resp.status == 200) {
          resp.json().then(data => {
            loginUser(data)
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    
  }, [])
    
    const loginUser = (user) => {
      setCurrentUser(user)
      setLoggedIn(true)
  }
  
  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
  }

  const addPlaylist = playlist => {
    // updating the user's playlist
    // add to currentUsers playlist (non destructively)
    const pl = [...currentUser.playlists, playlist]
    // update currentUser (non destructively)
    const updatedCurrentUser = {
      ...currentUser,
      playlists: pl
    }
    setCurrentUser(updatedCurrentUser)
  }

  const updatePlaylist = updatedPlaylist => {
    // update playlists of the current user to replace the old playlist with the updatedPlaylist
    const updatedPlaylists = currentUser.playlists.map(playlist => {
      if(playlist.id === updatedPlaylist.id) {
        return updatedPlaylist
      } else {
        return playlist
      }
    })
    // update currentUser
    const updatedCurrentUser = {
      ...currentUser,
      playlists: updatedPlaylists
    }

    // set currentUser state
    setCurrentUser(updatedCurrentUser)
  }

  const deletePlaylist = (id) => {
    const updatedPlaylists = currentUser.playlists.filter(playlist => playlist.id !== parseInt(id))
    const updatedCurrentUser = {
      ...currentUser,
      playlists: updatedPlaylists
    }
    setCurrentUser(updatedCurrentUser)
  }

  return <UsersContext.Provider value={{loginUser, logoutUser, addPlaylist, updatePlaylist, deletePlaylist, currentUser, loggedIn }}>{ children }</UsersContext.Provider>
}

export { UsersContext, UsersProvider }