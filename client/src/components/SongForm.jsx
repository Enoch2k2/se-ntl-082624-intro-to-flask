import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate } from 'react-router-dom'

const SongForm = ({ addSong, loggedIn }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])

  const initialValues = {
    title: ""
  }

  const validationSchema = yup.object({
    title: yup.string().required()
  })

  const handleSubmit = values => {
    fetch('/api/songs', {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    })
      .then(resp => resp.json())
      .then(data => {
        addSong(data)
        navigate("/songs")
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false
  })

  return (
    <div>
      <h3>Create Song</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" value={formik.values.title} onChange={formik.handleChange} />
          <p style={{color: "red"}}>{ formik.errors.title }</p>
        </div><br />

        <input type="submit" value="Create Song" />
      </form>
    </div>
  )
}

export default SongForm