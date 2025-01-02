import { Box, Typography, Button, Grid, Container, IconButton, Chip, Card, CardContent, TextField, Alert, Snackbar, Link, CircularProgress, LinearProgress } from '@mui/material'
import { GitHub, LinkedIn, KeyboardArrowDown, Description, Launch, WhatsApp, Email, Instagram } from '@mui/icons-material'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import emailjs from '@emailjs/browser'
import { Link as RouterLink } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient';
import { TypeAnimation } from 'react-type-animation';

const MotionContainer = motion.create(Container)
const MotionTypography = motion.create(Typography)
const MotionBox = motion.create(Box)
const MotionCard = motion.create(Card)

const Section = ({ children, id }) => (
  <MotionBox
    id={id}
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      py: 8,
      position: 'relative',
    }}
  >
    {children}
  </MotionBox>
)

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string
}

const Home = () => {
  const scrollRef = useRef(null)
  const form = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (projectsError) throw projectsError;
      setProjects(projectsData);

      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (skillsError) throw skillsError;
      setSkills(skillsData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address'
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    }
    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      await emailjs.sendForm(
        'service_o482tii', // Replace with your EmailJS service ID
        'template_u9qwu7m', // Replace with your EmailJS template ID
        form.current,
        'aECOYCyuXs0H_ZdwP' // Replace with your EmailJS public key
      )

      // Clear form
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success'
      })
    } catch {
      // Show error message
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }))
  }

  return (
    <MotionBox ref={scrollRef}>
      {/* Hero Section */}
      <Section id="hero">
        <MotionContainer
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <MotionBox 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              maxWidth: '800px'
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                component="img"
                src="https://th.bing.com/th/id/R.0b7b1e0c618f828be7c397c71b443d10?rik=tQ%2fSooRAajin8Q&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1511367461989-f85a21fda167%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8M3x8cHJvZmlsZXx8MHx8fHwxNjI2NzM5NTQy%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=lZOTcmCJ4cYLfPzE4yoh46VIlFPJmmjZ7YBdJY5neCg%3d&risl=&pid=ImgRaw&r=0"
                alt="Mohamed Bailla"
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: '4px solid',
                  objectFit: 'cover',
                  borderColor: 'primary.main',
                  boxShadow: '0 0 20px rgba(33, 150, 243, 0.3)',
                  mb: 3,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 30px rgba(33, 150, 243, 0.5)',
                  }
                }}
              />
            </motion.div>
            
            <MotionTypography
              variant="h1"
              sx={{
                fontSize: { xs: '3.5rem', md: '5rem' },
                fontWeight: 900,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                mb: 2
              }}
            >
              <TypeAnimation
                sequence={[
                  'I\'m Mohamed Bailla',
                  1000,
                  'Welcome To My Portfolio',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ display: 'inline-block' }}
              />
            </MotionTypography>

            <MotionTypography
              variant="h2"
              sx={{ 
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 600,
                color: 'text.secondary',
                letterSpacing: '-0.01em',
                mb: 3
              }}
            >
              Software Engineer
            </MotionTypography>

            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.25rem',
                color: 'text.secondary',
                maxWidth: '600px',
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Crafting exceptional digital experiences through innovative solutions
              and cutting-edge technologies.
            </Typography>

            <MotionBox sx={{ display: 'flex', gap: 3, mb: 4 }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  component="a"
                  href="https://github.com/Mohamed-Bailla"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    padding: '16px',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
                    }
                  }}
                >
                  <GitHub sx={{ fontSize: 32 }} />
                </IconButton>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/mohamed-bailla-5bb45b2aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    padding: '16px',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
                    }
                  }}
                >
                  <LinkedIn sx={{ fontSize: 32 }} />
                </IconButton>
              </motion.div>
            </MotionBox>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                href="/resume.pdf"
                target="_blank"
                startIcon={<Description />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 15px rgba(33, 150, 243, 0.3)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)'
                  }
                }}
              >
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'primary.main',
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  padding: '12px',
                  '@keyframes bounce': {
                    '0%, 20%, 50%, 80%, 100%': {
                      transform: 'translateY(0) translateX(-50%)'
                    },
                    '40%': {
                      transform: 'translateY(-20px) translateX(-50%)'
                    },
                    '60%': {
                      transform: 'translateY(-10px) translateX(-50%)'
                    }
                  },
                  animation: 'bounce 2s infinite',
                  '&:hover': {
                    backgroundColor: 'rgba(33, 150, 243, 0.2)'
                  }
                }}
                onClick={() => {
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <KeyboardArrowDown sx={{ fontSize: '2rem' }} />
              </IconButton>
            </motion.div>
          </MotionBox>
        </MotionContainer>
      </Section>

      {/* Projects Section */}
      <Box 
        component="section" 
        id="projects" 
        sx={{ 
          py: 12,
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(240,240,240,1) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <MotionTypography
            variant="h2"
            sx={{ 
              mb: 8, 
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </MotionTypography>

          <Grid container spacing={4}>
            {loading ? (
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress 
                  size={60}
                  thickness={4}
                  sx={{ 
                    color: 'primary.main',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    }
                  }}
                />
              </Grid>
            ) : (
              projects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: (theme) => theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 20px 40px rgba(0,0,0,0.5)'
                            : '0 20px 40px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography 
                          gutterBottom 
                          variant="h5" 
                          component="h3"
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          paragraph
                          sx={{ mb: 3, lineHeight: 1.7 }}
                        >
                          {project.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {project.technologies?.split(',').map((tech, index) => (
                            <Chip
                              key={index}
                              label={tech.trim()}
                              sx={{
                                background: 'rgba(33, 150, 243, 0.1)',
                                color: 'primary.main',
                                fontWeight: 500,
                                borderRadius: '8px',
                                '&:hover': {
                                  background: 'rgba(33, 150, 243, 0.2)',
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                      <Box 
                        sx={{ 
                          p: 2, 
                          pt: 0,
                          display: 'flex',
                          gap: 1,
                          justifyContent: 'flex-end',
                          borderTop: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        {project.github && (
                          <IconButton 
                            href={project.github} 
                            target="_blank"
                            sx={{
                              color: 'primary.main',
                              backgroundColor: 'rgba(33, 150, 243, 0.1)',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
                              }
                            }}
                          >
                            <GitHub />
                          </IconButton>
                        )}
                        {project.demo && (
                          <IconButton 
                            href={project.demo} 
                            target="_blank"
                            sx={{
                              color: 'primary.main',
                              backgroundColor: 'rgba(33, 150, 243, 0.1)',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
                              }
                            }}
                          >
                            <Launch />
                          </IconButton>
                        )}
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box 
        component="section" 
        id="skills" 
        sx={{ 
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 30% 30%, rgba(33, 150, 243, 0.1) 0%, rgba(0,0,0,0) 70%)'
              : 'radial-gradient(circle at 30% 30%, rgba(33, 150, 243, 0.05) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <MotionTypography
            variant="h2"
            sx={{ 
              mb: 8, 
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Skills & Expertise
          </MotionTypography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress 
                size={60}
                thickness={4}
                sx={{ 
                  color: 'primary.main',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }}
              />
            </Box>
          ) : (
            ['Frontend', 'Backend', 'Database', 'Other'].map((category, categoryIndex) => {
              const categorySkills = skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <Box 
                    sx={{ 
                      mb: 6,
                      p: 4,
                      borderRadius: '20px',
                      background: (theme) => theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? '0 20px 40px rgba(0,0,0,0.5)'
                          : '0 20px 40px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      gutterBottom 
                      sx={{ 
                        mb: 4,
                        fontWeight: 700,
                        color: 'primary.main'
                      }}
                    >
                      {category}
                    </Typography>
                    <Grid container spacing={3}>
                      {categorySkills.map((skill, index) => (
                        <Grid item xs={12} sm={6} md={4} key={skill.id}>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Box sx={{ mb: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography 
                                  variant="h6"
                                  sx={{ 
                                    fontWeight: 600,
                                    fontSize: '1.1rem'
                                  }}
                                >
                                  {skill.name}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  color="primary"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {skill.level}%
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  position: 'relative',
                                  height: '8px',
                                  borderRadius: '4px',
                                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                  overflow: 'hidden'
                                }}
                              >
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  style={{
                                    position: 'absolute',
                                    height: '100%',
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    borderRadius: '4px'
                                  }}
                                />
                              </Box>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              );
            })
          )}
        </Container>
      </Box>

      {/* Contact Section */}
      <Section id="contact">
        <Container maxWidth="md">
          <MotionTypography
            variant="h2"
            sx={{ 
              mb: 8, 
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </MotionTypography>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 30px rgba(33, 150, 243, 0.1)',
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <form ref={form} onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(33, 150, 243, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(33, 150, 243, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!formErrors.message}
                      helperText={formErrors.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(33, 150, 243, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: '50px',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          boxShadow: '0 3px 15px rgba(33, 150, 243, 0.3)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)'
                          }
                        }}
                      >
                        Send Message
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </MotionCard>
        </Container>
      </Section>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'background.paper',
          py: 6,
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Connect With Me
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <IconButton
                  href="https://github.com/Mohamed-Bailla"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  aria-label="GitHub"
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/mohamed-bailla-5bb45b2aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  aria-label="LinkedIn"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://wa.me/+212619140162"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  aria-label="WhatsApp"
                >
                  <WhatsApp />
                </IconButton>
                <IconButton
                  href="https://instagram.com/bil_mohamed_azn77"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  aria-label="Instagram"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  href="mailto:mohamedbailla599@gmail.com"
                  color="inherit"
                  aria-label="Email"
                >
                  <Email />
                </IconButton>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Passionate full-stack developer with expertise in modern web technologies.
                I love creating elegant solutions and bringing innovative ideas to life.
                Let's work together to build something amazing!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Passionate full-stack developer with expertise in modern web technologies.
                I love creating elegant solutions and bringing innovative ideas to life.
                
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  color="inherit"
                  href="#about"
                  startIcon={<KeyboardArrowDown />}
                >
                  About
                </Button>
                <Button
                  color="inherit"
                  href="#projects"
                  startIcon={<Launch />}
                >
                  Projects
                </Button>
                <Button
                  color="inherit"
                  href="#contact"
                  startIcon={<Description />}
                >
                  Contact
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            &copy; {new Date().getFullYear()}{' '}
            <Link
              component={RouterLink}
              to="/admin"
              color="inherit"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Mohamed Bailla
            </Link>
            . All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MotionBox>
  )
}

export default Home
