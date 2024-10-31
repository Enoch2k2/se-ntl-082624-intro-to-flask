import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { baseUrl, headers } from '../Globals'
import { useNavigate } from 'react-router-dom'

const PlaylistForm = ({ addPlaylist }) => {
  const [error, setError] = useState({})

  const navigate = useNavigate()

  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().min(3).max(50).required()
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch(baseUrl + "/api/playlists", options)
    const data = await resp.json()
    if(resp.status !== 201) {
      setError(data)
    } else {
      addPlaylist(data)
      navigate("/playlists")
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false
  })

  return (
    <div>
      <h3>Create Playlist</h3>
      <p style={{color: "red"}}>{error.error}</p>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" value={ formik.values.name } onChange={ formik.handleChange } />
          <p style={{color: "red"}}>{formik.errors.name}</p>
        </div><br />

        <input type="submit" value="Create Playlist" />
      </form>
    </div>
  )
}

export default PlaylistForm