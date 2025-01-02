import { Grid, Paper, Typography, Box, LinearProgress } from '@mui/material'
import { motion } from 'framer-motion'

const MotionPaper = motion(Paper)

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'TypeScript', level: 85 },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Vue.js', level: 75 },
      { name: 'Next.js', level: 80 },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 85 },
      { name: 'Django', level: 80 },
      { name: 'PostgreSQL', level: 85 },
    ],
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 85 },
    ],
  },
]

const Skills = () => {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Skills & Expertise
      </Typography>
      <Grid container spacing={3}>
        {skillCategories.map((category, index) => (
          <Grid item xs={12} md={6} key={category.title}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              elevation={3}
              sx={{ p: 3 }}
            >
              <Typography variant="h5" gutterBottom color="primary">
                {category.title}
              </Typography>
              {category.skills.map((skill) => (
                <Box key={skill.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">{skill.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </MotionPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Skills
