import { useState } from 'react'
import { Paper, TextField, Button, Typography, Box, Alert, Snackbar } from '@mui/material'
import { Send } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

const MotionPaper = motion(Paper)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await supabase
        .from('contact_messages')
        .insert([formData])

      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      })
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      })
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>
        Contact Me
      </Typography>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{ p: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<Send />}
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </form>
      </MotionPaper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Contact
