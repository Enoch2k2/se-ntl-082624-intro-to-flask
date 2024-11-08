import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PlaylistEditForm = ({ currentUser, loggedIn, userLoading, updatePlaylist }) => {
  const [error, setError] = useState({})
  const [playlist, setPlaylist] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn && !userLoading) {
      navigate("/login")
    } else {
      fetch('/api/playlists/' + id)
        .then(resp => resp.json())
        .then(data => {
          if (data.user.id !== currentUser.id) {
            navigate("/playlists")
          } else {
            setPlaylist(data)
            setLoading(false)
          }
        })
    }
  }, [loggedIn, userLoading, currentUser, id, navigate])

  const initialValues = {
    name: playlist.name || ''
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required')
  })

  const handleSubmit = async values => {
    const options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }
    const resp = await fetch('/api/playlists/' + id, options)
    const data = await resp.json()
    if (resp.status !== 200) {
      setError(data)
    } else {
      updatePlaylist(data)
      navigate("/playlists")
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  })

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>
  }

  return (
    <Box sx={{ padding: 2, maxWidth: 400, margin: '0 auto' }}>
      <Box sx={{ 
        border: '1px solid', 
        borderColor: 'grey.400', 
        borderRadius: 2, 
        padding: 2, 
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant="h6" gutterBottom>
          Edit Playlist
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        {error.message && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error.message}
          </Typography>
        )}
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default PlaylistEditForm