import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate, useParams } from 'react-router-dom'

const PlaylistEditForm = ({ currentUser, loggedIn, userLoading, updatePlaylist }) => {
  const [error, setError] = useState({})
  const [playlist, setPlaylist] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if(!loggedIn && !userLoading) {
      navigate("/login")
    } else {
      fetch('/api/playlists/' + id)
      .then(resp => resp.json())
      .then(data => {
        if(data.user.id !== currentUser.id) {
          navigate("/playlists")
        }
        setPlaylist(data)
        setLoading(false)
        formik.values.name = data.name
      })
    }
  }, [loggedIn, currentUser])
  

  
  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().min(3).max(50).required()
  })

  const handleSubmit = async values => {
    const options = {
      method: "PATCH",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/playlists/" + id, options)
    const data = await resp.json()
    if(resp.status !== 200) {
      setError(data)
    } else {
      updatePlaylist(data)
      navigate("/playlists")
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false
  })

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h3>Update Playlist</h3>
      <p style={{color: "red"}}>{error.error}</p>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" value={ formik.values.name } onChange={ formik.handleChange } />
          <p style={{color: "red"}}>{formik.errors.name}</p>
        </div><br />

        <input type="submit" value="Update Playlist" />
      </form>
    </div>
  )
}

export default PlaylistEditForm