import { createContext, useEffect, useState } from "react";


const SongsContext = createContext({});

const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetch('/api/songs')
      .then(resp => resp.json())
      .then(data => setSongs(data))
  }, [])

  const addSong = song => {
    setSongs([...songs, song])
  }

  return <SongsContext.Provider value={{ songs, addSong }}>{ children }</SongsContext.Provider>
}

export { SongsContext, SongsProvider }