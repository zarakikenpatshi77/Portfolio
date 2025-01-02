import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Tabs,
  Tab,
  IconButton,
  Alert,
  Snackbar,
  useTheme,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logout, Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import ProjectsTab from '../components/ProjectsTab';
import SkillsTab from '../components/SkillsTab';

const MotionContainer = motion(Container);

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    demo: '',
    category: '',
    name: '',
    level: 0
  });

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (!session) {
        navigate('/admin');
        return;
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      navigate('/admin');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
      setAlert({
        show: true,
        message: 'Error signing out: ' + error.message,
        severity: 'error'
      });
    }
  };

  useEffect(() => {
    checkUser();
    fetchData();
  }, [navigate]);

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
      setAlert({
        show: true,
        message: 'Error fetching data: ' + error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = (type) => {
    setDialogType(type);
    setNewItem(type === 'project' ? {
      title: '',
      description: '',
      technologies: '',
      github: '',
      demo: ''
    } : {
      name: '',
      level: 0,
      category: ''
    });
    setDialogOpen(true);
  };

  const handleSaveNew = async () => {
    try {
      if (dialogType === 'project') {
        const { data, error } = await supabase
          .from('projects')
          .insert([{
            title: newItem.title,
            description: newItem.description,
            technologies: newItem.technologies,
            github: newItem.github,
            demo: newItem.demo
          }]);
        
        if (error) throw error;
        setAlert({ show: true, message: 'Project added successfully!', severity: 'success' });
      } else if (dialogType === 'skill') {
        const { data, error } = await supabase
          .from('skills')
          .insert([{
            name: newItem.name,
            level: newItem.level,
            category: newItem.category
          }]);
        
        if (error) throw error;
        setAlert({ show: true, message: 'Skill added successfully!', severity: 'success' });
      }
      
      fetchData();
      setDialogOpen(false);
    } catch (error) {
      setAlert({
        show: true,
        message: 'Error saving: ' + error.message,
        severity: 'error'
      });
    }
  };

  const handleEditProject = (project) => {
    setEditingProject({ ...project });
  };

  const handleEditSkill = (skill) => {
    setEditingSkill({ ...skill });
  };

  const handleSaveProject = async (project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          github: project.github,
          demo: project.demo
        })
        .eq('id', project.id);
      
      if (error) throw error;
      
      fetchData();
      setEditingProject(null);
      setAlert({ show: true, message: 'Project updated successfully!', severity: 'success' });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Error updating project: ' + error.message,
        severity: 'error'
      });
    }
  };

  const handleSaveSkill = async (skill) => {
    try {
      const { error } = await supabase
        .from('skills')
        .update({
          name: skill.name,
          level: skill.level,
          category: skill.category
        })
        .eq('id', skill.id);
      
      if (error) throw error;
      
      fetchData();
      setEditingSkill(null);
      setAlert({ show: true, message: 'Skill updated successfully!', severity: 'success' });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Error updating skill: ' + error.message,
        severity: 'error'
      });
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
      
      if (error) throw error;
      
      fetchData();
      setAlert({ show: true, message: 'Project deleted successfully!', severity: 'success' });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Error deleting project: ' + error.message,
        severity: 'error'
      });
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);
      
      if (error) throw error;
      
      fetchData();
      setAlert({ show: true, message: 'Skill deleted successfully!', severity: 'success' });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Error deleting skill: ' + error.message,
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        pt: 4,
        pb: 8,
      }}
    >
      <MotionContainer
        maxWidth="lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 6 
        }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Admin Dashboard
          </Typography>
          <IconButton 
            onClick={handleLogout}
            sx={{
              color: 'primary.main',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)'
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <Logout />
          </IconButton>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'divider',
            mb: 4
          }}
        >
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              },
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                py: 3,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'primary.main',
                },
                '&.Mui-selected': {
                  color: 'primary.main',
                }
              }
            }}
          >
            <Tab label="Projects" />
            <Tab label="Skills" />
          </Tabs>
        </Paper>

        <Fade in={true} timeout={500}>
          <Box>
            {currentTab === 0 && (
              <ProjectsTab
                projects={projects}
                onDelete={handleDeleteProject}
                onEdit={handleEditProject}
                onAdd={() => handleAddNew('project')}
              />
            )}
            {currentTab === 1 && (
              <SkillsTab
                skills={skills}
                onDelete={handleDeleteSkill}
                onEdit={handleEditSkill}
                onAdd={() => handleAddNew('skill')}
              />
            )}
          </Box>
        </Fade>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Add New {dialogType === 'project' ? 'Project' : 'Skill'}
          </DialogTitle>
          <DialogContent>
            {dialogType === 'project' ? (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  sx={{ mt: 2, mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  sx={{ mb: 2 }}
                  multiline
                  rows={3}
                />
                <TextField
                  fullWidth
                  label="Technologies"
                  value={newItem.technologies}
                  onChange={(e) => setNewItem({ ...newItem, technologies: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="GitHub URL"
                  value={newItem.github}
                  onChange={(e) => setNewItem({ ...newItem, github: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Demo URL"
                  value={newItem.demo}
                  onChange={(e) => setNewItem({ ...newItem, demo: e.target.value })}
                />
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  sx={{ mt: 2, mb: 2 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Other">Other</option>
                </TextField>
                <TextField
                  fullWidth
                  label="Skill Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Skill Level (0-100)"
                  value={newItem.level}
                  onChange={(e) => setNewItem({ ...newItem, level: parseInt(e.target.value) })}
                  inputProps={{ min: 0, max: 100 }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNew} variant="contained" color="primary">
              Add {dialogType === 'project' ? 'Project' : 'Skill'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={alert.show}
          autoHideDuration={6000}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          <Alert 
            severity={alert.severity} 
            variant="filled"
            sx={{ 
              borderRadius: '10px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </MotionContainer>
    </Box>
  );
};

export default AdminDashboard;
