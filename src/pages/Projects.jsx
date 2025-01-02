import { useState, useEffect } from 'react'
import { 
  Grid, Card, CardContent, CardMedia, Typography, Box, Chip, IconButton,
  CircularProgress, TextField, MenuItem, Select, FormControl, InputLabel
} from '@mui/material'
import { GitHub, Language } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

const MotionCard = motion(Card)

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProjects(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || project.technologies.includes(filter)
    return matchesSearch && matchesFilter
  })

  const uniqueTechnologies = [...new Set(projects.flatMap(p => p.technologies))]

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom component={motion.h2}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Projects
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search projects"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by technology</InputLabel>
          <Select
            value={filter}
            label="Filter by technology"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All Technologies</MenuItem>
            {uniqueTechnologies.map((tech) => (
              <MenuItem key={tech} value={tech}>{tech}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                exit={{ opacity: 0, y: 20 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                {project.image_url && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image_url}
                    alt={project.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {project.github && (
                      <IconButton
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <GitHub />
                      </IconButton>
                    )}
                    {project.demo && (
                      <IconButton
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <Language />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  )
}

export default Projects
