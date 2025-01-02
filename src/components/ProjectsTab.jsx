import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Chip,
  Button,
  useTheme
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion.create(Card);

const ProjectsTab = ({ projects, onDelete, onEdit, onAdd }) => {
  const theme = useTheme();
  const [editingProject, setEditingProject] = useState(null);

  const handleEdit = (project) => {
    setEditingProject(project);
    onEdit(project);
  };

  const handleSave = (project) => {
    setEditingProject(null);
    onEdit(project);
  };

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={onAdd}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: '12px',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1.1rem',
            boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 20px rgba(33, 150, 243, 0.4)',
            },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          Add New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} key={project.id}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              sx={{
                height: '100%',
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 20px 40px rgba(0,0,0,0.5)'
                    : '0 20px 40px rgba(0,0,0,0.1)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {editingProject?.id === project.id ? (
                  <Box component="form">
                    <TextField
                      fullWidth
                      label="Title"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      sx={{ mb: 2 }}
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      sx={{ mb: 2 }}
                      multiline
                      rows={3}
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      label="Technologies"
                      value={editingProject.technologies}
                      onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                      sx={{ mb: 2 }}
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      label="GitHub URL"
                      value={editingProject.github}
                      onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                      sx={{ mb: 2 }}
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      label="Demo URL"
                      value={editingProject.demo}
                      onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                      variant="filled"
                    />
                    <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton
                        onClick={() => handleSave(editingProject)}
                        sx={{
                          color: 'primary.main',
                          backgroundColor: 'rgba(33, 150, 243, 0.1)',
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
                          }
                        }}
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        onClick={() => setEditingProject(null)}
                        sx={{
                          color: 'error.main',
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          '&:hover': {
                            backgroundColor: 'error.main',
                            color: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 20px rgba(244, 67, 54, 0.4)'
                          }
                        }}
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      gutterBottom
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
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 3, lineHeight: 1.7 }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="GitHub"
                          component="a"
                          href={project.github}
                          target="_blank"
                          clickable
                          sx={{
                            background: 'rgba(33, 150, 243, 0.1)',
                            color: 'primary.main',
                            '&:hover': {
                              background: 'rgba(33, 150, 243, 0.2)',
                            }
                          }}
                        />
                        <Chip
                          label="Demo"
                          component="a"
                          href={project.demo}
                          target="_blank"
                          clickable
                          sx={{
                            background: 'rgba(33, 150, 243, 0.1)',
                            color: 'primary.main',
                            '&:hover': {
                              background: 'rgba(33, 150, 243, 0.2)',
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={() => handleEdit(project)}
                          sx={{
                            color: 'primary.main',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
                            }
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => onDelete(project.id)}
                          sx={{
                            color: 'error.main',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            '&:hover': {
                              backgroundColor: 'error.main',
                              color: 'white',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 20px rgba(244, 67, 54, 0.4)'
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                )}
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProjectsTab;
