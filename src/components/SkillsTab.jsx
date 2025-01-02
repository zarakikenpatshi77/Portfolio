import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  useTheme,
  LinearProgress
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion.create(Card);

const SkillsTab = ({ skills, onDelete, onEdit, onAdd }) => {
  const theme = useTheme();
  const [editingSkill, setEditingSkill] = useState(null);

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    onEdit(skill);
  };

  const handleSave = (skill) => {
    setEditingSkill(null);
    onEdit(skill);
  };

  const categories = ['Frontend', 'Backend', 'Database', 'Other'];

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
          Add New Skill
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category, categoryIndex) => {
          const categorySkills = skills.filter(skill => skill.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <Grid item xs={12} md={6} key={category}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
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
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {category}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {categorySkills.map((skill, index) => (
                      <Box key={skill.id}>
                        {editingSkill?.id === skill.id ? (
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                              fullWidth
                              label="Skill Name"
                              value={editingSkill.name}
                              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                              variant="filled"
                              size="small"
                            />
                            <TextField
                              fullWidth
                              type="number"
                              label="Level"
                              value={editingSkill.level}
                              onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) || 0 })}
                              inputProps={{ min: 0, max: 100 }}
                              variant="filled"
                              size="small"
                            />
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                              <IconButton
                                onClick={() => handleSave(editingSkill)}
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
                                onClick={() => setEditingSkill(null)}
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
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: 500 }}
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
                              <Box sx={{ position: 'relative', mb: 2 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={skill.level}
                                  sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    '& .MuiLinearProgress-bar': {
                                      borderRadius: 4,
                                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    }
                                  }}
                                />
                              </Box>
                              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <IconButton
                                  onClick={() => handleEdit(skill)}
                                  size="small"
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
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton
                                  onClick={() => onDelete(skill.id)}
                                  size="small"
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
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          </motion.div>
                        )}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SkillsTab;
