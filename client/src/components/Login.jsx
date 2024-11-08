import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Login = ({ loginUser }) => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/login", options)
    const data = await resp.json()
    if(resp.status !== 200) {
      setError(data)
    } else {
      loginUser(data)
      navigate("/dashboard")
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false
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
          Login
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

export default Login