import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SongsContext } from '../context/SongsContext'

const SongForm = ({ loggedIn }) => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const { addSong } = useContext(SongsContext)

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])

  const initialValues = {
    title: ""
  }

  const validationSchema = yup.object({
    title: yup.string().required('Title is required')
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/songs", options)
    const data = await resp.json()
    if (resp.status !== 201) {
      setError(data)
    } else {
      addSong(data)
      navigate("/songs")
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
          Create Song
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
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

export default SongForm