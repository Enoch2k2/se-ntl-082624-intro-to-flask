import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PlaylistForm = ({ addPlaylist }) => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const initialValues = {
    name: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required')
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/playlists", options)
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
  })

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
          Create Playlist
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
        {error && (
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

export default PlaylistForm